const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { id, nickname, password, birth } = req.body;
  try {
    const exUser = await User.findOne({ where: { id } });
    const exNick = await User.findOne({ where: { nickname } });
    if (exUser) {
      res.redirect("/signup");
    }
    if (exNick) {
      res.redirect("/signup");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      id,
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
  const { id, password } = req.body;
  try {
    // 유저 확인
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.redirect("/login");
    }
    // 패스워드 확인
    const isPW = await bcrypt.compare(password, user.password);
    if (!isPW) {
      res.redirect("/login");
    }

    req.session.userId = user.id;
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
