const User = require("../models/user");

module.exports.profile = function (req, res) {
  // console.log(req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      return res.render("user_profile", {
        title: "User profile",
        users: user,
      });
    })
    .catch((err) => {
      if (err) {
        console.log("Error in profile", err);
        return;
      }
    });
  //   res.end("<h1> User Profile </h1>");
  // console.log(req.cookies.JSESSIONID);
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id)
  //     .then((user) => {
  //       if (user) {
  //         return res.render("user_profile", {
  //           title: "User profile",
  //           users: user,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("error in profile", err);
  //       return;
  //     });
  // } else {
  //   return res.redirect("/users/sign-in");
  // }
  // return res.render("user_profile", { title: "User Profile" });
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id, function (err, user) {
  //     if (err) {
  //       console.log("error in profile");
  //       return;
  //     }
  //     if (user) {
  //       return res.render("user-profile", {
  //         title: "User profile",
  //         user: User,
  //       });
  //     }
  //   });
  // } else {
  //   return res.redirect("/users/sign-in");
  // }
  // return res.render("user_profile", { title: "User Profile" });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", { title: "Codeial | Sign In" });
};

module.exports.create = function (req, res) {
  // console.log(req.body.password);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  // User.findOne({ email: req.body.email }, function (err, user) {
  //   if (err) {
  //     console.log("error in finding user in signing up");
  //     return;
  //   }
  //   if (!user) {
  //     User.create(req.body, function (err, user) {
  //       if (err) {
  //         console.log("error in creating user while signing up");
  //         return;
  //       }
  //       return res.redirect("/user/sign-in");
  //     });
  //   } else {
  //     return res.redirect("back");
  //   }
  // });

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then(() => {
            return res.redirect("/users/sign-in");
          })
          .catch((err) => {
            console.log("error in creating user while signing up", err);
            return;
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("error in finding user in signing up", err);
      return;
    });
};

// module.exports.createSession = function (req, res) {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       res.cookie("user_id", user.id);
//       return res.redirect("back");
//     })
//     .catch((err) => {
//       console.log("error in finding user", err);
//       return;
//     });

//   // User.findOne(
//   //   {
//   //     email: req.body.email,
//   //   },
//   //   function (err, user) {
//   //     if (err) {
//   //       console.log("error in finding user");
//   //       return;
//   //     }
//   //     if (user) {
//   //       if (user.password != req.body.password) {
//   //         return res.redirect("back");
//   //       }

//   //       res.cookie("user_id", user.id);
//   //       return res.redirect;
//   //     }
//   //   }
//   // );
// };

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  //passport gives this funtion in built
  req.logout(function (err) {
    if (err) {
      console.log("Error in the user controller", err);
      return;
    }
  });
  return res.redirect("/");
};
