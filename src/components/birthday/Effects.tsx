import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Shared particle intensity (finale + music boost)
export const fx = { intensity: 1 };

/* Rose petals + embers drifting upward */
export function Particles({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.width = innerWidth * dpr;
      h = c.height = innerHeight * dpr;
    };
    resize();
    addEventListener("resize", resize);
    const count = reduced ? 12 : innerWidth < 700 ? 34 : 60;
    const mk = (init = false) => ({
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 20 * dpr,
      s: (Math.random() * 6 + 3) * dpr,
      v: (Math.random() * 0.5 + 0.25) * dpr,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      sway: Math.random() * 100,
      petal: Math.random() < 0.45,
      a: Math.random() * 0.5 + 0.35,
    });
    const ps = Array.from({ length: count }, () => mk(true));
    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const k = fx.intensity;
      for (const p of ps) {
        p.y -= p.v * k * (reduced ? 0.3 : 1);
        p.x += Math.sin(t / 1600 + p.sway) * 0.35 * dpr;
        p.r += p.vr * k;
        if (p.y < -30 * dpr) Object.assign(p, mk());
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        if (p.petal) {
          ctx.globalAlpha = p.a * 0.85;
          ctx.fillStyle = "#B0122B";
          ctx.beginPath();
          ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#D4163C";
          ctx.beginPath();
          ctx.ellipse(-p.s * 0.2, 0, p.s * 0.5, p.s * 0.28, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.s * 0.9 * Math.min(k, 1.8));
          g.addColorStop(0, `rgba(232,199,160,${p.a})`);
          g.addColorStop(0.35, `rgba(212,22,60,${p.a * 0.7})`);
          g.addColorStop(1, "rgba(212,22,60,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.s * 0.9 * Math.min(k, 1.8), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, [reduced]);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-10 h-full w-full" />;
}

/* Burst: petals + gold hearts, used for confetti and the easter egg */
export function burst(kind: "confetti" | "hearts") {
  const c = document.createElement("canvas");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  Object.assign(c.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "70" });
  document.body.appendChild(c);
  const ctx = c.getContext("2d")!;
  const cx = c.width / 2, cy = c.height * (kind === "hearts" ? 0.5 : 0.55);
  const n = kind === "hearts" ? 110 : 160;
  const ps = Array.from({ length: n }, () => {
    const a = Math.random() * Math.PI * 2;
    const sp = (Math.random() * 14 + 4) * dpr;
    return {
      x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 8 * dpr,
      s: (Math.random() * 8 + 5) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
      heart: kind === "hearts" ? true : Math.random() < 0.35,
      col: ["#D4163C", "#B0122B", "#E8C7A0"][Math.floor(Math.random() * 3)]!,
    };
  });
  const heart = (s: number) => {
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.4, -s * 0.4, -s, 0, -s * 0.45);
    ctx.bezierCurveTo(s * 0.4, -s, s, -s * 0.4, 0, s * 0.3);
    ctx.fill();
  };
  let f = 0;
  const loop = () => {
    f++;
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of ps) {
      p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.35 * dpr;
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - f / 200);
      ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.col;
      if (p.heart) heart(p.s);
      else { ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * 0.5, 0, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    if (f < 200) requestAnimationFrame(loop);
    else c.remove();
  };
  loop();
}

export function ProgressLine() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed left-0 top-0 z-[65] h-[2px] w-full origin-left bg-cherry-bright glow-box"
    />
  );
}

/* Desktop ember cursor with trail; mobile touch ripples */
export function CursorFx() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches;
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; };
    resize();
    addEventListener("resize", resize);
    const trail: { x: number; y: number; life: number }[] = [];
    const ripples: { x: number; y: number; t: number }[] = [];
    let mx = -100, my = -100, raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX * dpr; my = e.clientY * dpr;
      trail.push({ x: mx, y: my, life: 1 });
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      ripples.push({ x: e.clientX * dpr, y: e.clientY * dpr, t: 0 });
    };
    addEventListener("pointermove", move);
    addEventListener("pointerdown", down);
    if (fine) document.documentElement.style.cursor = "none";
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]!;
        p.life -= 0.05;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(212,22,60,${p.life * 0.4})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 5 * dpr * p.life, 0, Math.PI * 2); ctx.fill();
      }
      if (fine) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 14 * dpr);
        g.addColorStop(0, "rgba(232,199,160,1)");
        g.addColorStop(0.3, "rgba(212,22,60,0.9)");
        g.addColorStop(1, "rgba(212,22,60,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(mx, my, 14 * dpr, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]!;
        r.t += 0.025;
        if (r.t >= 1) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(212,22,60,${(1 - r.t) * 0.6})`;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.t * 60 * dpr, 0, Math.PI * 2); ctx.stroke();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      document.documentElement.style.cursor = "";
    };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[80] h-full w-full" />;
}

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="blob absolute -left-[20vw] top-[10vh] h-[60vw] w-[60vw] rounded-full bg-cherry/25" />
      <div className="blob absolute -right-[25vw] bottom-[-10vh] h-[70vw] w-[70vw] rounded-full bg-velvet/80 [animation-delay:-8s]" />
      <div className="blob absolute left-[30vw] top-[50vh] h-[35vw] w-[35vw] rounded-full bg-cherry-bright/10 [animation-delay:-14s]" />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
