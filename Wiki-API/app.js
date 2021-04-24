const express = require("express");
const app = express();
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const path = require("path");
const Article = require("./models/article");
const logger = require("morgan");
const { findOneAndRemove } = require("./models/article");

// Connect to DB
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose.connect("mongodb://localhost:27017/wikiDB", dbOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Mongo DB connected."));

// App configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("tiny"));

//// API Routes
// All articles
app
  .route("/articles")
  // Get all articles
  .get(async (req, res, next) => {
    const articles = await Article.find({});
    res.send(articles);
  })
  // Post an article
  .post(async (req, res, next) => {
    const { title, content } = req.body;
    const article = new Article({ title, content });
    await article.save();
    res.send(article);
  })
  // Delete all articles
  .delete(async (req, res, next) => {
    const result = await Article.remove({});
    res.send(result);
  });

// Specific article
app
  .route("/articles/:articleTitle")
  // Get specific article
  .get(async (req, res, next) => {
    const article = await Article.findOne({ title: req.params.articleTitle });
    if (!article) res.send("No matching article found.");
    res.send(article);
  })
  // Put specific article
  .put(async (req, res, next) => {
    const article = await Article.findOneAndUpdate(
      {
        title: req.params.articleTitle,
      },
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );
    if (!article) res.send("No matching article found.");
    res.send(article);
  })
  // Patch specific article
  .patch(async (req, res, next) => {
    const article = await Article.findOneAndUpdate(
      {
        title: req.params.articleTitle,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!article) res.send("No matching article found.");
    res.send(article);
  })
  // Delete specific article
  .delete(async (req, res, next) => {
    const result = await Article.remove({
      title: req.params.articleTitle,
    });
    res.send(result);
  });

/* Got ahead of the tutorial before purpose was clear....
// Routes
app.get("/", async (req, res, next) => {
  const articles = await Article.find({});
  res.render("index", { articles });
});

app.get("/articles/new", (req, res, next) => {
  res.render("newArticle");
});

app.post("/articles", async (req, res, next) => {
  const { article } = req.body;
  const newArticle = new Article(article);
  await newArticle.save();
  res.redirect(`/articles/${newArticle._id}`);
});

app.get("/articles/:article", async (req, res, next) => {
  const article = await Article.findOne({ _id: req.params.article });
  res.render("article", { article });
});
*/

// Start server
app.listen(3000, console.log("Listening on port 3000."));
