
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("loginStatus");

  try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      // ✅ Login successful
      status.style.color = "green";
      status.textContent = "Login successful! Redirecting...";
      window.location.href = "frontpage.html";  // Redirect to dashboard
    } else {
      // ❌ Login failed
      const message = await response.text();
      status.style.color = "red";
      status.textContent = message || "Invalid credentials";
    }
  } catch (error) {
    status.style.color = "red";
    status.textContent = "Error connecting to server: " + error.message;
  }
});

