const marks = document.querySelectorAll(".mark-cycle img");
let current = 0;

function cycleMarks() {
  // hide all
  marks.forEach(mark => mark.style.opacity = 0);

  // show current
  marks[current].style.opacity = 1;

  // move to next
  current = (current + 1) % marks.length;
}

// start immediately
cycleMarks();

// change every 2 seconds
setInterval(cycleMarks, 1750);


const roles = document.querySelectorAll(".role[data-images][data-text]");
const preview = document.querySelector(".preview");
const imagesContainer = document.querySelector(".preview-images");
const previewText = document.getElementById("preview-text");

roles.forEach(role => {
  role.addEventListener("mouseenter", () => {
    // clear previous images
    imagesContainer.innerHTML = "";

    // split images list
    const images = role.dataset.images.split(",").map(src => src.trim());

    images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      imagesContainer.appendChild(img);
    });

    previewText.textContent = role.dataset.text;
    preview.classList.add("is-visible");
  });

  role.addEventListener("mouseleave", () => {
    preview.classList.remove("is-visible");
  });
});
