import * as THREE from "three";

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx: canvas.getContext("2d")! };
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Pseudo-aléatoire déterministe pour que le dessin soit stable d'un rendu à l'autre. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/**
 * Vue stylisée depuis la fenêtre : l'océan, la ville et le phare des Mamelles
 * sur sa colline. Deux versions : jour (soleil couchant) et nuit.
 */
export function createDakarTexture(night: boolean) {
  const W = 1024;
  const H = 768;
  const { canvas, ctx } = createCanvas(W, H);
  const random = seeded(7);
  const horizon = H * 0.62;

  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  if (night) {
    sky.addColorStop(0, "#070b1d");
    sky.addColorStop(0.7, "#141b3a");
    sky.addColorStop(1, "#2a2346");
  } else {
    sky.addColorStop(0, "#7fb6e0");
    sky.addColorStop(0.55, "#f2c793");
    sky.addColorStop(1, "#f59b6b");
  }
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, horizon);

  if (night) {
    for (let i = 0; i < 140; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.3 + random() * 0.7})`;
      const size = random() < 0.1 ? 2.2 : 1.2;
      ctx.fillRect(random() * W, random() * horizon * 0.85, size, size);
    }
    ctx.fillStyle = "#f4efe5";
    ctx.beginPath();
    ctx.arc(W * 0.24, H * 0.2, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#141b3a";
    ctx.beginPath();
    ctx.arc(W * 0.24 + 14, H * 0.2 - 8, 30, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const glow = ctx.createRadialGradient(W * 0.3, horizon - 30, 10, W * 0.3, horizon - 30, 260);
    glow.addColorStop(0, "rgba(255,236,190,0.95)");
    glow.addColorStop(1, "rgba(255,200,140,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, horizon);
    ctx.fillStyle = "#fff1cf";
    ctx.beginPath();
    ctx.arc(W * 0.3, horizon - 30, 48, 0, Math.PI * 2);
    ctx.fill();
  }

  // Océan
  const sea = ctx.createLinearGradient(0, horizon, 0, H);
  sea.addColorStop(0, night ? "#1b2550" : "#e98b63");
  sea.addColorStop(0.25, night ? "#0f1734" : "#3f7fa6");
  sea.addColorStop(1, night ? "#070b1d" : "#1e4f73");
  ctx.fillStyle = sea;
  ctx.fillRect(0, horizon, W, H - horizon);
  ctx.strokeStyle = night ? "rgba(244,239,229,0.12)" : "rgba(255,240,215,0.35)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 26; i++) {
    const y = horizon + 10 + random() * (H - horizon - 10);
    const x = random() * W;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30 + random() * 60, y);
    ctx.stroke();
  }

  // Colline des Mamelles et phare
  const hillColor = night ? "#0d1226" : "#6b4a3a";
  ctx.fillStyle = hillColor;
  ctx.beginPath();
  ctx.moveTo(W * 0.55, horizon + 4);
  ctx.quadraticCurveTo(W * 0.72, horizon - 150, W * 0.86, horizon - 120);
  ctx.quadraticCurveTo(W * 0.95, horizon - 100, W, horizon - 40);
  ctx.lineTo(W, horizon + 4);
  ctx.fill();

  const lx = W * 0.82;
  const ly = horizon - 128;
  ctx.fillStyle = night ? "#c9c3b8" : "#f6f1e7";
  ctx.fillRect(lx - 9, ly - 56, 18, 56);
  ctx.fillRect(lx - 14, ly - 62, 28, 8);
  ctx.fillStyle = night ? "#ffd27a" : "#d9a45a";
  ctx.fillRect(lx - 7, ly - 76, 14, 14);
  if (night) {
    const beam = ctx.createLinearGradient(lx, ly - 70, lx - 420, ly - 40);
    beam.addColorStop(0, "rgba(255,214,140,0.55)");
    beam.addColorStop(1, "rgba(255,214,140,0)");
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(lx, ly - 70);
    ctx.lineTo(lx - 440, ly - 120);
    ctx.lineTo(lx - 440, ly - 10);
    ctx.fill();
  }

  // Silhouette de la ville au premier plan
  let x = -10;
  while (x < W * 0.62) {
    const w = 34 + random() * 60;
    const h = 40 + random() * 120;
    const top = H - 70 - h;
    ctx.fillStyle = night ? "#0a0e1e" : "#a7684e";
    ctx.fillRect(x, top, w, h + 80);
    if (night) {
      for (let wy = top + 10; wy < H - 70; wy += 16) {
        for (let wx = x + 6; wx < x + w - 8; wx += 12) {
          if (random() < 0.35) {
            ctx.fillStyle = random() < 0.7 ? "#f0b35a" : "#fff1cf";
            ctx.fillRect(wx, wy, 5, 7);
          }
        }
      }
    }
    x += w + 4;
  }
  ctx.fillStyle = night ? "#06091a" : "#7e4c3a";
  ctx.fillRect(0, H - 70, W, 70);

  return toTexture(canvas);
}

const codeLines: [string, string][] = [
  ["#c792ea", "import"],
  ["#f4efe5", "  { useState } from 'react';"],
  ["#7bd3a3", "// FixSen : trouver un pro près de chez soi"],
  ["#c792ea", "export async function"],
  ["#78b7ff", "  findProviders(category, position) {"],
  ["#f4efe5", "  const res = await api.get('/providers', {"],
  ["#f0b35a", "    params: { category, near: position },"],
  ["#f4efe5", "  });"],
  ["#f4efe5", "  return res.data.sort(byDistance);"],
  ["#f4efe5", "}"],
  ["#7bd3a3", "// BoomParty : réservation de billets"],
  ["#c792ea", "router.post"],
  ["#f0b35a", "  ('/bookings', auth, async (req, res) => {"],
  ["#f4efe5", "  const ticket = await Ticket.reserve(req.body);"],
  ["#f4efe5", "  res.status(201).json(ticket);"],
  ["#f4efe5", "});"],
  ["#7bd3a3", "// Dashboard : indicateurs en temps réel"],
  ["#c792ea", "const"],
  ["#78b7ff", "  stats = useQuery(['kpi'], fetchKpi);"],
  ["#ff8aa6", "  if (stats.isLoading) return <Skeleton />;"],
];

/** Écran du portable : du code qui défile. Renvoie la texture et une fonction de rendu. */
export function createCodeScreen() {
  const W = 512;
  const H = 336;
  const { canvas, ctx } = createCanvas(W, H);
  const texture = toTexture(canvas);
  const lineHeight = 22;

  function draw(offset: number) {
    ctx.fillStyle = "#11131a";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#1b1e28";
    ctx.fillRect(0, 0, W, 26);
    ["#ff6b6b", "#f0b35a", "#7bd3a3"].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(16 + i * 16, 13, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = "15px Consolas, 'Courier New', monospace";
    const start = Math.floor(offset);
    const shift = (offset - start) * lineHeight;
    for (let i = 0; i < 16; i++) {
      const [color, text] = codeLines[(start + i) % codeLines.length];
      const y = 50 + i * lineHeight - shift;
      ctx.fillStyle = "#4b5263";
      ctx.fillText(String(((start + i) % 99) + 1).padStart(2, " "), 10, y);
      ctx.fillStyle = color;
      ctx.fillText(text, 42, y);
    }
    texture.needsUpdate = true;
  }

  draw(0);
  return { texture, draw };
}

/** Écran du téléphone : une interface d'app stylisée. */
export function createPhoneScreen() {
  const W = 256;
  const H = 512;
  const { canvas, ctx } = createCanvas(W, H);
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#2563eb");
  bg.addColorStop(1, "#7c3aed");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px Inter, sans-serif";
  ctx.fillText("FixSen", 24, 92);
  ctx.font = "16px Inter, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText("Explorez les services", 24, 122);
  const tiles = ["#fecaca", "#fed7aa", "#e9d5ff", "#bfdbfe", "#bbf7d0", "#e5e7eb"];
  tiles.forEach((color, i) => {
    const x = 24 + (i % 2) * 108;
    const y = 160 + Math.floor(i / 2) * 104;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(x, y, 96, 90, 14);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + 48, y + 38, 22, 0, Math.PI * 2);
    ctx.fill();
  });
  return toTexture(canvas);
}

/** Petite étiquette (post-it, carte) avec un texte centré. */
export function createLabelTexture(text: string, background: string, color = "#2a241c") {
  const W = 256;
  const H = 256;
  const { canvas, ctx } = createCanvas(W, H);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const size = text.length > 9 ? 34 : 44;
  ctx.font = `600 ${size}px Inter, sans-serif`;
  ctx.fillText(text, W / 2, H / 2);
  return toTexture(canvas);
}

/** Page de carnet lignée avec quelques notes manuscrites. */
export function createNotebookPage(title: string, lines: string[]) {
  const W = 256;
  const H = 360;
  const { canvas, ctx } = createCanvas(W, H);
  ctx.fillStyle = "#f7f1e3";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(120,183,255,0.45)";
  ctx.lineWidth = 1;
  for (let y = 70; y < H; y += 28) {
    ctx.beginPath();
    ctx.moveTo(14, y);
    ctx.lineTo(W - 14, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#c2410c";
  ctx.font = "italic 600 26px Georgia, serif";
  ctx.fillText(title, 20, 46);
  ctx.fillStyle = "#3b3226";
  ctx.font = "italic 19px Georgia, serif";
  lines.forEach((line, i) => ctx.fillText(line, 22, 92 + i * 28));
  return toTexture(canvas);
}
