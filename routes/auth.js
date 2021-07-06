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
      return res.status(401).json({
        message: "existing user",
      });
    }
    if (exNick) {
      return res.status(401).json({
        message: "existing nickname",
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      id,
      nickname,
      password: hash,
      birth,
    });
    return res.status(200).json({
      message: "success",
    });
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
      return res.status(401).json({
        message: "user is not exist",
      });
    }
    // 패스워드 확인
    const isPW = await bcrypt.compare(password, user.password);
    if (!isPW) {
      return res.status(401).json({
        message: "wrong password",
      });
    }

    req.session.id = user.id;
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// router.get("/logout", isLoggedIn, (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.redirect("/");
// });

module.exports = router;
