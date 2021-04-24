const Post = require("../models/post");

// global vars
const homeStartingContent =
  "Ut iaculis mattis ligula, vel finibus nulla vehicula vel. Nunc imperdiet interdum diam sed gravida. In varius et nulla quis blandit. Nam consectetur commodo lorem, sit amet lacinia est varius in. Aliquam egestas at purus ac commodo. Ut eu risus tincidunt, ornare magna vitae, tempor tellus. Suspendisse pulvinar sapien sit amet nisl hendrerit, sit amet euismod sem aliquam. Integer vel quam ut ligula hendrerit malesuada. Proin turpis elit, molestie sed risus in, condimentum tempor odio. Phasellus sit amet dignissim eros. Fusce ut justo sed ex sollicitudin dignissim eget vitae libero. In interdum rutrum dui, vitae luctus velit. Aliquam erat volutpat. Duis ut ornare turpis. Vestibulum aliquam lorem et velit convallis, sit amet pharetra erat vestibulum. Integer sodales quam eget consequat bibendum.";
const aboutContent =
  "In pulvinar ac nisi sit amet malesuada. Ut id varius neque, sit amet aliquet metus. Morbi id eros non ante dictum vulputate id id urna. Duis elit eros, vestibulum molestie ornare vel, dapibus at est. Ut elementum est non massa sollicitudin, in consectetur lorem varius. Nulla ultrices velit non orci fringilla, non pulvinar lacus sagittis. Nunc eget nibh a ex rhoncus tristique nec nec eros. Duis vel erat ut tellus elementum condimentum quis nec purus. Aenean ac nunc sed ante tincidunt sagittis. Aenean cursus volutpat massa ut lobortis. In eu ligula in quam iaculis vestibulum. Quisque pharetra est ac tincidunt interdum.";
const contactContent =
  "Donec tincidunt, dui at dapibus imperdiet, odio ante tincidunt risus, non ultricies nunc mauris fringilla tellus. Etiam augue eros, interdum vitae elit eget, dignissim finibus velit. Proin egestas eleifend diam quis dapibus. Donec pharetra elit sit amet lectus iaculis ullamcorper quis suscipit augue. Nam eget dapibus ligula. Integer porta laoreet nisi, vitae elementum sapien cursus at. Fusce gravida, orci sed maximus posuere, justo augue posuere augue, non facilisis ante mauris ac lacus. Nullam blandit lacinia risus, non maximus odio ullamcorper sit amet. Curabitur sagittis sapien id fringilla feugiat. Nunc diam lectus, sollicitudin sit amet viverra id, vehicula eget augue.";

module.exports = {
  async getHome(req, res, next) {
    const posts = await Post.find({}).sort({ _id: -1 });
    res.render("home", {
      title: "Blog Home",
      content: homeStartingContent,
      posts,
    });
  },
  getAbout(req, res, next) {
    res.render("about", { title: "About Me", content: aboutContent });
  },
  getContact(req, res, next) {
    res.render("contact", { title: "Contact Me", content: contactContent });
  },
  getCompose(req, res, next) {
    res.render("compose", { title: "Compose Blog Entry" });
  },
  async postCompose(req, res, next) {
    const post = new Post(req.body.post);
    await post.save();
    res.render("post", { post });
  },
  async getPost(req, res, next) {
    const { title } = req.params;
    const post = await Post.findOne({ title: title });
    res.render("post", { post });
  },
};
