// button for changing the theme of the e-books section

const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

toggleButton.addEventListener("click", () => {
  const root = document.documentElement;

  if (themeIcon.classList.contains("fa-sun")) {
    // Switch to dark mode
    // root.style.setProperty("--white-color", "#292929");
    root.style.setProperty("--white-color", "#000");
    root.style.setProperty("--box-col", "#222");

    themeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    // Switch to light mode
    root.style.setProperty("--white-color", "#fff");
    root.style.setProperty("--box-col", "#fff");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
});

// function for checking the size of book title

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".checker").forEach(element => {
        let maxLength = parseInt(element.getAttribute("data-limit")) || 20; // Default to 20 if not set
        let text = element.textContent.trim();

        if (text.length > maxLength) {
            element.textContent = text.substring(0, maxLength - 3) + "...";
        }
    });
});


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

document.getElementById("search-btn").addEventListener("click", function() {
  let searchValue = document.getElementById("search-input").value.toLowerCase();
  let books = document.querySelectorAll(".book");
  let found = false;

  books.forEach(book => {
      if (book.alt.toLowerCase().includes(searchValue)) {
          book.style.display = "block";
          setTimeout(() => {
              book.style.opacity = "1";
          }, 100); // Delay to apply transition
          found = true;
      } else {
          book.style.opacity = "0";
          setTimeout(() => {
              book.style.display = "none";
          }, 500); // Wait for fade-out effect
      }
  });

  if (found) {
      document.getElementById("not-found").style.opacity = "0";
      setTimeout(() => {
          document.getElementById("not-found").style.display = "none";
      }, 500);
  } else {
      document.getElementById("not-found").style.display = "block";
      setTimeout(() => {
          document.getElementById("not-found").style.opacity = "1";
      }, 100);
  }
});