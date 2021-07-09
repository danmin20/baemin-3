const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { email, nickname, password, birth } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nickname,
      password: hash,
      birth,
    });
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  const { email, nickname, password, birth } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nickname,
      password: hash,
      birth,
    });
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 유저 확인
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.redirect("/login");
    }
    // 패스워드 확인
    const isPW = await bcrypt.compare(password, user.password);
    if (!isPW) {
      res.redirect("/login");
    }

    req.session.userId = user.email;
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
    console.log(req.session);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
