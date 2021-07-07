const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.use(async (req, res, next) => {
  // 모든 pug 템플릿에 사용자 정보를 변수로 집어넣음.
  if (req.session?.userId) {
    const id = req.session.userId;
    console.log(req.session.userId);
    const user = await User.findOne({ where: { id } });
    if (user) {
      req.locals = {
        user: user,
      };
    }
  }
  next();
});

// 초기화면
router.get("/", async (req, res, next) => {
  try {
    if (req.locals?.user) {
      console.log(req.locals.user);
      res.render("main", {
        title: "main",
        user: req.locals.user,
      });
    } else {
      res.render("main", {
        title: "main",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인
router.get("/login", (req, res) => {
  res.render("login", {
    title: "로그인",
  });
});

// 약관동의
router.get("/agree", (req, res) => {
  res.render("agree", {
    title: "회원가입",
  });
});
router.post("/agree", (req, res) => {
  res.redirect("phone");
});

// 휴대번호
router.get("/phone", (req, res) => {
  res.render("phone", {
    title: "휴대번호",
  });
});
router.post("/phone", (req, res) => {
  res.redirect("/signup");
});

module.exports = router;
