import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// all routes protected
router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getMyTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;