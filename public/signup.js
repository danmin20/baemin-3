const isValid = {
  email: false,
  nickname: false,
  password: false,
  birth: false,
};
let isEmailBtnPushed = false;

const addListeners = () => {
  const $email = document.querySelector("#email");
  const $emailDelBtn = document.querySelector("#email-del");
  const $emailCheckBtn = document.querySelector("#email-check-btn");
  const $backBtn = document.querySelector(".header-btn");
  const $joinForm = document.querySelector("#join-form");

  const handleEmailInput = ({ target }) => {
    checkEmail();
  };

  // 메일 중복 확인 버튼
  const checkEmailDuplicated = (e) => {
    const emailValidation = checkEmail();

    if (isComplete()) activateNextButton();
    else deactivateNextButton();

    if (!isEmailBtnPushed && emailValidation) {
      $joinForm.appendChild(createInputGroup("닉네임", "nickname", "text", "", "change", handleNickname));
      $joinForm.appendChild(createInputGroup("비밀번호", "password", "password", "", "change", handlePassword));
      $joinForm.appendChild(createInputGroup("생년월일", "birth", "text", "2000.01.01", "keyup", handleBirth));
      isEmailBtnPushed = true;
    }
  };

  const checkEmail = () => {
    const $checkOK = $emailCheckBtn.previousElementSibling.querySelector(".check-ok");
    const $error = $email.parentNode.querySelector(".error");
    const emailValidation = $email.value.match(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi
    );

    if (emailValidation) {
      $checkOK.src = "/ok.svg";
      isValid.email = true;
      $email.style.border = "0px solid lightgrey";
      $email.style["border-bottom-width"] = "0.1rem";
      $error.innerText = "";
    } else {
      $checkOK.src = "/notok.svg";
      isValid.email = false;

      $error.innerText = "올바른 이메일을 입력해야 합니다.";
      $email.style.border = "0px solid red";
      $email.style["border-bottom-width"] = "0.1rem";
    }

    return emailValidation;
  };

  // 닉네임 listener
  const handleNickname = ({ target }) => {
    const $nickname = document.querySelector("#nickname");
    const $checkOK = $nickname.nextElementSibling;

    if (!!target.value) {
      $checkOK.src = "/ok.svg";
      isValid.nickname = true;
      if (isComplete()) activateNextButton();
    } else {
      $checkOK.src = "/notok.svg";
      isValid.nickname = false;
      deactivateNextButton();
    }
  };

  // password input listner
  const handlePassword = ({ target }) => {
    const value = target.value;
    const patternUpper = value.match(/[A-Z]/);
    const patternLower = value.match(/[a-z]/);
    const patternSpecial = value.match(/~!@#$%^&*/);

    const $password = document.querySelector("#password");
    const $descText = $password.parentNode.querySelector(".error");
    const $checkOK = $password.parentNode.querySelector(".check-ok");

    // 연속된 숫자 혹은 문자가 있는지 체크
    const isContinuousPwd = (target) => {
      const value = target.value;
      let diff1, diff2;

      for (let i = 0; i < value.length - 2; i++) {
        diff1 = Math.abs(value.charAt(i).charCodeAt(0) - value.charAt(i + 1).charCodeAt(0));
        diff2 = Math.abs(value.charAt(i + 1).charCodeAt(0) - value.charAt(i + 2).charCodeAt(0));

        if (diff1 === 1 && diff2 === 1) return true;
      }

      return false;
    };

    $checkOK.src = "/notok.svg";
    isValid.password = false;
    deactivateNextButton();
    if (value.match(/(\w)\1\1/) || isContinuousPwd(target)) {
      $password.style.border = "0px solid red";
      $password.style["border-bottom-width"] = "0.1rem";
      $descText.innerText = "같은 숫자 혹은 연속된 숫자를 3개 이상 입력할 수 없습니다.";
    } else if (
      // 길이가 10이 안되거나 소문자, 대문자, 특수문자 중 2개 이상이 없을 경우
      value.length < 10 ||
      !(
        (!!patternUpper && !!patternLower) ||
        (!!patternUpper && !!patternSpecial) ||
        (!!patternSpecial && !!patternLower)
      )
    ) {
      $descText.innerText = "10자 이상 영어 대문자, 소문자, 특수문자 중 2종류를 조합해야 합니다.";
      $password.style.border = "0px solid red";
      $password.style["border-bottom-width"] = "0.1rem";
    } else {
      // password validation pass
      $password.style.border = "0px solid lightgrey";
      $password.style["border-bottom-width"] = "0.1rem";
      $descText.innerText = "";
      $checkOK.src = "/ok.svg";
      isValid.password = true;
      if (isComplete()) activateNextButton();
    }
  };

  // 생년월일 input listner
  const handleBirth = ({ target }) => {
    const value = target.value.replace(/\./g, "");
    const birthText = {
      year: Number(value.slice(0, 4)),
      month: value.slice(4, 6) || value.slice(4, 5) || undefined,
      date: value.slice(6, 8) || value.slice(6, 7) || undefined,
    };
    const birth = {
      year: Number(birthText.year),
      month: Number(birthText.month),
      date: Number(birthText.date),
    };
    const validDate = Date.parse(`${birth.year}-${birth.month}-${birth.date}`);
    if (value.length > 10) {
      target.value = value.substring(0, 10);
      return;
    }

    console.log(birth, birthText);

    // 생년월일에 점 넣기
    if (birthText.date) target.value = `${birth.year}.${birthText.month}.${birthText.date}`;
    else if (birthText.month) target.value = `${birth.year}.${birthText.month}.`;
    // 생년월일에 점 빼기
    if (!birthText.month && target.value[target.value.length - 1] === ".") target.value = birth.year;
    else if (!birthText.date && target.value[target.value.length - 1] === ".")
      target.value = `${birth.year}.${birthText.month}`;

    const $birth = document.querySelector("#birth");
    const $descText = $birth.parentNode.querySelector(".error");
    const $checkOK = $birth.parentNode.querySelector(".check-ok");

    $checkOK.src = "/notok.svg";
    isValid.birth = false;
    if (!validDate && value.length !== 10) {
      $birth.style.border = "0px solid red";
      $birth.style["border-bottom-width"] = "0.1rem";
      $descText.innerText = "올바른 생년월일을 입력해야 합니다.";
      deactivateNextButton();
    } else {
      $birth.style.border = "0px solid lightgrey";
      $birth.style["border-bottom-width"] = "0.1rem";
      $descText.innerText = "";
      $checkOK.src = "/ok.svg";
      isValid.birth = true;
      if (isComplete()) activateNextButton();
    }
  };

  // 이메일 입력창 지우기
  const deleteEmailInput = (e) => {
    $email.value = "";
  };

  // 뒤로 가기 버튼
  const handleBack = (e) => {
    window.history.back();
  };

  $email.addEventListener("keyup", handleEmailInput);
  $emailCheckBtn.addEventListener("click", checkEmailDuplicated);
  $emailDelBtn.addEventListener("click", deleteEmailInput);
  $backBtn.addEventListener("click", handleBack);
};

// .input-group element
const createInputGroup = (labelText, inputId, inputType, placeholder, eventName, handler) => {
  const label = document.createElement("label");
  label.innerText = labelText;

  const input = document.createElement("input");
  input.className = "text-input";
  input.id = inputId;
  input.name = inputId;
  input.type = inputType;
  input.placeholder = placeholder;

  const img = document.createElement("img");
  img.className = "check-ok";
  img.src = "/notok.svg";

  const descText = document.createElement("div");
  descText.className = "error";

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group";
  inputGroup.appendChild(label);
  inputGroup.appendChild(input);
  inputGroup.appendChild(img);
  inputGroup.appendChild(descText);
  if (!!eventName) inputGroup.addEventListener(eventName, handler);

  return inputGroup;
};

// 모든 정보 유효
const isComplete = () => {
  return isValid.email && isValid.nickname && isValid.password && isValid.birth;
};

// 다음 버튼 활성화
const activateNextButton = () => {
  const $completeBtn = document.querySelector("#complete-button");
  $completeBtn.disabled = false;
};

// 다음 버튼 비활성화
const deactivateNextButton = () => {
  const $completeBtn = document.querySelector("#complete-button");
  $completeBtn.disabled = true;
};

addListeners();
