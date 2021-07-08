const addListeners = () => {
  // 로그인 폼
  const loginForm = document.getElementById("login-form");
  const handleSubmit = (e) => {
    const id = document.getElementById("login-id");
    const pw = document.getElementById("login-pw");

    const errorId = document.getElementById("error-id");
    const errorPw = document.getElementById("error-pw");

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

  // 회원가입 이동
  const gotoSignup = document.getElementById("goto-signup");
  gotoSignup.addEventListener("click", () => {
    location.href = "/agree";
  });

  // 닫기 버튼
  const $closeBtn = document.getElementById("close");
  $closeBtn.addEventListener("click", () => {
    location.href = "/";
  });
};

addListeners();
