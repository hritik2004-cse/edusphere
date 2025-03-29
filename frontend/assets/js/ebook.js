// Complete ebook.js file with all features

document.addEventListener("DOMContentLoaded", () => {
  fetchEbooks();
  document.getElementById("uploadForm").addEventListener("submit", uploadEbook);
  document.getElementById("searchInput").addEventListener("input", searchEbooks);
  document.getElementById("categoryFilter").addEventListener("change", filterEbooks);
  displayUsername();
});

// Fetch and display eBooks
async function fetchEbooks() {
  try {
      const response = await fetch("http://localhost:5000/api/ebooks");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const ebooks = await response.json();
      displayEbooks(ebooks);
  } catch (error) {
      console.error("Error fetching eBooks:", error);
  }
}

// Display eBooks in the UI
function displayEbooks(ebooks) {
  const container = document.getElementById("ebook-container");
  container.innerHTML = "";

  if (ebooks.length === 0) {
      container.innerHTML = '<img src="/assets/images/error.png" alt="No Books Found">';
      return;
  }

  ebooks.forEach((ebook) => {
      const ebookElement = document.createElement("div");
      ebookElement.innerHTML = `
          <h3>${ebook.title}</h3>
          <p>Author: ${ebook.author}</p>
          <p>Category: ${ebook.category}</p>
          <a href="${ebook.downloadLink}" target="_blank">Download</a>
      `;
      container.appendChild(ebookElement);
  });
}

// Search eBooks by title or author
function searchEbooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const ebooks = document.querySelectorAll("#ebook-container div");
  ebooks.forEach(ebook => {
      const title = ebook.querySelector("h3").textContent.toLowerCase();
      const author = ebook.querySelector("p").textContent.toLowerCase();
      ebook.style.display = title.includes(query) || author.includes(query) ? "block" : "none";
  });
}

// Filter eBooks by category
function filterEbooks() {
  const category = document.getElementById("categoryFilter").value;
  fetchEbooks(category);
}

// Upload a new eBook
async function uploadEbook(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
      const response = await fetch("http://localhost:5000/api/ebooks", {
          method: "POST",
          body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload");
      fetchEbooks();
  } catch (error) {
      console.error("Upload error:", error);
  }
}

// Display logged-in user's name in navbar
function displayUsername() {
  const username = localStorage.getItem("username");
  if (username) {
      document.getElementById("navbarUser").textContent = `Hi, ${username}`;
  }
}

window.onload = function() {
  fetchEbooks();
};
