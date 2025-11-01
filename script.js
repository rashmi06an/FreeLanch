// Save and fetch users in localStorage (mock backend)
const users = JSON.parse(localStorage.getItem("freelanch_users")) || [];

// Signup
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    const existing = users.find((u) => u.email === email);
    if (existing) return alert("User already exists!");

    users.push({ name, email, password });
    localStorage.setItem("freelanch_users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  });
}

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("freelanch_logged_in_user", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password!");
    }
  });
}

// Authorization — Protect Dashboard
if (window.location.pathname.includes("dashboard.html")) {
  const loggedIn = JSON.parse(localStorage.getItem("freelanch_logged_in_user"));
  if (!loggedIn) {
    alert("Unauthorized! Please login first.");
    window.location.href = "login.html";
  } else {
    document.getElementById("userNameDisplay").innerText = `Hello, ${loggedIn.name}!`;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("freelanch_logged_in_user");
    window.location.href = "login.html";
  });
}
