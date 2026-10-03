// Canvas comet for the Past FACTs star chart. A comet is drawn only while it
// is flying (no idle loop), so the sky costs nothing when nobody is choosing.

export type Pt = { x: number; y: number };

type FlightOptions = {
  duration: number;
  ease?: (t: number) => number;
  /** Called every frame with the comet head, in canvas pixels. */
  onProgress?: (head: Pt) => void;
  /** Called once when the head passes each vertex of the path (index into path). */
  onVertex?: (index: number) => void;
  onArrive?: () => void;
};

const TAIL_SAMPLES = 26;
const FLARE_MS = 560;

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Size the canvas backing store to its CSS box at device resolution. */
export function fitCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const { width, height } = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.round(width * dpr);
  const h = Math.round(height * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function measure(path: Pt[]) {
  const cumulative = [0];
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x;
    const dy = path[i].y - path[i - 1].y;
    cumulative.push(cumulative[i - 1] + Math.hypot(dx, dy));
  }
  return cumulative;
}

function pointAt(path: Pt[], cumulative: number[], s: number): Pt {
  const total = cumulative[cumulative.length - 1];
  const d = Math.max(0, Math.min(total, s));
  let i = 1;
  while (i < cumulative.length - 1 && cumulative[i] < d) i++;
  const span = cumulative[i] - cumulative[i - 1] || 1;
  const t = (d - cumulative[i - 1]) / span;
  return {
    x: path[i - 1].x + (path[i].x - path[i - 1].x) * t,
    y: path[i - 1].y + (path[i].y - path[i - 1].y) * t,
  };
}

function drawHead(ctx: CanvasRenderingContext2D, head: Pt, strength: number) {
  const r = 18;
  const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, r);
  glow.addColorStop(0, `rgba(255, 255, 240, ${strength})`);
  glow.addColorStop(0.22, `rgba(255, 255, 221, ${0.85 * strength})`);
  glow.addColorStop(0.5, `rgba(179, 122, 212, ${0.4 * strength})`);
  glow.addColorStop(1, 'rgba(179, 122, 212, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(head.x, head.y, r, 0, Math.PI * 2);
  ctx.fill();

  // A small four-point glint, the same shape as the chart's stars.
  ctx.strokeStyle = `rgba(255, 255, 230, ${0.75 * strength})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(head.x - 9, head.y);
  ctx.lineTo(head.x + 9, head.y);
  ctx.moveTo(head.x, head.y - 9);
  ctx.lineTo(head.x, head.y + 9);
  ctx.stroke();
}

/**
 * Fly a comet along `path` (canvas pixels). Returns a cancel function that
 * stops the flight and clears the canvas.
 */
export function flyComet(canvas: HTMLCanvasElement, path: Pt[], options: FlightOptions) {
  const fitted = fitCanvas(canvas);
  if (!fitted || path.length < 2) {
    options.onArrive?.();
    return () => {};
  }
  const { ctx, width, height } = fitted;
  const ease = options.ease ?? easeInOutCubic;
  const cumulative = measure(path);
  const total = cumulative[cumulative.length - 1];
  const tailLength = Math.min(150, total * 0.55);
  let reached = 0;
  let raf = 0;
  let start = 0;

  options.onVertex?.(0);

  const flight = (now: number) => {
    if (!start) start = now;
    const p = Math.min(1, (now - start) / options.duration);
    const s = ease(p) * total;
    const head = pointAt(path, cumulative, s);

    while (reached < path.length - 1 && cumulative[reached + 1] <= s + 0.5) {
      reached++;
      options.onVertex?.(reached);
    }

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    // The tail shortens as the comet settles, so it lands instead of stopping.
    const tail = tailLength * (1 - easeOutCubic(Math.max(0, (p - 0.8) / 0.2)) * 0.85);
    for (let i = 0; i < TAIL_SAMPLES; i++) {
      const a = pointAt(path, cumulative, s - (tail * i) / TAIL_SAMPLES);
      const b = pointAt(path, cumulative, s - (tail * (i + 1)) / TAIL_SAMPLES);
      const fade = Math.pow(1 - i / TAIL_SAMPLES, 1.7);
      const w = 3.4 * (1 - i / TAIL_SAMPLES) + 0.4;

      ctx.strokeStyle = `rgba(179, 122, 212, ${0.22 * fade})`;
      ctx.lineWidth = w * 4;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      ctx.strokeStyle = `rgba(255, 255, 221, ${0.9 * fade})`;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    drawHead(ctx, head, 1);
    ctx.globalCompositeOperation = 'source-over';
    options.onProgress?.(head);

    if (p < 1) {
      raf = requestAnimationFrame(flight);
    } else {
      start = 0;
      options.onArrive?.();
      raf = requestAnimationFrame((t) => flare(t, head));
    }
  };

  const flare = (now: number, at: Pt) => {
    if (!start) start = now;
    const q = Math.min(1, (now - start) / FLARE_MS);
    const out = easeOutCubic(q);
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    drawHead(ctx, at, 1 - out);
    ctx.strokeStyle = `rgba(179, 122, 212, ${0.75 * (1 - q)})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(at.x, at.y, 8 + 34 * out, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    if (q < 1) raf = requestAnimationFrame((t) => flare(t, at));
    else ctx.clearRect(0, 0, width, height);
  };

  raf = requestAnimationFrame(flight);

  return () => {
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, width, height);
  };
}
