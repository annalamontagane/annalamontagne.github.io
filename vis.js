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

if (trigger && flowersLayer) {
trigger.addEventListener("click", (e) => {
  e.preventDefault();
  generateFlowers();
});
}
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


// SHARED SETUP
import vegaEmbed from "https://cdn.jsdelivr.net/npm/vega-embed@6/+esm"

const raw = await fetch("https://annalamontagane.github.io/annalamontagne.github.io/assets/videogames_wide.csv").then(r => r.text())

function parseCSV(raw) {
  const lines   = raw.trim().split("\n")
  const headers = lines[0].split(",").map(h => h.trim())
  return lines.slice(1).map(line => {
    const vals = []
    let cur = "", inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') { inQuotes = !inQuotes }
      else if (ch === "," && !inQuotes) { vals.push(cur.trim()); cur = "" }
      else { cur += ch }
    }
    vals.push(cur.trim())
    const obj = {}
    headers.forEach((h, i) => obj[h] = vals[i] ?? "")
    obj.Global_Sales = +obj.Global_Sales
    return obj
  })
}

const knownGenres = ["Action","Sports","Shooter","Role-Playing","Platform","Misc","Racing","Fighting","Simulation","Puzzle","Adventure","Strategy"]
const wide = parseCSV(raw).filter(d => knownGenres.includes(d.Genre))

// Shared CSS vars
const _css      = getComputedStyle(document.documentElement)
const V_PRIMARY = _css.getPropertyValue("--color-primary").trim()    || "#822B33"
const V_TEXT    = _css.getPropertyValue("--color-text").trim()       || "#822B33"
const V_BG      = _css.getPropertyValue("--color-background").trim() || "#FAFFEC"

// Single source of truth for all chart colors 
const PLATFORM_COLORS = {
  "PS2":  "#0dab5c",
  "Wii":  "#1C2968",
  "X360": "#643C94",
  "PS3":  "#e97f2b",
  "DS":   "#DA3A2F",
  "PS":   "#6396FF",
  "GBA":  "#F3AEC6",
  "PSP":  "#E8572A",
  "Other":"#aabb99",
}

const REGION_COLORS = {
  "North America": "#0dab5c",
  "Europe":        "#1C2968",
  "Japan":         "#643C94",
  "Other":         "#e97f2b",
}

const VEGA_OPTS = { renderer: "svg", actions: false }

