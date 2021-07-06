const express = require("express");

// const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

// router.use((req, res, next) => {
//   // 모든 pug 템플릿에 사용자 정보를 변수로 집어넣음.
//   res.locals.user = req.user;
//   next();
// });

// 초기화면
router.get("/", async (req, res, next) => {
  try {
    res.render("main", {
      title: "main",
      // loginError: req.flash("loginError"),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인
router.get("/login", (req, res) => {
  res.render("login", {
    title: "로그인",
    // loginError: req.flash("loginError"),
  });
});

// 약관동의
router.get("/agree", (req, res) => {
  res.render("agree", {
    title: "회원가입",
    // signupError: req.flash("signupError"),
  });
});

// 휴대번호
router.get("/phone", (req, res) => {
  res.render("phone", {
    title: "휴대번호",
  });
});

module.exports = router;
