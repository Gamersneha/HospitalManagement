document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const status = document.getElementById("registerStatus");

  // Basic validation
  if (!username || !email || !password || !confirmPassword) {
    status.style.color = "red";
    status.textContent = "Please fill in all fields.";
    return;
  }

  if (password !== confirmPassword) {
    status.style.color = "red";
    status.textContent = "Passwords do not match.";
    return;
  }

  // Simulate successful registration
  status.style.color = "green";
  status.textContent = "Registration successful! Redirecting to login...";

  // Optional: Save to localStorage or send to backend here

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
