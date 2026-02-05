

//flower svg art 
const bg = document.getElementById("vizBg");
const flowersLayer = document.getElementById("vizFlowers");
const trigger = document.getElementById("vizTrigger");

const css = getComputedStyle(document.documentElement);

const COLOR_BG = css.getPropertyValue("--color-background").trim();
const COLOR_PRIMARY = css.getPropertyValue("--color-primary").trim();
const COLOR_ACCENT = css.getPropertyValue("--color-accent").trim();

bg.setAttribute("fill", COLOR_BG);

const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
}

function jitter(rgb, amt = 60) {
  return `rgb(
    ${Math.max(0, Math.min(255, rgb.r + randInt(-amt, amt)))},
    ${Math.max(0, Math.min(255, rgb.g + randInt(-amt, amt)))},
    ${Math.max(0, Math.min(255, rgb.b + randInt(-amt, amt)))}
  )`;
}

const primaryRGB = hexToRgb(COLOR_PRIMARY);
const accentRGB = hexToRgb(COLOR_ACCENT);

function makeCircle(cx, cy, r, fill) {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", cx);
  c.setAttribute("cy", cy);
  c.setAttribute("r", r);
  c.setAttribute("fill", fill);
  return c;
}

function flowerAt(x, y) {

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `translate(${x} ${y})`);
  g.classList.add("flower");

  const petals = [
    [0, 0],
    [-15, 5],
    [-25, -5],
    [-17, -20],
    [0, -15],
  ];

  petals.forEach(([cx, cy]) => {
    const base = Math.random() < 0.5 ? primaryRGB : accentRGB;
    g.appendChild(makeCircle(cx, cy, 10, jitter(base)));
  });

  g.appendChild(
    makeCircle(
      -12,
      -7,
      11,
      `rgb(225, ${randInt(140, 220)}, ${randInt(140, 220)})`
    )
  );

  return g;
}

function generateFlowers() {

  flowersLayer.innerHTML = "";

  for (let i = 0; i <= 300; i++) {
    const x = Math.random() * 800;
    const y = Math.random() * 800;

    flowersLayer.appendChild(flowerAt(x, y));
  }
}

trigger.addEventListener("click", (e) => {
  e.preventDefault();
  generateFlowers();
});

//end of flower svg art 