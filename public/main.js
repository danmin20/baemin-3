const init = () => {
  const $loginButton = document.getElementById("login-button");
  const $logoutButton = document.getElementById("logout-button");
  const handleLogin = () => {
    location.href = "/login";
  };
  const handleLogout = () => {
    location.href = "/auth/logout";
  };
  if ($loginButton) $loginButton.addEventListener("click", handleLogin);
  if ($logoutButton) $logoutButton.addEventListener("click", handleLogout);
};

init();
