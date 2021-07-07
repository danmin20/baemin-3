const isValid = {
  email: false,
  nickname: false,
  password: false,
  birth: false,
};

const addListeners = () => {
  const $email = document.querySelector("#email");
  const $emailDelBtn = document.querySelector("#email-del");
  const $emailCheckBtn = document.querySelector("#email-check-btn");
  const $backBtn = document.querySelector(".header-btn");
  const $joinForm = document.querySelector("#join-form");

  // 메일 중복 확인 버튼
  const checkEmailDuplicated = (e) => {
    const emailValidation = $email.value.match(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi
    );
    if (isValid.email || !emailValidation) return;

    const checkOK = $emailCheckBtn.previousElementSibling.querySelector(".check-ok");
    checkOK.src = "/ok.svg";
    isValid.email = true;
    if (isComplete()) activateNextButton();

    $joinForm.appendChild(createInputGroup("닉네임", "nickname", "text", "", "change", handleNickname));
    $joinForm.appendChild(createInputGroup("비밀번호", "password", "password", "", "change", handlePassword));
    $joinForm.appendChild(createInputGroup("생년월일", "birth", "text", "2000.01.01", "keyup", handleBirth));
  };

  // 닉네임 listener
  const handleNickname = ({ target }) => {
    const $nickname = document.querySelector("#nickname");
    const $checkOK = $nickname.nextElementSibling;

    if (!!target.value) {
      $checkOK.src = "/ok.svg";
      isValid.nickname = true;
      if (isComplete()) activateNextButton();
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

    if (value.match(/(\w)\1\1/) || isContinuousPwd(target)) {
      $password.style.border = "0px solid red";
      $password.style["border-bottom-width"] = "0.1rem";
      $descText.innerText = "같은 숫자 혹은 연속된 숫자를 3개 이상 입력할 수 없습니다.";
    } else if (
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
    const birth = {
      year: Number(value.slice(0, 4)) || 0,
      month: Number(value.slice(4, 6)) || 0,
      date: Number(value.slice(6, 8)) || 0,
    };
    const validDate = Date.parse(`${birth.year}-${birth.month}-${birth.date}`);
    if (value.length > 10) {
      target.value = value.substring(0, 10);
      return;
    }

    if (birth.date !== 0) target.value = `${birth.year}.${birth.month}.${birth.date}`;
    else if (birth.month !== 0) target.value = `${birth.year}.${birth.month}.`;
    else if (birth.year > 1000) target.value = `${birth.year}.`;

    if (birth.month === 0 && target.value[target.value.length - 1] === ".") target.value = birth.year;
    else if (birth.date === 0 && target.value[target.value.length - 1] === ".")
      target.value = `${birth.year}.${birth.month}`;

    const $birth = document.querySelector("#birth");
    const $descText = $birth.parentNode.querySelector(".error");
    const $checkOK = $birth.parentNode.querySelector(".check-ok");
    if (!validDate) {
      $birth.style.border = "0px solid red";
      $birth.style["border-bottom-width"] = "0.1rem";
      $descText.innerText = "올바른 생년월일을 입력해야 합니다.";
    } else {
      $birth.style.border = "0px solid lightgrey";
      $birth.style["border-bottom-width"] = "0.1rem";
      $descText.innerText = "";
      $checkOK.src = "/ok.svg";
      isValid.birth = true;
      if (isComplete()) activateNextButton();
    }
  };

  const deleteEmailInput = (e) => {
    $email.value = "";
  };

  const handleBack = (e) => {
    window.history.back();
  };

  $emailCheckBtn.addEventListener("click", checkEmailDuplicated);
  $emailDelBtn.addEventListener("click", deleteEmailInput);
  $backBtn.addEventListener("click", handleBack);
};

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

const isComplete = () => {
  return isValid.email && isValid.nickname && isValid.password && isValid.birth;
};

const activateNextButton = () => {
  const $completeBtn = document.querySelector("#complete-button");
  $completeBtn.disabled = false;
};

addListeners();
