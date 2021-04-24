const List = require("../models/list");
const Todo = require("../models/todo");

module.exports = {
  async getHome(req, res, next) {
    const lists = await List.find({});
    res.render("home", { lists });
  },
  async createList(req, res, next) {
    const { name } = req.body;
    const newList = new List({ name });
    await newList.save();
    res.redirect(`/${name}`);
  },
  async getList(req, res, next) {
    const { list } = req.params;
    const foundList = await List.findOne({ name: list }).populate("todos");
    res.render("list", { list: foundList });
  },
  async deleteList(req, res, next) {
    const { list } = req.params;
    const listToDelete = await List.findOneAndRemove({ name: list });
    await listToDelete.remove();
    res.redirect("/");
  },
  async postTodo(req, res, next) {
    const task = req.body.todo;
    const { list } = req.params;
    const newTodo = new Todo({ task });
    await newTodo.save();
    const foundList = await List.findOne({ name: list });
    console.log(foundList);
    foundList.todos.push(newTodo);
    await foundList.save();
    res.redirect(`/${list}`);
  },
  async deleteTodo(req, res, next) {
    const { list } = req.params;
    await List.findOneAndUpdate(
      { name: list },
      {
        $pull: {
          todos: req.body.todo,
        },
      }
    );
    await Todo.findByIdAndDelete(req.body.todo);
    res.redirect(`/${list}`);
  },
};
