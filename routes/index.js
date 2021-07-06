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

// 회원가입
router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "회원가입",
    // signupError: req.flash("signupError"),
  });
});

// 로그인
router.get("/login", (req, res) => {
  res.render("login", {
    title: "로그인",
    // loginError: req.flash("loginError"),
  });
});

module.exports = router;
