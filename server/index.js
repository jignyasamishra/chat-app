import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import {userRoutes} from "./routes/userRoutes.js"
import { errorHandler,notFound } from "./middleware/errorMiddleware.js";
import { chatRoutes } from "./routes/chatRoutes.js";
import { Server } from "socket.io";

const app = express()
dotenv.config()

app.use(express.json()) //TO ACCEPT JSON DATA

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes);
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001
// mongoose.connect(process.env.MONGO_URI)
const connectMongo = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
      
        })
        console.log(`MongoDB Connected:${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit()
    }
}
connectMongo()
const server = app.listen(PORT,console.log(`Server started on port ${PORT}!!`))

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });