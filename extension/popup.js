const API_URL = "https://second-brain-ps3j.onrender.com/api";

const errorEl = document.getElementById("error");
const successEl = document.getElementById("success");
const loginSection = document.getElementById("loginSection");
const formSection = document.getElementById("formSection");

const showError = (msg) => {
  errorEl.textContent = msg;
  errorEl.classList.remove("hidden");
  setTimeout(() => errorEl.classList.add("hidden"), 3000);
};

const showSuccess = (msg) => {
  successEl.textContent = msg;
  successEl.classList.remove("hidden");
  setTimeout(() => successEl.classList.add("hidden"), 2000);
};

const showLoginSection = () => {
  loginSection.classList.remove("hidden");
  formSection.classList.add("hidden");
};

const showFormSection = () => {
  loginSection.classList.add("hidden");
  formSection.classList.remove("hidden");
};

// App load hone pe check karo
document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const { token } = await chrome.storage.local.get("token");

  if (!token) {
    showLoginSection();
  } else {
    showFormSection();
    document.getElementById("title").value = tab.title || "";
    document.getElementById("sourceUrl").value = tab.url || "";
  }
});

// Login button
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const loginBtn = document.getElementById("loginBtn");

  if (!email || !password) {
    showError("Email aur password zaroori hai!");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      await chrome.storage.local.set({ token: data.token });
      showSuccess("Logged in! ✅");

      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      document.getElementById("title").value = tab.title || "";
      document.getElementById("sourceUrl").value = tab.url || "";

      setTimeout(() => showFormSection(), 1000);
    } else {
      showError(data.message || "Login failed!");
    }
  } catch (err) {
    showError("Backend se connect nahi ho pa raha!");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Login";
  }
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await chrome.storage.local.remove("token");
  showLoginSection();
});

// Save button
document.getElementById("saveBtn").addEventListener("click", async () => {
  const { token } = await chrome.storage.local.get("token");
  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const sourceUrl = document.getElementById("sourceUrl").value;
  const saveBtn = document.getElementById("saveBtn");

  if (!title.trim()) {
    showError("Title zaroori hai!");
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = "Saving...";

  try {
    const res = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ type, title, content, sourceUrl }),
    });

    const data = await res.json();

    if (res.ok) {
      showSuccess("Saved successfully! ✅");
      setTimeout(() => window.close(), 1500);
    } else {
      showError(data.message || "Kuch galat hua!");
    }
  } catch (err) {
    showError("Backend se connect nahi ho pa raha!");
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Save to MindVault";
  }
});