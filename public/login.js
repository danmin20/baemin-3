const id = document.getElementById("login-id");
const pw = document.getElementById("login-pw");
const loginBtn = document.getElementById("login-btn");

const errorId = document.getElementById("error-id");
const errorPw = document.getElementById("error-pw");

const loginForm = document.getElementById("login-form");

const handleSubmit = (e) => {
  //   console.log(id.value === "", pw.value);
  if (id.value === "") {
    e.preventDefault();
    errorId.textContent = "아이디 또는 이메일을 입력하세요";
  }
  if (pw.value === "") {
    e.preventDefault();
    errorPw.textContent = "비밀번호를 입력하세요";
  }
};

loginForm.addEventListener("submit", handleSubmit);

const gotoSignup = document.getElementById("goto-signup");
gotoSignup.addEventListener("click", () => {
  window.open("/agree", "_parent");
});
