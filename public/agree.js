const allAgree = document.getElementById("all-agree");

const firstAgree = document.getElementById("first-agree");
const secondAgree = document.getElementById("second-agree");
const thirdAgree = document.getElementById("third-agree");
const fourthAgree = document.getElementById("fourth-agree");
const fifthAgree = document.getElementById("fifth-agree");

const firstRadio = document.getElementById("first-radio");
const secondRadio = document.getElementById("second-radio");

const submitBtn = document.getElementById("next-btn");

const form = document.getElementById("agree-form");

form.addEventListener("change", (e) => {
  // 전체 선택
  if (e.target.id === "all-agree") {
    if (e.target.checked) {
      firstAgree.checked = true;
      secondAgree.checked = true;
      thirdAgree.checked = true;
      fourthAgree.checked = true;
      fifthAgree.checked = true;
    } else {
      firstAgree.checked = false;
      secondAgree.checked = false;
      thirdAgree.checked = false;
      fourthAgree.checked = false;
      fifthAgree.checked = false;
    }
  }

  if (
    !(
      firstAgree.checked &&
      secondAgree.checked &&
      thirdAgree.checked &&
      fourthAgree.checked &&
      fifthAgree.checked
    )
  ) {
    allAgree.checked = false;
  }

  // disabled 해제
  if (
    firstAgree.checked &&
    secondAgree.checked &&
    thirdAgree.checked &&
    (firstRadio.checked || secondRadio.checked)
  ) {
    submitBtn.disabled = false;
  }
});
