const addListeners = () => {
  const $form = document.getElementById("agree-form");

  const $firstAgree = document.getElementById("first-agree");
  const $secondAgree = document.getElementById("second-agree");
  const $thirdAgree = document.getElementById("third-agree");

  const handleCheckbox = (e) => {
    const $allAgree = document.getElementById("all-agree");

    const $fourthAgree = document.getElementById("fourth-agree");
    const $fifthAgree = document.getElementById("fifth-agree");

    // 전체 선택
    if (e.target.id === "all-agree") {
      if (e.target.checked) {
        $firstAgree.checked = true;
        $secondAgree.checked = true;
        $thirdAgree.checked = true;
        $fourthAgree.checked = true;
        $fifthAgree.checked = true;
      } else {
        $firstAgree.checked = false;
        $secondAgree.checked = false;
        $thirdAgree.checked = false;
        $fourthAgree.checked = false;
        $fifthAgree.checked = false;
      }
    }
    // 전체 선택 아니면
    if (
      !(
        $firstAgree.checked &&
        $secondAgree.checked &&
        $thirdAgree.checked &&
        $fourthAgree.checked &&
        $fifthAgree.checked
      )
    ) {
      $allAgree.checked = false;
    }
  };

  const handleNextBtn = () => {
    const $firstRadio = document.getElementById("first-radio");
    const $secondRadio = document.getElementById("second-radio");
    const $submitBtn = document.getElementById("next-btn");

    if (
      $firstAgree.checked &&
      $secondAgree.checked &&
      $thirdAgree.checked &&
      ($firstRadio.checked || $secondRadio.checked)
    ) {
      $submitBtn.disabled = false;
    } else {
      $submitBtn.disabled = true;
    }
  };

  const handleChange = (e) => {
    handleNextBtn();
    handleCheckbox(e);
  };

  $form.addEventListener("change", handleChange);

  const $closeBtn = document.getElementById("close");
  $closeBtn.addEventListener("click", () => {
    location.href = "/";
  });
};

addListeners();
