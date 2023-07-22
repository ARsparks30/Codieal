const Post = require("../models/post");
const Comment = require("../models/comments");

module.exports.create = function (req, res) {
  Post.create({ content: req.body.content, user: req.user._id })
    .then(() => {
      return res.redirect("back");
    })
    .catch((err) => {
      if (err) {
        console.log("Error in creating", err);
        return;
      }
    });
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id).then((post) => {
    if (post.user == req.user.id) {
      Post.deleteOne(post)
        .then(() => {
          //   console.log(post);
          //   return res.status(200).send("success");
        })
        .catch((err) => {
          console.log("Unable to delete", err);
          return;
        });
      Comment.deleteMany({
        post: req.params.id,
      })
        .then(() => {
          return res.redirect("back");
        })

        .catch((err) => {
          if (err) {
            console.log("Error in deleting", err);
          }
        });
    } else {
      return res.redirect("back");
    }
  });
};
