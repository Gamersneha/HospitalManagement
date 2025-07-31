document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Hardcoded credentials
  const validUsername = "admin";
  const validPassword = "1234";

  const status = document.getElementById("loginStatus");

  if (username === validUsername && password === validPassword) {
    // Redirect to frontpage.html
    window.location.href = "frontpage.html";
  } else {
    status.style.color = "red";
    status.textContent = "Invalid username or password.";
  }
});
