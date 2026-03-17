import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let svg;
let sprinkles = [];

const width = 900;
const height = 400;
const repelRadius = 80;
const repelStrength = 8;
const starCount = 700;

const damping = 0.995;
const colors = ["#f8df52", "#fe9957", "#f0819d", "#79d0e0", "#c798c6", "#6cbc69", "#f4f4ef"];

function prepareVis() {
  svg = d3.select("main")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", handleMouseMove);

  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 14 + 8;
    const rotation = Math.random() * 360;

    const star = d3.symbol().type(d3.symbolStar).size(size * 30);

    const node = svg.append("path")
      .attr("d", star)
      .attr("transform", `translate(${x}, ${y}) rotate(${rotation})`)
      .attr("fill", color);

    sprinkles.push({
      node,
      x, y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      rot: rotation,
      vrot: (Math.random() - 0.5) * 0.4,
      size
    });
  }

  d3.timer(tick);
}

function tick() {
  sprinkles.forEach(s => {
    s.vx += (Math.random() - 0.5) * 0.02;
    s.vx *= damping;
    s.vy *= damping;

    s.x += s.vx;
    s.y += s.vy;
    s.rot += s.vrot;

    if (s.y > height + s.size) s.y = -s.size;
    if (s.y < -s.size) s.y = height + s.size;
    if (s.x > width + s.size) s.x = -s.size;
    if (s.x < -s.size) s.x = width + s.size;

    s.node.attr("transform", `translate(${s.x}, ${s.y}) rotate(${s.rot})`);
  });
}

function handleMouseMove(event) {
  const [mx, my] = d3.pointer(event);

  sprinkles.forEach(s => {
    const dx = s.x - mx;
    const dy = s.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < repelRadius && dist > 0) {
      const force = (repelRadius - dist) / repelRadius * repelStrength * 0.05;
      s.vx += (dx / dist) * force;
      s.vy += (dy / dist) * force;
    }
  });
}

function runApp() {
  prepareVis();
}

runApp();