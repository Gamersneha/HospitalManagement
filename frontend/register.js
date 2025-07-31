document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const status = document.getElementById("registerStatus");

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

  // ✅ Send POST request to backend
  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const result = await response.text();

    if (response.ok) {
      status.style.color = "green";
      status.textContent = "Registration successful! Redirecting to login...";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      status.style.color = "red";
      status.textContent = result || "Registration failed.";
    }
  } catch (error) {
    console.error("Error during registration:", error);
    status.style.color = "red";
    status.textContent = "Something went wrong. Try again later.";
  }
});