// STACKED BAR CHART — Which genres generate the most global sales?
{
  const stackedBarEl  = document.getElementById("chart")
  const legendEl      = document.getElementById("legend")
  const toggleWrapper = document.getElementById("toggleWrapper")

  if (stackedBarEl && legendEl) {
    const platforms = ["PS2","X360","PS3","Wii","DS","PS","GBA","PSP"]

    const counts = {}
    wide.forEach(d => {
      if (!platforms.includes(d.Platform)) return
      const plat = d.Platform
      const key  = d.Genre + "||" + plat
      if (!counts[key]) counts[key] = { Genre: d.Genre, Platform: plat, TotalSales: 0 }
      counts[key].TotalSales += d.Global_Sales
    })

    const genreTotals = {}
    Object.values(counts).forEach(d => { genreTotals[d.Genre] = (genreTotals[d.Genre] || 0) + d.TotalSales })
    const sortedGenres = Object.entries(genreTotals).sort((a,b) => b[1]-a[1]).map(d => d[0])
    const aggData = Object.values(counts)
    const maxTotal = Math.max(...Object.values(genreTotals))

    platforms.forEach(p => {
      const item = document.createElement("div")
      item.className = "legend-item"
      item.dataset.platform = p
      item.innerHTML = `<div class="legend-dot" style="background:${PLATFORM_COLORS[p]}"></div><span class="legend-label">${p}</span>`
      legendEl.appendChild(item)
    })

    function makeStackedSpec(highlightPlatform, normalized) {
      const colorRange = platforms.map(p =>
        !highlightPlatform || p === highlightPlatform ? PLATFORM_COLORS[p] : "#e8e8d8"
      )

      const visData = highlightPlatform
        ? aggData.filter(d => d.Platform === highlightPlatform)
        : aggData

      const visDataWithPct = visData.map(d => ({
        ...d,
        PctShare: +(d.TotalSales / genreTotals[d.Genre] * 100).toFixed(1)
      }))

      return {
        $schema: "https://vega.github.io/schema/vega-lite/v6.json",
        width: 560, height: 320,
        data: { values: visDataWithPct },
        layer: [
          {
            mark: { type: "bar", cornerRadiusEnd: 2 },
            encoding: {
              y: { field: "Genre", type: "nominal", sort: sortedGenres,
                axis: { title: null, labelColor: V_PRIMARY, labelFontSize: 10,
                  labelFont: "JetBrains Mono", domainColor: V_PRIMARY,
                  domainOpacity: 0.3, tickColor: "transparent" } },
              x: normalized ? {
                field: "PctShare", type: "quantitative",
                scale: { domain: [0, 100] },
                axis: { title: "Share of Genre (%)", titleColor: V_PRIMARY,
                  titleFont: "JetBrains Mono", titleFontSize: 9,
                  labelColor: V_PRIMARY, labelFont: "JetBrains Mono", labelFontSize: 9,
                  gridColor: "#d6d9c4", gridOpacity: 0.7, domainColor: "transparent",
                  tickColor: "transparent", format: "d" }
              } : {
                field: "TotalSales", type: "quantitative",
                stack: "zero",
                scale: { domain: [0, maxTotal] },
                axis: { title: "Total Global Sales (M)", titleColor: V_PRIMARY,
                  titleFont: "JetBrains Mono", titleFontSize: 9,
                  labelColor: V_PRIMARY, labelFont: "JetBrains Mono", labelFontSize: 9,
                  gridColor: "#d6d9c4", gridOpacity: 0.7, domainColor: "transparent",
                  tickColor: "transparent" }
              },
              color: { field: "Platform", type: "nominal",
                scale: { domain: platforms, range: colorRange }, legend: null },
              order: { field: "Platform", type: "nominal", sort: platforms },
              tooltip: [
                { field: "Genre",      type: "nominal" },
                { field: "Platform",   type: "nominal",      title: "Platform" },
                { field: "TotalSales", type: "quantitative", title: "Sales (M)", format: ".1f" },
                { field: "PctShare",   type: "quantitative", title: "Genre Share (%)", format: ".1f" }
              ]
            }
          },
          ...(highlightPlatform ? [{
            mark: { type: "text", align: "left", dx: 6, fontSize: 10,
              fontWeight: "bold", font: "JetBrains Mono" },
            encoding: {
              y: { field: "Genre", type: "nominal", sort: sortedGenres },
              x: normalized
                ? { field: "PctShare",   type: "quantitative", scale: { domain: [0, 100] } }
                : { field: "TotalSales", type: "quantitative", stack: "zero", scale: { domain: [0, maxTotal] } },
              text: normalized
                ? { field: "PctShare",   type: "quantitative", format: ".1f",
                    condition: { test: "true", value: { expr: "datum.PctShare + '%'" } } }
                : { field: "TotalSales", type: "quantitative", format: ".1f" },
              color: { value: V_PRIMARY }
            }
          }] : [])
        ],
        config: { background: "transparent", view: { stroke: "transparent" },
          axis: { labelFont: "JetBrains Mono" } }
      }
    }

    let currentHighlight = null
    let isNormalized     = false

    async function renderStackedChart(highlight, normalize) {
      currentHighlight = highlight
      isNormalized     = normalize
      await vegaEmbed(stackedBarEl, makeStackedSpec(highlight, normalize), VEGA_OPTS)
    }

    await renderStackedChart(null, false)

    legendEl.addEventListener("mouseover", e => {
      const item = e.target.closest("[data-platform]")
      if (!item) return
      const p = item.dataset.platform
      legendEl.querySelectorAll(".legend-item").forEach(el => {
        el.style.opacity     = el.dataset.platform === p ? "1" : "0.35"
        el.style.borderStyle = el.dataset.platform === p ? "solid" : "dotted"
      })
      renderStackedChart(p, isNormalized)
    })

    legendEl.addEventListener("mouseleave", () => {
      legendEl.querySelectorAll(".legend-item").forEach(el => {
        el.style.opacity = "1"; el.style.borderStyle = "dotted"
      })
      renderStackedChart(null, isNormalized)
    })

    if (toggleWrapper) {
        const toggleLabelEl = document.getElementById("toggleLabel")
        const stackedTitleEl = document.getElementById("stackedTitle")
        toggleWrapper.addEventListener("click", () => {
          isNormalized = !isNormalized
          toggleWrapper.classList.toggle("is-on", isNormalized)
          if (toggleLabelEl) {
            toggleLabelEl.textContent = isNormalized
              ? "Show absolute sales"
              : "Show as percentage of genre"
          }
          if (stackedTitleEl) {
            stackedTitleEl.textContent = isNormalized
              ? "Which platforms dominate each genre?"
              : "Which genres generate the most global sales and which platforms drive them?"
          }
          renderStackedChart(currentHighlight, isNormalized)
        })
      }
  }
}

