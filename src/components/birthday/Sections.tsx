import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import * as C from "@/content";
import { burst, fx } from "./Effects";

const ease = [0.22, 0.61, 0.18, 1] as const;

/* ---------------- 1. HERO ---------------- */
export function Hero({ started }: { started: boolean }) {
  const letters = (C.hero.pre + " " + C.hero.name + "").split("");
  const preLen = C.hero.pre.length + 1;
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 py-24 md:px-16">
      <motion.div
        aria-hidden
        className="absolute left-[10%] top-1/3 h-64 w-64 rounded-full bg-cherry/40 blur-[90px] md:h-[28rem] md:w-[28rem]"
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute right-6 top-8 font-sans text-[10px] tracking-[0.4em] text-gold/60 md:right-16">
        TC 00:{C.DATE_STAMP.replace(" · ", ":")}:24 · REEL 01
      </div>
      <h1 className="relative flex flex-col font-display leading-[0.85] text-foreground">
        {started &&
          [letters.slice(0, preLen), letters.slice(preLen)].map((grp, gi) => (
          <span key={gi} className="whitespace-nowrap">{grp.map((ch, j) => { const i = gi ? preLen + j : j; return (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(14px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 1.2 + i * 0.07, duration: 1.2, ease }}
              className={
                i < preLen
                  ? "inline-block text-[11vw] italic text-gold md:text-[6vw]"
                  : "inline-block text-[24vw] font-semibold text-cherry-bright glow-text md:text-[15vw]"
              }
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ); })}</span>
          ))}
      </h1>
      {started && (
        <motion.p
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          transition={{ delay: 3.4, duration: 2.6, ease }}
          className="urdu relative -mt-2 self-end text-5xl text-gold glow-gold md:mr-[8vw] md:text-7xl"
        >
          {C.hero.urdu}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ delay: 5.5, duration: 1.4 }}
        className="relative mt-10 flex max-w-sm items-end gap-6"
      >
        <span className="border border-gold/40 whitespace-nowrap px-3 py-1 font-sans text-xs tracking-[0.35em] text-gold">
          {C.DATE_STAMP}
        </span>
        <p className="font-sans text-xs leading-relaxed text-muted-foreground">{C.hero.tagline}</p>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 0.6 : 0, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 6.5 }, y: { duration: 2.4, repeat: Infinity } }}
        className="absolute bottom-8 left-6 font-hand text-xl text-gold md:left-16"
      >
        ↓ {C.hero.scrollHint}
      </motion.span>
    </section>
  );
}

/* ---------------- 2. SHAYARI ---------------- */
export function Shayari() {
  return (
    <>
      {C.shayari.map((s, i) => (
        <Couplet key={i} s={s} i={i} />
      ))}
    </>
  );
}

