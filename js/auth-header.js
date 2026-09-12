(function () {
  "use strict";

  var accountLink = document.querySelector("[data-account-link]");
  var accountLabel = document.querySelector("[data-account-label]");
  if (!accountLink || !accountLabel) return;

  var loggedIn = Boolean(localStorage.getItem("eth_session"));
  accountLink.href = loggedIn ? "dashboard.html" : "login.html";
  accountLabel.textContent = loggedIn ? "Dashboard" : "Login";
})();