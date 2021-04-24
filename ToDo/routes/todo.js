const express = require("express");
const router = express.Router();
const {
  getHome,
  createList,
  getList,
  deleteList,
  postTodo,
  deleteTodo,
} = require("../controllers/todo");

router.get("/", getHome);

router.post("/", createList);

router.get("/:list", getList);

router.delete("/:list", deleteList);

router.post("/:list", postTodo);

router.delete("/:list/:todoId", deleteTodo);

module.exports = router;
