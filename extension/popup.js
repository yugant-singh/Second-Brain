const API_URL = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  document.getElementById("title").value = tab.title || "";
  document.getElementById("sourceUrl").value = tab.url || "";

  const { token } = await chrome.storage.local.get("token");
  if (!token) {
    document.getElementById("tokenSection").classList.remove("hidden");
    document.getElementById("formSection").classList.add("hidden");
  } else {
    document.getElementById("tokenSection").classList.add("hidden");
    document.getElementById("formSection").classList.remove("hidden");
  }
});

document.getElementById("saveTokenBtn").addEventListener("click", async () => {
  const token = document.getElementById("tokenInput").value.trim();
  if (!token) return;
  await chrome.storage.local.set({ token });
  document.getElementById("tokenSection").classList.add("hidden");
  document.getElementById("formSection").classList.remove("hidden");
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  const { token } = await chrome.storage.local.get("token");
  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const sourceUrl = document.getElementById("sourceUrl").value;

  const errorEl = document.getElementById("error");
  const successEl = document.getElementById("success");
  const saveBtn = document.getElementById("saveBtn");

  errorEl.classList.add("hidden");
  successEl.classList.add("hidden");

  if (!title.trim()) {
    errorEl.textContent = "Title zaroori hai!";
    errorEl.classList.remove("hidden");
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
      successEl.classList.remove("hidden");
      setTimeout(() => window.close(), 1500);
    } else {
      errorEl.textContent = data.message || "Kuch galat hua!";
      errorEl.classList.remove("hidden");
    }
  } catch (err) {
    errorEl.textContent = "Backend se connect nahi ho pa raha!";
    errorEl.classList.remove("hidden");
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Save to MindVault";
  }
});