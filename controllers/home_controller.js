const User = require("../models/user");
const Post = require("../models/post");

module.exports.home = async function (req, res) {
  //   return res.end("<h1> Express is up for codeial </h1>");
  // console.log(req.cookies);
  //usually the value 25 has to be encoded
  // res.cookie("user_id", 25);

  // Post.find({})
  //   .then((post) => {
  //     return res.render("home", { title: "Home", posts: post });
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       console.log("Error in Home", err);
  //       return;
  //     }
  //   });

  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
    });
  } catch (err) {
    console.log("Error", err);
  }

  // return res.render("home", { title: "Home" });
};
