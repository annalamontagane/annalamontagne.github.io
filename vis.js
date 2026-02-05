//flower svg art 
const bg = document.getElementById("vizBg");
const flowersLayer = document.getElementById("vizFlowers");
const trigger = document.getElementById("vizTrigger");

const css = getComputedStyle(document.documentElement);

const COLOR_PRIMARY = css.getPropertyValue("--color-primary").trim();
const COLOR_ACCENT = css.getPropertyValue("--color-accent").trim();



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

//visualization data

const skillsData = [
    { label: "Visual Design", value: 0 },
    { label: "Interaction Design", value: 0 },
    { label: "UX & UI Design", value: 0 },
    { label: "Data Visualization", value: 0 },
    { label: "Human-Centred Design", value: 0 },
    { label: "Programming", value: 0 },
  ];
  
  const coursesToSkills = {
    "CMPT 120 — Python": ["Programming"],
    "IAT 167 — Digital Games": ["Programming", "Interaction Design"],
    "IAT 265 — Multimedia Programming": ["Programming"],
    "IAT 267 — Technological Systems": ["Programming"],
    "IAT 359 — Mobile Computing": ["Programming", "UX & UI Design"],
    "IAT 355 — Visual Analytics": ["Programming", "Data Visualization"],
  
    "IAT 102": ["Visual Design"],
    "IAT 110": ["Visual Design"],
    "IAT 100 — Digital Image Design": ["Visual Design"],
    "IAT 222 — Interactive Arts": ["Interaction Design", "Visual Design"],
  
    "IAT 201 — HCI & Cognition": ["Human-Centred Design"],
    "COGS 100 — Exploring the Mind": ["Human-Centred Design"],
  
    "IAT 334 — Interface Design": ["UX & UI Design", "Interaction Design"],
    "IAT 235 — Information Design": ["UX & UI Design", "Visual Design"],
    "IAT 339 — Web Design & Development": ["UX & UI", "Visual Design"],
    "Malmö C1 — Interactive System": ["Programming", "Interaction Design"],
    "Malmö C2 — Interaction Design": ["Programming", "Interaction Design"],
  };
  
  const toolsData = [
    { label: "Figma", value: 0 },
    { label: "Adobe", value: 0 },
    { label: "HTML/CSS", value: 0 },
    { label: "JavaScript", value: 0 },
    { label: "GitHub", value: 0 },
    { label: "Arduino", value: 0 },
    { label: "Tableau", value: 0 },
  ];
  
  const coursesToTools = {

    "IAT 167 — Digital Games": ["JavaScript"],
    // "IAT 265 — Multimedia Programming": ["Java"],
    "IAT 359 — Mobile Computing": ["JavaScript", "GitHub"],
    "IAT 355 — Visual Analytics": ["JavaScript", "GitHub", "Tableau"],
    "Malmö C1 — Interactive Systems": ["JavaScript"],
    "Malmö C2 — Interaction Design": ["JavaScript", "Arduino"],
  
    "IAT 267 — Technological Systems": ["Arduino", "GitHub", "JavaScript","HTML/CSS"],
  
    "IAT 102": ["Adobe"],
    "Graphic Design": ["Adobe"],
    "IAT 100 — Digital Image Design": ["Adobe"],
    "IAT 222 — Interactive Arts": ["Adobe"],
  
    "IAT 334 — Interface Design": ["Figma"],
    "IAT 235 — Information Design": ["Figma", "HTML/CSS"],
    "IAT 339 — Web Design & Development": ["HTML/CSS", "Figma", "GitHub"],
  };
  
  //visualization data end

  //bar chat visualization
  const barSvg = document.getElementById("barViz");
  const btnSkills = document.getElementById("btnSkills");
  const btnTools = document.getElementById("btnTools");
  
  if (barSvg && btnSkills && btnTools) {
    const css = getComputedStyle(document.documentElement);
    const TEXT = css.getPropertyValue("--color-text").trim() || "#822B33";
    const PRIMARY = css.getPropertyValue("--color-primary").trim() || "#822B33";
    const ACCENT = css.getPropertyValue("--color-accent").trim() || "#AFDCFB";
    const BG = css.getPropertyValue("--color-background").trim() || "#FAFFEC";
  
    function clearSvg(svg) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
    }
  
    function svgEl(name, attrs = {}) {
      const n = document.createElementNS("http://www.w3.org/2000/svg", name);
      for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
      return n;
    }
  
    function computeCounts(baseArray, mapping) {
    
      baseArray.forEach(d => (d.value = 0));
  
      //count: each course contributes +1 to each mapped label
      Object.values(mapping).forEach(list => {
        list.forEach(label => {
          const item = baseArray.find(d => d.label === label);
          if (item) item.value += 1;
        });
      });
  
      return baseArray;
    }
  
    function drawBarChart(mode) {
      const data =
        mode === "skills"
          ? computeCounts([...skillsData.map(d => ({ ...d }))], coursesToSkills)
          : computeCounts([...toolsData.map(d => ({ ...d }))], coursesToTools);
  
      clearSvg(barSvg);
  
      const vb = barSvg.viewBox.baseVal;
      const W = vb.width || 720;
      const H = vb.height || 420;
  
      const padL = 60;
      const padR = 20;
      const padT = 32;
      const padB = 110;
  
      barSvg.appendChild(svgEl("rect", { x: 0, y: 0, width: W, height: H, rx: 16, fill: BG }));
  
      const maxVal = Math.max(1, ...data.map(d => d.value));
  
      // chart area
      const chartW = W - padL - padR;
      const chartH = H - padT - padB;
  
      // y-axis ticks (0..max)
      const ticks = Math.min(5, maxVal);
      for (let i = 0; i <= ticks; i++) {
        const v = Math.round((i / ticks) * maxVal);
        const y = padT + chartH - (v / maxVal) * chartH;
  
        barSvg.appendChild(svgEl("line", {
          x1: padL, y1: y, x2: padL + chartW, y2: y,
          stroke: TEXT, "stroke-opacity": 0.15
        }));
  
        const t = svgEl("text", {
          x: padL - 10,
          y: y + 4,
          fill: TEXT,
          "font-family": "JetBrains Mono",
          "font-size": 12,
          "text-anchor": "end"
        });
        t.textContent = v;
        barSvg.appendChild(t);
      }
  
      // axis label (y)
      const ylab = svgEl("text", {
        x: 16, y: 18,
        fill: TEXT,
        "font-family": "JetBrains Mono",
        "font-size": 12
      });
      ylab.textContent = "# of courses";
      barSvg.appendChild(ylab);
  
      // bars
      const n = data.length;
      const gap = 10;
      const barW = (chartW - gap * (n - 1)) / n;
  
      data.forEach((d, i) => {
        const x = padL + i * (barW + gap);
        const h = (d.value / maxVal) * chartH;
        const y = padT + chartH - h;
  
        // bar
        barSvg.appendChild(svgEl("rect", {
          x,
          y,
          width: barW,
          height: h,
          rx: 10,
          fill: ACCENT,
          opacity: 0.9
        }));
  
        // value label above bar
        const v = svgEl("text", {
          x: x + barW / 2,
          y: y - 6,
          fill: PRIMARY,
          "font-family": "JetBrains Mono",
          "font-size": 12,
          "text-anchor": "middle"
        });
        v.textContent = d.value;
        barSvg.appendChild(v);
  
        // x labels 
        const label = svgEl("text", {
          x: x + barW / 2,
          y: padT + chartH + 18,
          fill: TEXT,
          "font-family": "JetBrains Mono",
          "font-size": 11,
          "text-anchor": "end",
          transform: `rotate(-35 ${x + barW / 2} ${padT + chartH + 18})`
        });
        label.textContent = d.label;
        barSvg.appendChild(label);
      });
    }
  
    function setActive(mode) {
      if (mode === "skills") {
        btnSkills.classList.add("is-active");
        btnTools.classList.remove("is-active");
      } else {
        btnTools.classList.add("is-active");
        btnSkills.classList.remove("is-active");
      }
      drawBarChart(mode);
    }
  
    btnSkills.addEventListener("click", (e) => {
      e.preventDefault();
      setActive("skills");
    });
  
    btnTools.addEventListener("click", (e) => {
      e.preventDefault();
      setActive("tools");
    });
  
    // initial
    setActive("skills");
  }

  //end of visualization 