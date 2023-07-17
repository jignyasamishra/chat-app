import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const UserModel = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShv0Ng-I_7Il8eApoGVyT455ZAKVnMPlVTEg&usqp=CAU",},
},{
    timestamps:true
})

UserModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}
UserModel.pre('save', async function (next) {
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

export const  User = mongoose.model("User",UserModel)