// SLOPE CHART — How did platform sales by genre change from 2000–2004 to 2005–2009?
{
  const slopeLegendEl = document.getElementById("slopeLegend")
  const slopeChartEl  = document.getElementById("slopeChart")

  if (slopeChartEl && slopeLegendEl) {
    const selectedPlatforms = ["PS2", "Wii", "X360"]
    const genres = [...new Set(wide.map(d => d.Genre))].filter(Boolean).sort()

    const genreColors = [
      "#0dab5c","#1C2968","#643C94","#e97f2b","#DA3A2F",
      "#6396FF","#F3AEC6","#E8572A","#aabb99","#00C2CC",
      "#FF4DCE","#8B4513"
    ]
    const colorScale = {}
    genres.forEach((g, i) => colorScale[g] = genreColors[i % genreColors.length])

    const early = {}, late = {}
    wide.forEach(d => {
      const yr = +d.Year
      if (!d.Genre || !d.Platform || !selectedPlatforms.includes(d.Platform)) return
      const key = d.Platform + "||" + d.Genre
      if      (yr >= 2000 && yr <= 2004) early[key] = (early[key] || 0) + (+d.Global_Sales || 0)
      else if (yr >= 2005 && yr <= 2009) late[key]  = (late[key]  || 0) + (+d.Global_Sales || 0)
    })

    const slopeData = []
    selectedPlatforms.forEach(platform => {
      genres.forEach(genre => {
        const key = platform + "||" + genre
        const earlyVal = early[key] || 0, lateVal = late[key] || 0
        if (earlyVal === 0 && lateVal === 0) return
        slopeData.push({ Platform: platform, Genre: genre, Period: "2000–2004", Sales: +earlyVal.toFixed(2) })
        slopeData.push({ Platform: platform, Genre: genre, Period: "2005–2009", Sales: +lateVal.toFixed(2) })
      })
    })

    genres.forEach(g => {
      const item = document.createElement("div")
      item.className = "legend-item"
      item.dataset.genre = g
      item.innerHTML = `<div class="legend-dot" style="background:${colorScale[g]}"></div><span class="legend-label">${g}</span>`
      slopeLegendEl.appendChild(item)
    })

    function makeSlopeSpec(highlightGenre) {
      const colorRange = genres.map(g =>
        !highlightGenre || g === highlightGenre ? colorScale[g] : "rgba(180,190,160,0.2)"
      )
      return {
        $schema: "https://vega.github.io/schema/vega-lite/v6.json",
        data: { values: slopeData },
        facet: {
          field: "Platform", type: "nominal",
          columns: 3, sort: selectedPlatforms,
          header: { labelColor: V_PRIMARY, labelFontSize: 13, labelFont: "JetBrains Mono",
            labelFontWeight: "bold", labelPadding: 10, labelAlign: "left", labelAnchor: "start" }
        },
        spec: {
          width: 185, height: 300,
          layer: [
            {
              mark: { type: "line", strokeWidth: 1.75 },
              encoding: {
                x: { field: "Period", type: "nominal", sort: ["2000–2004","2005–2009"],
                  axis: { title: null, labelColor: V_PRIMARY, labelFontSize: 10,
                    labelFont: "JetBrains Mono", domainColor: V_PRIMARY, domainOpacity: 0.3,
                    tickColor: "transparent", gridColor: "transparent" } },
                y: { field: "Sales", type: "quantitative",
                  axis: { title: "Sales (M)", titleColor: V_PRIMARY, titleFont: "JetBrains Mono",
                    titleFontSize: 9, labelColor: V_PRIMARY, labelFont: "JetBrains Mono",
                    labelFontSize: 8, labelOpacity: 0.5, gridColor: V_PRIMARY, gridOpacity: 0.08,
                    domainColor: "transparent", tickColor: "transparent" } },
                color: { field: "Genre", type: "nominal",
                  scale: { domain: genres, range: colorRange }, legend: null },
                detail: { field: "Genre", type: "nominal" }
              }
            },
            {
              mark: { type: "point", filled: true, size: 55 },
              encoding: {
                x: { field: "Period", type: "nominal", sort: ["2000–2004","2005–2009"] },
                y: { field: "Sales",  type: "quantitative" },
                color: { field: "Genre", type: "nominal",
                  scale: { domain: genres, range: colorRange }, legend: null },
                tooltip: [
                  { field: "Platform", type: "nominal",      title: "Platform" },
                  { field: "Genre",    type: "nominal",      title: "Genre" },
                  { field: "Period",   type: "nominal",      title: "Period" },
                  { field: "Sales",    type: "quantitative", format: ".1f", title: "Sales (M)" }
                ]
              }
            }
          ]
        },
        resolve: { scale: { y: "independent" } },
        config: { background: "transparent", view: { stroke: V_PRIMARY, strokeOpacity: 0.1 },
          axis: { labelFont: "JetBrains Mono" }, facet: { spacing: 28 } }
      }
    }

    let currentSlopeHighlight = null

    async function renderSlopeChart(highlight) {
      currentSlopeHighlight = highlight
      await vegaEmbed("#slopeChart", makeSlopeSpec(highlight), VEGA_OPTS)
    }

    await renderSlopeChart(null)

    slopeLegendEl.addEventListener("mouseover", e => {
      const item = e.target.closest("[data-genre]")
      if (!item) return
      const g = item.dataset.genre
      slopeLegendEl.querySelectorAll(".legend-item").forEach(el => {
        el.style.opacity     = el.dataset.genre === g ? "1" : "0.35"
        el.style.borderStyle = el.dataset.genre === g ? "solid" : "dotted"
      })
      renderSlopeChart(g)
    })

    slopeLegendEl.addEventListener("mouseleave", () => {
      slopeLegendEl.querySelectorAll(".legend-item").forEach(el => {
        el.style.opacity = "1"; el.style.borderStyle = "dotted"
      })
      renderSlopeChart(null)
    })
  }
}

