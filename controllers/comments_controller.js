const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findById(req.body.post)
    .then((post) => {
      if (post) {
        Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        })
          .then((comment) => {
            post.comments.push(comment);
            post.save();
            res.redirect("/");
          })
          .catch((err) => {
            console.log("Error in creating comment", err);
            return;
          });
      }
    })
    .catch((err) => {
      console.log("Error in finding post", err);
      return;
    });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id).then((comment) => {
    if (comment.user == req.user.id) {
      let postId = comment.post;
      Comment.deleteOne(comment);
      Post.findByIdAndUpdate(postId, {
        $pull: {
          comments: req.params.id,
        },
      })
        .then(() => {
          return res.redirect("back");
        })
        .catch((err) => {
          console.log("Error in deleting comment", err);
        });
    } else {
      return res.redirect("back");
    }
  });
};
