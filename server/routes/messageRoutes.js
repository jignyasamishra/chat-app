import express from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/messageControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export {router as messageRoutes}