function Couplet({ s, i }: { s: (typeof C.shayari)[number]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: true });
  const left = i % 2 === 0;
  const line = (d: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { delay: d, duration: 1.3, ease },
  });
  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 md:px-16">
      <span
        aria-hidden
        className="urdu pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[38vw] text-gold/[0.035] md:text-[22vw]"
      >
        {(s.urdu[0] ?? "").split(" ").slice(0, 2).join(" ")}
      </span>
      <div className={`relative flex w-full max-w-3xl flex-col gap-2 ${left ? "" : "ml-auto items-end text-right"}`}>
        <motion.span {...line(0)} className="font-sans text-[10px] tracking-[0.5em] text-cherry-bright">
          SHER · {String(i + 1).padStart(2, "0")}
        </motion.span>
        {s.urdu.map((u, k) => (
          <motion.p key={k} {...line(0.3 + k * 0.5)} className="urdu candle-flicker text-3xl text-gold md:text-5xl">
            {u}
          </motion.p>
        ))}
        <div className="mt-4 space-y-1">
          {s.roman.map((r, k) => (
            <motion.p key={k} {...line(1.3 + k * 0.5)} className="font-display text-2xl italic leading-snug text-foreground md:text-4xl">
              {r}
            </motion.p>
          ))}
        </div>
        <motion.p {...line(2.4)} className="mt-4 max-w-md font-sans text-xs leading-relaxed text-gold/60">
          {s.english}
        </motion.p>
        {s.credit && (
          <motion.p {...line(2.6)} className="font-sans text-[10px] tracking-[0.3em] text-muted-foreground/70">
            {s.credit}
          </motion.p>
        )}
        {s.note && (
          <motion.p
            initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
            animate={inView ? { opacity: 1, rotate: -4, scale: 1 } : {}}
            transition={{ delay: 3.1, duration: 1, ease }}
            className="mt-6 font-hand text-2xl text-cherry-bright md:text-3xl"
          >
            ↳ {s.note}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ---------------- 3. REASONS (credits) ---------------- */
export function Reasons() {
  return (
    <section className="relative px-6 py-32 md:px-16">
      <div className="mb-24 flex items-baseline gap-6">
        <h2 className="font-display text-6xl italic text-gold md:text-8xl">{C.reasonsTitle.roman}</h2>
        <span className="urdu text-3xl text-cherry-bright md:text-5xl">{C.reasonsTitle.urdu}</span>
      </div>
      <p className="mb-24 font-sans text-[10px] tracking-[0.5em] text-muted-foreground">
        {C.reasonsTitle.english.toUpperCase()} · IN ORDER OF APPEARANCE
      </p>
      <div className="flex flex-col gap-[28vh]">
        {C.reasons.map((r, i) => (
          <Reason key={i} r={r} i={i} last={i === C.reasons.length - 1} />
        ))}
      </div>
    </section>
  );
}

function Reason({ r, i, last }: { r: (typeof C.reasons)[number]; i: number; last: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const uy = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const op = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <div ref={ref} className={`relative ${i % 2 ? "md:ml-[18vw]" : ""}`}>
      <motion.span style={{ y: uy }} className="urdu absolute -top-16 right-0 text-6xl text-cherry/30 md:text-8xl">
        {r.urduWord}
      </motion.span>
      <motion.p
        style={{ y, opacity: op }}
        className={`relative max-w-4xl font-display leading-[1.05] ${
          last ? "text-5xl font-semibold text-cherry-bright glow-text md:text-8xl" : "text-4xl text-foreground md:text-7xl"
        }`}
      >
        <span className="mr-3 align-top font-sans text-xs text-gold/50">{String(i + 1).padStart(2, "0")}</span>
        {r.text}
      </motion.p>
    </div>
  );
}

/* ---------------- 4. FILM STRIP ---------------- */
export function FilmStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-78%"]);
  const [active, setActive] = useState<number | null>(null);
  return (
    <section ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <h2 className="mb-10 px-6 font-display text-4xl italic text-gold md:px-16 md:text-6xl">{C.filmTitle}</h2>
        <motion.div style={{ x }} className="flex w-max -rotate-2 flex-col bg-night py-3 shadow-2xl">
          <div className="sprockets h-4 w-full bg-gold/25" />
          <div className="flex gap-4 px-4 py-4">
            {C.frames.map((f, i) => (
              <button
                key={i}
                onClick={() => setActive(active === i ? null : i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`relative flex h-[52svh] w-[72vw] flex-col justify-between overflow-hidden bg-velvet p-6 text-left transition-shadow duration-700 md:w-[34vw] ${
                  active === i ? "glow-box" : ""
                }`}
              >
                <span className="font-sans text-[10px] tracking-[0.4em] text-gold/60">{f.label}</span>
                <span
                  className={`font-display text-[30vw] leading-none transition-colors duration-700 md:text-[14vw] ${
                    active === i ? "text-cherry-bright glow-text" : "text-cherry/50"
                  }`}
                >
                  {f.numeral}
                </span>
                <span className="font-hand text-2xl leading-tight text-gold md:text-3xl">{f.caption}</span>
                <span className="vignette pointer-events-none absolute inset-0" />
              </button>
            ))}
          </div>
          <div className="sprockets h-4 w-full bg-gold/25" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- 5. CANDLE ---------------- */
export function Candle() {
  const [out, setOut] = useState(false);
  const hold = useRef<number | null>(null);
  const blow = () => {
    if (out) return;
    setOut(true);
    setTimeout(() => burst("confetti"), 500);
  };
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24">
      <p className="mb-8 font-hand text-2xl text-gold/80">{out ? "\u00A0" : C.candle.prompt}</p>
      <button
        aria-label="Blow out the candle"
        onClick={blow}
        onPointerDown={() => (hold.current = window.setTimeout(blow, 600))}
        onPointerUp={() => hold.current && clearTimeout(hold.current)}
        onPointerLeave={() => hold.current && clearTimeout(hold.current)}
        className="relative"
      >
        <svg viewBox="0 0 200 260" className="h-[52svh] max-h-[460px] w-auto">
          <defs>
            <radialGradient id="halo">
              <stop offset="0%" stopColor="#E8C7A0" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#D4163C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D4163C" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cake" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#2B070D" />
              <stop offset="1" stopColor="#1A0509" />
            </linearGradient>
          </defs>
          <motion.circle cx="100" cy="70" r="80" fill="url(#halo)" animate={{ opacity: out ? 0 : 1 }} transition={{ duration: 1.2 }} />
          {/* cake */}
          <rect x="30" y="170" width="140" height="70" rx="4" fill="url(#cake)" stroke="#E8C7A0" strokeOpacity="0.3" />
          <path d="M30 185 Q45 200 60 185 T90 185 T120 185 T150 185 T170 185" stroke="#B0122B" strokeWidth="6" fill="none" />
          <rect x="20" y="238" width="160" height="6" rx="3" fill="#E8C7A0" opacity="0.4" />
          {/* candle */}
          <rect x="92" y="100" width="16" height="72" rx="2" fill="#E8C7A0" />
          <path d="M92 115 L108 107 M92 135 L108 127 M92 155 L108 147" stroke="#B0122B" strokeWidth="3" />
          <line x1="100" y1="100" x2="100" y2="90" stroke="#0D0305" strokeWidth="2" />
          <AnimatePresence>
            {!out && (
              <motion.g className="flame" exit={{ opacity: 0, scaleY: 0.2 }} transition={{ duration: 0.4 }}>
                <path d="M100 50 C 112 68, 110 86, 100 92 C 90 86, 88 68, 100 50 Z" fill="#D4163C" />
                <path d="M100 64 C 106 74, 105 85, 100 89 C 95 85, 94 74, 100 64 Z" fill="#E8C7A0" />
              </motion.g>
            )}
          </AnimatePresence>
          {out &&
            [0, 1, 2].map((k) => (
              <motion.path
                key={k}
                d={`M100 90 C ${90 + k * 8} 70, ${112 - k * 6} 55, ${96 + k * 4} 30 S ${104 - k * 6} 5, ${100 + k * 3} -10`}
                stroke="#E8C7A0"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.7 }}
                animate={{ pathLength: 1, opacity: 0, y: -20 }}
                transition={{ duration: 2.6, delay: k * 0.25, ease: "easeOut" }}
              />
            ))}
        </svg>
      </button>
      <AnimatePresence>
        {out && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.4, ease }}
            className="mt-8 text-center"
          >
            <p className="font-display text-5xl italic text-cherry-bright glow-text md:text-7xl">{C.candle.after}</p>
            <p className="mt-2 font-sans text-xs tracking-[0.3em] text-gold/70">{C.candle.afterEnglish}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- 6. LETTER ---------------- */
export function Letter() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    fx.intensity = inView ? 2.6 : 1;
  }, [inView]);
  useEffect(() => {
    if (!open) return;
    const chars = Array.from(C.letter.body);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(chars.slice(0, i).join(""));
      if (i >= chars.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [open]);
  const done = typed.length >= C.letter.body.length;
  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24">
      <div className="relative w-full max-w-md [perspective:1200px]">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="env"
              onClick={() => setOpen(true)}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.9, ease }}
              className="relative block aspect-[3/2] w-full bg-velvet glow-box [transform-style:preserve-3d]"
            >
              <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                <path d="M0 0 L150 110 L300 0" fill="#1A0509" stroke="#E8C7A0" strokeOpacity="0.3" />
                <path d="M0 200 L120 95 M300 200 L180 95" stroke="#E8C7A0" strokeOpacity="0.15" />
              </svg>
              <span className="absolute left-1/2 top-[55%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cherry font-display text-2xl italic text-gold shadow-lg ring-4 ring-cherry/40">
                KP
              </span>
              <span className="absolute -bottom-12 left-0 right-0 text-center font-hand text-xl text-gold/80">
                {C.letter.envelopeHint}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease }}
              className="relative min-h-[60svh] bg-wine p-8 shadow-2xl ring-1 ring-gold/20"
            >
              <p className="whitespace-pre-line font-hand text-2xl leading-relaxed text-gold md:text-3xl">
                {typed}
                {!done && <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-cherry-bright align-middle" />}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease }}
            className="mt-16 text-center"
          >
            <p className="urdu text-4xl text-cherry-bright glow-text md:text-6xl">{C.letter.urduEnd}</p>
            <p className="font-sans text-xs tracking-[0.3em] text-gold/60">{C.letter.urduEndEnglish}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- 7. END CARD ---------------- */
export function EndCard() {
  const [taps, setTaps] = useState(0);
  const [egg, setEgg] = useState(false);
  const tap = () => {
    const n = taps + 1;
    setTaps(n);
    if (n >= 5) {
      burst("hearts");
      setEgg(true);
      setTaps(0);
    }
  };
  return (
    <section className="relative flex min-h-[80svh] flex-col justify-end px-6 pb-28 md:px-16">
      <button onClick={tap} className="self-start font-display text-[22vw] font-semibold leading-none text-cherry/40 transition-colors hover:text-cherry-bright md:text-[12vw]">
        {C.HIS_NAME}.
      </button>
      <p className="mt-2 font-sans text-[10px] tracking-[0.4em] text-muted-foreground/60">{C.endCard.tapHint}</p>
      <AnimatePresence>
        {egg && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 font-hand text-3xl text-gold"
          >
            {C.endCard.egg}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.6 }}
        className="mt-12 self-end font-sans text-xs text-gold/60"
      >
        {C.endCard.hint}
      </motion.p>
      <p className="mt-2 self-end font-display italic text-muted-foreground">{C.endCard.fin} — {C.HER_NAME}</p>
    </section>
  );
}