// LOLLIPOP CHART — DS Sales by Region
{
  const dsSalesEl = document.getElementById("dsSalesChart")
  if (dsSalesEl) {
    const d3 = await import("https://cdn.jsdelivr.net/npm/d3@7/+esm")
    const regions = [
      { key: "NA_Sales",    label: "North America" },
      { key: "EU_Sales",    label: "Europe" },
      { key: "JP_Sales",    label: "Japan" },
      { key: "Other_Sales", label: "Other" }
    ]
    const dsSales = {}
    regions.forEach(r => { dsSales[r.label] = 0 })
    wide.forEach(d => {
      if (d.Platform !== "DS") return
      regions.forEach(r => { dsSales[r.label] += +d[r.key] || 0 })
    })
    const total = Object.values(dsSales).reduce((s,v) => s+v, 0)
    const data  = regions.map(r => ({ region: r.label, sales: +dsSales[r.label].toFixed(1), pct: +(dsSales[r.label]/total*100).toFixed(1) })).filter(d=>d.sales>0).sort((a,b)=>b.sales-a.sales)
    const winner = data[0]

    const W = 640, H = 380
    const PAD_T = 0, PAD_L = 100, PAD_R = 60, PAD_B = 30
    const chartW = W - PAD_L - PAD_R
    const chartH = H - PAD_T - PAD_B

    const x = d3.scaleLinear().domain([0, total]).range([0, chartW])
    const y = d3.scaleBand().domain(data.map(d => d.region)).range([0, chartH]).padding(0.4)

    const svg = d3.create("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`).style("font-family","'JetBrains Mono', monospace")


    const g = svg.append("g").attr("transform",`translate(${PAD_L},${PAD_T})`)

    // Gridlines
    const ticks = x.ticks(5)
    g.selectAll(".grid").data(ticks).join("line")
      .attr("x1", d => x(d)).attr("x2", d => x(d))
      .attr("y1", 0).attr("y2", chartH)
      .attr("stroke", V_PRIMARY).attr("stroke-opacity", 0.08)

    // X axis labels 
    g.selectAll(".xtick").data(ticks).join("text")
      .attr("x", d => x(d)).attr("y", chartH + 18)
      .attr("text-anchor","middle").attr("fill",V_PRIMARY)
      .attr("font-size","9px").text(d => d + "M")

    // Stems
    g.selectAll(".stem").data(data).join("line")
      .attr("x1", 0).attr("x2", d => x(d.sales))
      .attr("y1", d => y(d.region) + y.bandwidth()/2)
      .attr("y2", d => y(d.region) + y.bandwidth()/2)
      .attr("stroke", d => REGION_COLORS[d.region])
      .attr("stroke-width", 2.5)
      .attr("opacity", (d,i) => i===0 ? 1 : 0.85)

    // Circle
    g.selectAll(".dot").data(data).join("circle")
      .attr("cx", d => x(d.sales))
      .attr("cy", d => y(d.region) + y.bandwidth()/2)
      .attr("r", 9)
      .attr("fill", d => REGION_COLORS[d.region])
      .attr("opacity", (d,i) => i===0 ? 1 : 0.85)

    // Region labels (left)
    g.selectAll(".label").data(data).join("text")
      .attr("x", -10).attr("y", d => y(d.region) + y.bandwidth()/2 + 4)
      .attr("text-anchor","end").attr("fill",V_PRIMARY)
      .attr("font-size","11px").attr("font-weight", (d,i) => i===0 ? "700" : "400")
      .text(d => d.region)

    // Value labels (right of dot) 
    g.selectAll(".val").data(data).join("text")
      .attr("x", d => x(d.sales) + 14)
      .attr("y", d => y(d.region) + y.bandwidth()/2 + 4)
      .attr("fill", V_PRIMARY).attr("font-size","10px")
      .attr("font-weight", (d,i) => i===0 ? "700" : "400")
      .text(d => d.sales.toFixed(0) + "M ("+d.pct+"%)")

    dsSalesEl.appendChild(svg.node())
  }
}

// TREEMAP — NA Platform Sales
{
  const naSalesEl = document.getElementById("naSalesChart")
  if (naSalesEl) {
    const d3 = await import("https://cdn.jsdelivr.net/npm/d3@7/+esm")
    const topPlatforms = Object.keys(PLATFORM_COLORS).filter(p => p !== "Other")
    const naSales = {}
    topPlatforms.forEach(p => { naSales[p] = 0 })
    wide.forEach(d => { if (!topPlatforms.includes(d.Platform)) return; naSales[d.Platform] += +d.NA_Sales || 0 })
    const total = topPlatforms.reduce((s,p) => s+naSales[p], 0)
    const data  = topPlatforms.map(p => ({ platform:p, sales:+naSales[p].toFixed(1), pct:+(naSales[p]/total*100).toFixed(1) })).filter(d=>d.sales>0).sort((a,b)=>b.sales-a.sales)
    const winner = data[0]
    const W = 640, H = 380, PAD_T = 0
    const root = d3.hierarchy({ children: data }).sum(d => d.pct)
    d3.treemap().size([W, H-PAD_T]).padding(3).round(true)(root)
    const svg = d3.create("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`).style("font-family","'JetBrains Mono', monospace")
    const cell = svg.selectAll("g").data(root.leaves()).join("g").attr("transform",d=>`translate(${d.x0},${d.y0+PAD_T})`)
    cell.append("rect").attr("width",d=>d.x1-d.x0).attr("height",d=>d.y1-d.y0).attr("fill",d=>PLATFORM_COLORS[d.data.platform]).attr("opacity",(d,i)=>i===0?1:0.85).attr("rx",3)
    cell.append("rect").attr("width",d=>d.x1-d.x0).attr("height",d=>d.y1-d.y0).attr("fill","none").attr("stroke",V_BG).attr("stroke-width",2).attr("rx",3)
    cell.filter(d=>(d.x1-d.x0)>35&&(d.y1-d.y0)>22).append("text").attr("x",d=>(d.x1-d.x0)/2).attr("y",d=>(d.y1-d.y0)/2-7).attr("text-anchor","middle").attr("fill",V_BG).attr("font-size",d=>(d.x1-d.x0)>80?"13px":"10px").attr("font-weight","700").text(d=>d.data.platform)
    cell.filter(d=>(d.x1-d.x0)>35&&(d.y1-d.y0)>36).append("text").attr("x",d=>(d.x1-d.x0)/2).attr("y",d=>(d.y1-d.y0)/2+10).attr("text-anchor","middle").attr("fill",V_BG).attr("opacity","0.85").attr("font-size",d=>(d.x1-d.x0)>80?"11px":"9px").text(d=>d.data.pct.toFixed(0)+"%")
    naSalesEl.appendChild(svg.node())
  }
}

// TREEMAP — Japan Platform Sales
{
  const jpSalesEl = document.getElementById("jpSalesChart")
  if (jpSalesEl) {
    const d3 = await import("https://cdn.jsdelivr.net/npm/d3@7/+esm")
    const topPlatforms = Object.keys(PLATFORM_COLORS).filter(p => p !== "Other")
    const jpSales = {}
    topPlatforms.forEach(p => { jpSales[p] = 0 })
    wide.forEach(d => { if (!topPlatforms.includes(d.Platform)) return; jpSales[d.Platform] += +d.JP_Sales || 0 })
    const total = topPlatforms.reduce((s,p) => s+jpSales[p], 0)
    const data  = topPlatforms.map(p => ({ platform:p, sales:+jpSales[p].toFixed(1), pct:+(jpSales[p]/total*100).toFixed(1) })).filter(d=>d.sales>0).sort((a,b)=>b.sales-a.sales)
    const winner = data[0]
    const W = 640, H = 380, PAD_T = 0
    const root = d3.hierarchy({ children: data }).sum(d => d.pct)
    d3.treemap().size([W, H-PAD_T]).padding(3).round(true)(root)
    const svg = d3.create("svg").attr("width","100%").attr("viewBox",`0 0 ${W} ${H}`).style("font-family","'JetBrains Mono', monospace")
    const cell = svg.selectAll("g").data(root.leaves()).join("g").attr("transform",d=>`translate(${d.x0},${d.y0+PAD_T})`)
    cell.append("rect").attr("width",d=>d.x1-d.x0).attr("height",d=>d.y1-d.y0).attr("fill",d=>PLATFORM_COLORS[d.data.platform]).attr("opacity",(d,i)=>i===0?1:0.85).attr("rx",3)
    cell.append("rect").attr("width",d=>d.x1-d.x0).attr("height",d=>d.y1-d.y0).attr("fill","none").attr("stroke",V_BG).attr("stroke-width",2).attr("rx",3)
    cell.filter(d=>(d.x1-d.x0)>35&&(d.y1-d.y0)>22).append("text").attr("x",d=>(d.x1-d.x0)/2).attr("y",d=>(d.y1-d.y0)/2-7).attr("text-anchor","middle").attr("fill",V_BG).attr("font-size",d=>(d.x1-d.x0)>80?"13px":"10px").attr("font-weight","700").text(d=>d.data.platform)
    cell.filter(d=>(d.x1-d.x0)>35&&(d.y1-d.y0)>36).append("text").attr("x",d=>(d.x1-d.x0)/2).attr("y",d=>(d.y1-d.y0)/2+10).attr("text-anchor","middle").attr("fill",V_BG).attr("opacity","0.85").attr("font-size",d=>(d.x1-d.x0)>80?"11px":"9px").text(d=>d.data.pct.toFixed(0)+"%")
    jpSalesEl.appendChild(svg.node())
  }
}

// LINE CHART — Just Dance Was a Wii Game
{
  const jdLineEl = document.getElementById("jdLineChart")
  if (jdLineEl) {
    const jdGames = wide.filter(d => typeof d.Name === "string" && d.Name.toLowerCase().includes("just dance"))
    const byYearPlatform = {}
    jdGames.forEach(d => {
      const yr = +d.Year
      if (!yr || isNaN(yr)) return
      const group = (d.Platform === "Wii" || d.Platform === "WiiU") ? "Wii" : "Other Platforms"
    if (!byYearPlatform[yr]) byYearPlatform[yr] = { Wii: 0, "Other Platforms": 0 }
      byYearPlatform[yr][group] += +d.Global_Sales || 0
    })
    const chartData = []
    Object.entries(byYearPlatform).forEach(([year, groups]) => {
      Object.entries(groups).forEach(([group, sales]) => {
        chartData.push({ Year: +year, Group: group, Sales: +sales.toFixed(2) })
      })
    })
    chartData.sort((a,b) => a.Year - b.Year)

    const jdLegendEl = document.getElementById("jdLineLegend")
    if (jdLegendEl) {
      jdLegendEl.style.cssText = "display:flex;gap:20px;margin-bottom:1.75rem;align-items:center;"
      ;[{ label: "Wii & WiiU", color: PLATFORM_COLORS["Wii"] },
        { label: "Other Platforms", color: V_PRIMARY }
      ].forEach(g => {
        const item = document.createElement("div")
        item.style.cssText = "display:flex;align-items:center;gap:8px;"
        item.innerHTML = `
          <div style="width:28px;height:3px;background:${g.color};border-radius:2px;flex-shrink:0;"></div>
          <span style="font-family:'JetBrains Mono',monospace;font-size:var(--p-size);color:var(--color-text);">${g.label}</span>
        `
        jdLegendEl.appendChild(item)
      })
    }

    await vegaEmbed(jdLineEl, {
      $schema: "https://vega.github.io/schema/vega-lite/v6.json",
      width: 560, height: 280,
      data: { values: chartData },
      layer: [
        {
          mark: { type: "line", interpolate: "monotone", strokeWidth: 2 },
          encoding: {
            x: { field: "Year", type: "quantitative",
              axis: { title: null, labelColor: V_PRIMARY, labelFont: "JetBrains Mono", labelFontSize: 9,
                gridColor: "transparent", domainColor: V_PRIMARY, domainOpacity: 0.3,
                tickColor: "transparent", format: "d" } },
            y: { field: "Sales", type: "quantitative",
              axis: { title: "Global Sales (M)", titleColor: V_PRIMARY, titleFont: "JetBrains Mono", titleFontSize: 9,
                labelColor: V_PRIMARY, labelFont: "JetBrains Mono", labelFontSize: 9,
                gridColor: V_PRIMARY, gridOpacity: 0.08, domainColor: "transparent", tickColor: "transparent" } },
            color: { field: "Group", type: "nominal",
                scale: { domain: ["Wii","Other Platforms"], range: ["#1C2968", "#DA3A2F"] }, legend: null}
          }
        },
        {
          mark: { type: "point", filled: true, size: 60 },
          encoding: {
            x: { field: "Year",  type: "quantitative" },
            y: { field: "Sales", type: "quantitative" },
            color: { field: "Group", type: "nominal",
                scale: { domain: ["Wii","Other Platforms"], range: ["#1C2968", "#DA3A2F"] }, legend: null },
            tooltip: [
              { field: "Year",  type: "quantitative" },
              { field: "Group", type: "nominal",      title: "Platform" },
              { field: "Sales", type: "quantitative", title: "Sales (M)", format: ".2f" }
            ]
          }
        }
      ],
      config: { background: "transparent", view: { stroke: "transparent" }, axis: { labelFont: "JetBrains Mono" } }
    }, VEGA_OPTS)
  }
}

// LINE CHART — Platform sales over time
{
  const platformTimeEl = document.getElementById("platformTimeChart")
  if (platformTimeEl) {
    const platforms = ["PS2","Wii","X360","PS3","DS","PS","GBA","PSP"]

    const byPlatformYear = {}
    wide.forEach(d => {
      if (!platforms.includes(d.Platform)) return
      const yr = +d.Year
      if (!yr || isNaN(yr) || yr < 1994 || yr > 2016) return
      const key = d.Platform + "||" + yr
      if (!byPlatformYear[key]) byPlatformYear[key] = { Platform: d.Platform, Year: yr, Sales: 0 }
      byPlatformYear[key].Sales += +d.Global_Sales || 0
    })

    const chartData = Object.values(byPlatformYear)
      .map(d => ({ ...d, Sales: +d.Sales.toFixed(2) }))
      .sort((a, b) => a.Year - b.Year)

    await vegaEmbed(platformTimeEl, {
      $schema: "https://vega.github.io/schema/vega-lite/v6.json",
      width: 560, height: 340,
      data: { values: chartData },
      layer: [
        {
          mark: { type: "line", interpolate: "monotone", strokeWidth: 2 },
          encoding: {
            x: {
              field: "Year", type: "quantitative",
              scale: { domain: [1994, 2016], clamp: true },
              axis: { title: null, labelColor: V_PRIMARY, labelFont: "JetBrains Mono",
                labelFontSize: 9, gridColor: "transparent", domainColor: V_PRIMARY,
                domainOpacity: 0.3, tickColor: "transparent", format: "d" }
            },
            y: {
              field: "Sales", type: "quantitative",
              axis: { title: "Global Sales (M)", titleColor: V_PRIMARY,
                titleFont: "JetBrains Mono", titleFontSize: 9,
                labelColor: V_PRIMARY, labelFont: "JetBrains Mono", labelFontSize: 9,
                gridColor: V_PRIMARY, gridOpacity: 0.08,
                domainColor: "transparent", tickColor: "transparent" }
            },
            color: {
              field: "Platform", type: "nominal",
              scale: { domain: platforms, range: platforms.map(p => PLATFORM_COLORS[p]) },
              legend: null
            },
            tooltip: [
              { field: "Platform", type: "nominal" },
              { field: "Year",     type: "quantitative" },
              { field: "Sales",    type: "quantitative", title: "Sales (M)", format: ".1f" }
            ]
          }
        },
        {
          mark: { type: "text", align: "left", dx: 6, fontSize: 10,
            fontWeight: "bold", font: "JetBrains Mono" },
          transform: [
            {
              joinaggregate: [{ op: "max", field: "Sales", as: "PeakSales" }],
              groupby: ["Platform"]
            },
            { filter: "datum.Sales === datum.PeakSales" }
          ],
          encoding: {
            x: { field: "Year", type: "quantitative" },
            y: { field: "Sales", type: "quantitative" },
            text: { field: "Platform", type: "nominal" },
            color: {
              field: "Platform", type: "nominal",
              scale: { domain: platforms, range: platforms.map(p => PLATFORM_COLORS[p]) },
              legend: null
            }
          }
        }
      ],
      config: {
        background: "transparent",
        view: { stroke: "transparent" },
        axis: { labelFont: "JetBrains Mono" }
      }
    }, VEGA_OPTS)
  }
}

// BUBBLE CHART — Just Dance 3 in context: 2011's biggest games
{
    const jdRegionEl = document.getElementById("jdRegionChart")
    if (jdRegionEl) {
      const top2011 = [
        { Name: "Call of Duty: MW3",          Sales: 30.83, Genre: "Shooter",      isJD: false },
        { Name: "The Elder Scrolls V: Skyrim", Sales: 19.28, Genre: "Role-Playing", isJD: false },
        { Name: "Battlefield 3",               Sales: 17.36, Genre: "Shooter",      isJD: false },
        { Name: "FIFA 12",                     Sales: 13.15, Genre: "Sports",       isJD: false },
        { Name: "Just Dance 3",                Sales: 12.92, Genre: "Misc",         isJD: true  },
        { Name: "Mario Kart 7",                Sales: 12.21, Genre: "Racing",       isJD: false },
        { Name: "Batman: Arkham City",         Sales: 10.82, Genre: "Action",       isJD: false },
        { Name: "Super Mario 3D Land",         Sales: 10.79, Genre: "Platform",     isJD: false },
        { Name: "Assassin's Creed: Rev.",      Sales:  9.19, Genre: "Action",       isJD: false },
        { Name: "LEGO Star Wars III",          Sales:  7.56, Genre: "Action",       isJD: false },
      ]
  
      const genres = [...new Set(top2011.map(d => d.Genre))]
      const genreColors = {
        "Shooter":      "#DA3A2F",
        "Role-Playing": "#643C94",
        "Sports":       "#0dab5c",
        "Misc":         "#e97f2b",
        "Racing":       "#1C2968",
        "Action":       "#6396FF",
        "Platform":     "#F3AEC6",
      }
  
      // Build legend
      const jdRegionLegendEl = document.getElementById("jdRegionLegend")
      if (jdRegionLegendEl) {
        jdRegionLegendEl.innerHTML = ""
        jdRegionLegendEl.style.cssText = "display:flex;gap:12px;margin-bottom:1.75rem;align-items:center;flex-wrap:wrap;"
        genres.forEach(g => {
          const item = document.createElement("div")
          item.className = "legend-item"
          item.dataset.genre = g
          item.innerHTML = `<div class="legend-dot" style="background:${genreColors[g]}"></div><span class="legend-label">${g}</span>`
          jdRegionLegendEl.appendChild(item)
        })
      }
  
      function makeBubbleSpec(highlightGenre) {
        const colorDomain = Object.keys(genreColors)
        const colorRange  = colorDomain.map(g =>
          !highlightGenre || g === highlightGenre ? genreColors[g] : "#e8e8d8"
        )
        const opacityRange = colorDomain.map(g =>
          !highlightGenre || g === highlightGenre ? 0.85 : 0.2
        )
  
        const sortedNames = [...top2011].sort((a,b) => b.Sales - a.Sales).map(d => d.Name)
  
        return {
          $schema: "https://vega.github.io/schema/vega-lite/v6.json",
          width: "container", height: 340,
          autosize: { type: "fit", contains: "padding" },
          data: { values: top2011 },
          layer: [
            // Stems
            {
              mark: { type: "rule", strokeWidth: 1.5 },
              encoding: {
                y: { field: "Name", type: "nominal", sort: sortedNames },
                x: { field: "Sales", type: "quantitative" },
                x2: { value: 0 },
                color: { field: "Genre", type: "nominal",
                  scale: { domain: colorDomain, range: colorRange }, legend: null },
              }
            },
            // Dots
            {
              mark: { type: "point", filled: true, size: 120 },
              encoding: {
                y: { field: "Name", type: "nominal", sort: sortedNames,
                  axis: { title: null, labelColor: V_PRIMARY, labelFont: "JetBrains Mono",
                    labelFontSize: 10, domainColor: "transparent", tickColor: "transparent",
                    gridColor: V_PRIMARY, gridOpacity: 0.06, labelLimit: 220 } },
                x: { field: "Sales", type: "quantitative",
                  scale: { domain: [0, 35] },
                  axis: { title: "Total Global Sales 2011 (M)", titleColor: V_PRIMARY,
                    titleFont: "JetBrains Mono", titleFontSize: 9,
                    labelColor: V_PRIMARY, labelFont: "JetBrains Mono", labelFontSize: 9,
                    gridColor: V_PRIMARY, gridOpacity: 0.08,
                    domainColor: V_PRIMARY, domainOpacity: 0.3, tickColor: "transparent" } },
                color: { field: "Genre", type: "nominal",
                  scale: { domain: colorDomain, range: colorRange }, legend: null },
                tooltip: [
                  { field: "Name",  type: "nominal",      title: "Game" },
                  { field: "Genre", type: "nominal",      title: "Genre" },
                  { field: "Sales", type: "quantitative", title: "Sales (M)", format: ".2f" }
                ]
              }
            },
            // Sales labels
            {
              mark: { type: "text", align: "left", dx: 10, fontSize: 9,
                font: "JetBrains Mono" },
              encoding: {
                y: { field: "Name",  type: "nominal", sort: sortedNames },
                x: { field: "Sales", type: "quantitative" },
                text: { field: "Sales", type: "quantitative", format: ".1f" },
                color: { field: "Genre", type: "nominal",
                  scale: { domain: colorDomain, range: colorRange }, legend: null },
              }
            }
          ],
          config: { background: "transparent", view: { stroke: "transparent" },
            axis: { labelFont: "JetBrains Mono" } }
        }
      }
  
      let currentGenre = null
  
      async function renderBubble(highlight) {
        currentGenre = highlight
        await vegaEmbed(jdRegionEl, makeBubbleSpec(highlight), VEGA_OPTS)
      }
  
      await renderBubble(null)
  
      if (jdRegionLegendEl) {
        jdRegionLegendEl.addEventListener("mouseover", e => {
          const item = e.target.closest("[data-genre]")
          if (!item) return
          const g = item.dataset.genre
          jdRegionLegendEl.querySelectorAll(".legend-item").forEach(el => {
            el.style.opacity     = el.dataset.genre === g ? "1" : "0.35"
            el.style.borderStyle = el.dataset.genre === g ? "solid" : "dotted"
          })
          renderBubble(g)
        })
        jdRegionLegendEl.addEventListener("mouseleave", () => {
          jdRegionLegendEl.querySelectorAll(".legend-item").forEach(el => {
            el.style.opacity = "1"; el.style.borderStyle = "dotted"
          })
          renderBubble(null)
        })
      }
    }
  }