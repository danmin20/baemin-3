const express = require("express");
const bcrypt = require("bcrypt");
// const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User } = require("../models");

const router = express.Router();

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  const { id, nickname, password, birth } = req.body;
  try {
    const exUser = await User.findOne({ where: { id } });
    const exNick = await User.findOne({ where: { nickname } });
    if (exUser) {
      req.flash("signupError", "이미 가입된 이메일입니다.");
      return res.redirect("/signup");
    }
    if (exNick) {
      req.flash("signupError", "이미 존재하는 닉네임입니다.");
      return res.redirect("/signup");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      id,
      nickname,
      password: hash,
      birth,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  const { id, password } = req.body;

  const user = await User.findOne({ where: { id } });
  const hash = await bcrypt.hash(password, 12);

  if (user && user.password === hash) {
    req.flash("loginError", info.message);
    return res.redirect("/");
  }

  return req.login(user, (loginError) => {
    if (loginError) {
      console.error(loginError);
      return next(loginError);
    }
    return res.redirect("/");
  });
});

// router.get("/logout", isLoggedIn, (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect("/");
// });

module.exports = router;
