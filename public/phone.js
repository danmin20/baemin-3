const addListeners = () => {
  const $phoneNum = document.getElementById("phone-number");
  const $authNumBtn = document.getElementById("auth-num-btn");

  const $del = document.getElementById("phone-number-del");
  const $check = document.getElementById("phone-number-ok");

  // 인증번호 입력폼
  const $authNum = document.createElement("input");
  const $regenerateBtn = document.createElement("button");
  $regenerateBtn.innerText = "인증번호 다시받기";
  $regenerateBtn.type = "button";
  $regenerateBtn.className = "link-btn";
  $regenerateBtn.style = "margin-top: 2rem; width: 100%; text-align: end;";

  // 전화번호 입력
  const handlePhoneNumInput = (e) => {
    // - 자동입력
    if (e.target.value.length === 3 || e.target.value.length === 8) {
      e.target.value += "-";
    }
    if (e.target.value.length === 13) {
      $check.src = "/ok.svg";
    } else {
      $check.src = "/notok.svg";
    }
  };
  $phoneNum.addEventListener("input", handlePhoneNumInput);

  // 전화번호 삭제
  const handleDelPhoneNum = () => {
    $phoneNum.value = "";
    $check.src = "/notok.svg";
  };
  $del.addEventListener("click", handleDelPhoneNum);

  const handleNextBtn = (bool) => {
    const $nextBtn = document.getElementById("next-btn");
    if (bool) {
      $nextBtn.disabled = false;
    } else {
      $nextBtn.disabled = true;
    }
  };

  // 인증번호 랜덤 구현
  const generate$AuthNum = () => {
    let str = "";
    for (let i = 0; i < 4; i++) {
      str += Math.floor(Math.random() * 10);
    }
    setTimeout(() => {
      $authNum.value = str;
      handleNextBtn(true);
    }, 2000);
  };

  // 인증번호 받기
  const handleAuthNumBtnClick = () => {
    const $authNumGroup = document.getElementById("auth-num-group");
    if ($phoneNum.value.length === 13) {
      // html 변경
      document.getElementById("join-form").removeChild($authNumBtn);
      $authNum.autofocus = true;
      const label = document.createElement("label");
      label.innerText = "인증번호";
      $authNum.className = "text-input";
      $authNum.placeholder = "인증번호를 입력해주세요";
      $authNumGroup.appendChild(label);
      $authNumGroup.appendChild($authNum);
      $authNumGroup.appendChild($regenerateBtn);
      generate$AuthNum();
    }
  };
  $authNumBtn.addEventListener("click", handleAuthNumBtnClick);

  // 인증번호 다시받기
  $regenerateBtn.addEventListener("click", () => {
    $authNum.value = "";
    generate$AuthNum();
  });

  // 뒤로가기 버튼
  const $backBtn = document.getElementById("back");
  $backBtn.addEventListener("click", () => {
    window.history.back();
  });
};

addListeners();
