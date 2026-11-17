/* Login local da área de membros. Qualquer e-mail válido entra, sem senha e sem API. */
const TOKEN_KEY = "ma_token";
const EMAIL_KEY = "ma_email";

const viewLogin = document.getElementById("viewLogin");
const appRoot = document.getElementById("appRoot");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginError = document.getElementById("loginError");
const loginBtn = document.getElementById("loginBtn");
const loginBtnLabel = document.getElementById("loginBtnLabel");
const bootLoader = document.getElementById("loader");

function setBusy(busy) {
  loginBtn.disabled = busy;
  loginBtnLabel.textContent = busy ? "Signing in…" : "Sign In";
}

function showApp(email) {
  bootLoader.hidden = true;
  viewLogin.hidden = true;
  appRoot.style.display = "";
  window.dispatchEvent(new CustomEvent("member-ready", {
    detail: { products: [], email: email, userKey: email }
  }));
}

function showLogin() {
  bootLoader.hidden = true;
  appRoot.style.display = "none";
  viewLogin.hidden = false;
}

function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
  } catch (e) {}
  location.reload();
}

(function init() {
  let token, email;
  try {
    token = localStorage.getItem(TOKEN_KEY);
    email = localStorage.getItem(EMAIL_KEY);
  } catch (e) {}
  if (token && email) showApp(email);
  else showLogin();
})();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim().toLowerCase();
  if (!email) return;
  loginError.hidden = true;
  setBusy(true);
  try {
    localStorage.setItem(TOKEN_KEY, "local");
    localStorage.setItem(EMAIL_KEY, email);
  } catch (err) {}
  showApp(email);
});

document.getElementById("logoutBtn").addEventListener("click", logout);
