const init = () => {
  const $loginButton = document.querySelector("#login-button");
  const handleLogin = (e) => {
    location.href = "/login";
  };
  $loginButton.addEventListener("click", handleLogin);
};

init();
