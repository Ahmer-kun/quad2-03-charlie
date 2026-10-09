import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import * as C from "@/content";
import { Atmosphere, CursorFx, Particles, ProgressLine } from "@/components/birthday/Effects";
import { Candle, EndCard, FilmStrip, Hero, Letter, Reasons, Shayari } from "@/components/birthday/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Shayan — from Kuchu Puchu" },
      { name: "description", content: "A love-letter film for Shayan's birthday, 12 October. Directed by Kuchu Puchu." },
      { property: "og:title", content: "Happy Birthday, Shayan" },
      { property: "og:description", content: "A love-letter film in seven reels, from Kuchu Puchu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MUTE_KEY = "shayan-bday-muted";

function Index() {
  const reduced = !!useReducedMotion();
  const [started, setStarted] = useState(false);
  const [curtainGone, setCurtainGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioOk, setAudioOk] = useState(true);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.style.overflow = started ? "" : "hidden";
  }, [started]);

  const fadeIn = (a: HTMLAudioElement) => {
    a.volume = 0;
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(0.8, v + 0.04);
      a.volume = v;
      if (v >= 0.8) clearInterval(id);
    }, 120);
  };

  const begin = () => {
    setStarted(true);
    setTimeout(() => setCurtainGone(true), 2200);
    const a = audio.current;
    if (!a || !audioOk) return;
    if (localStorage.getItem(MUTE_KEY) === "1") return;
    a.play().then(() => { setPlaying(true); fadeIn(a); }).catch(() => {});
  };

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      localStorage.setItem(MUTE_KEY, "1");
    } else {
      localStorage.setItem(MUTE_KEY, "0");
      a.play().then(() => { setPlaying(true); fadeIn(a); }).catch(() => {});
    }
  };

  return (
    <main className="grain relative min-h-screen">
      <audio ref={audio} src="/audio/katra-katra.mp3" loop preload="auto" onError={() => setAudioOk(false)} />
      <Atmosphere />
      <Particles reduced={reduced} />
      <CursorFx />
      <ProgressLine />

      <div className="relative z-20">
        <Hero started={started} />
        <Shayari />
        <Reasons />
        <FilmStrip />
        <Candle />
        <Letter />
        <EndCard />
      </div>

      {/* Curtain intro */}
      {!curtainGone && (
        <div className="fixed inset-0 z-[75]">
          <motion.div
            className="velvet absolute inset-y-0 left-0 w-1/2"
            animate={started ? { x: "-100%" } : {}}
            transition={{ duration: 2, ease: [0.7, 0, 0.2, 1] }}
          />
          <motion.div
            className="velvet absolute inset-y-0 right-0 w-1/2"
            animate={started ? { x: "100%" } : {}}
            transition={{ duration: 2, ease: [0.7, 0, 0.2, 1] }}
          />
          <AnimatePresence>
            {!started && (
              <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-night px-8 text-center"
              >
                <span className="pulse-dot h-3 w-3 rounded-full bg-cherry-bright glow-box" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.4 }}
                  className="mt-10 font-sans text-[10px] tracking-[0.5em] text-gold/50"
                >
                  {C.intro.presents.toUpperCase()}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 1.4, duration: 1.6 }}
                  className="mt-4 max-w-md font-display text-3xl italic text-foreground md:text-5xl"
                >
                  {C.intro.line}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1.2 }}
                  onClick={begin}
                  className="mt-14 border-b border-cherry-bright pb-1 font-sans text-xs tracking-[0.4em] text-gold transition-colors hover:text-cherry-bright"
                >
                  {C.intro.button.toUpperCase()}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Mini vinyl player */}
      {started && audioOk && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={toggle}
          aria-label={playing ? "Pause song" : "Play song"}
          className="fixed bottom-5 right-5 z-[66] flex items-center gap-3"
        >
          <span className="hidden font-hand text-lg text-gold/70 md:inline">{C.song.title}</span>
          <span
            className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-night ring-1 ring-gold/30 ${playing ? "spin-slow glow-box" : ""}`}
            style={{ backgroundImage: "repeating-radial-gradient(circle, transparent 0 3px, oklch(0.85 0.06 70 / 8%) 3px 4px)" }}
          >
            <span className="h-4 w-4 rounded-full bg-cherry-bright" />
            <span className="absolute h-1 w-1 rounded-full bg-night" />
          </span>
        </motion.button>
      )}
    </main>
  );
}