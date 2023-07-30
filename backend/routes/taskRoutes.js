const express = require("express");
const {
  createTaskController,
  updateTaskController,
  markTaskCompleteController,
  delteTaskController,
  getTasksController,
} = require("../controllers/taskControllers");
const router = express.Router();

router.get("/get-tasks", getTasksController);
router.post("/create-task", createTaskController);
router.put("/edit-task", updateTaskController);
router.put("/mark-task-complete", markTaskCompleteController);
router.delete("/delete-task", delteTaskController);

module.exports = router;
