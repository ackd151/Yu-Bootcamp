const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const {
  getHome,
  getAbout,
  getContact,
  getCompose,
  postCompose,
  getPost,
} = require("../controllers/blog");

router.get("/", getHome);

router.get("/about", getAbout);

router.get("/contact", getContact);

router.get("/compose", getCompose);

router.post("/compose", postCompose);

router.get("/posts/:title", getPost);

module.exports = router;
