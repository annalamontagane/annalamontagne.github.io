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
