const phoneNum = document.getElementById("phone-number");
const authNumBtn = document.getElementById("auth-num-btn");

const authNumGroup = document.getElementById("auth-num-group");
const check = document.getElementById("phone-number-ok");
const del = document.getElementById("phone-number-del");

let phoneNumVal = "";

const authNum = document.createElement("input");
const regenerateBtn = document.createElement("button");
regenerateBtn.innerText = "인증번호 다시받기";
regenerateBtn.type = "button";
regenerateBtn.className = "link-btn";

phoneNum.addEventListener("input", (e) => {
  // - 자동입력
  if (e.target.value.length === 3 || e.target.value.length === 8) {
    e.target.value += "-";
  }
  if (e.target.value.length === 13) {
    check.src = "/ok.svg";
  } else {
    check.src = "/notok.svg";
  }
  phoneNumVal = e.target.value;
});

del.addEventListener("click", (e) => {
  phoneNum.value = "";
  check.src = "/notok.svg";
});

const generateAuthNum = () => {
  let str = "";
  for (let i = 0; i < 4; i++) {
    str += Math.floor(Math.random() * 10);
  }
  setTimeout(() => {
    authNum.value = str;
  }, 2000);
};

// 인증번호 받기
authNumBtn.addEventListener("click", (e) => {
  console.log(phoneNumVal.length);
  if (phoneNumVal.length === 13) {
    // html 변경
    document.getElementById("join-form").removeChild(authNumBtn);
    authNum.autofocus = true;
    const label = document.createElement("label");
    label.innerText = "인증번호";
    authNum.className = "text-input";
    authNum.placeholder = "인증번호를 입력해주세요";
    authNumGroup.appendChild(label);
    authNumGroup.appendChild(authNum);
    authNumGroup.appendChild(regenerateBtn);
    generateAuthNum();
  }
});
regenerateBtn.addEventListener("click", () => {
  authNum.value = "";
  generateAuthNum();
});
