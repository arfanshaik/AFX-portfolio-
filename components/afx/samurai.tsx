"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KatanaArtwork } from "./katana-artwork";

/** Match the mask to the guard in the 1024 × 1536 source artwork. */
function sheathMouth(rig: HTMLElement) {
  const imageHeight = Math.min(rig.clientHeight, rig.clientWidth * 1.5);
  return ((rig.clientHeight - imageHeight) / 2 + imageHeight * 0.6875) / rig.clientHeight * 100;
}

/** Decorative motion is driven directly by scroll, without React updates per frame. */
export function ScrollKatana() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scene.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const rig = scene.current!.querySelector<HTMLElement>(".katana-rig")!;
      const blade = scene.current!.querySelector<HTMLElement>(".katana-blade")!;
      const sheath = scene.current!.querySelector<HTMLElement>(".katana-scabbard")!;
      const smooth = (value: number) => { const n = Math.max(0, Math.min(1, value)); return n * n * (3 - 2 * n); };
      const render = () => {
        const distance = window.scrollY / window.innerHeight;
        const phase = distance % 7;
        const covered = phase < 5.3 ? smooth((phase - 0.65) / 1.4) : 1 - smooth((phase - 5.3) / 1.7);
        rig.style.transform = `translate3d(0,${Math.sin(distance * 0.6) * 22}px,0) rotate(${16 + distance * 23}deg) rotateY(${Math.sin(distance * 0.7) * 14}deg)`;
        // The case travels over the tip, while the blade moves into it. Its mouth
        // masks the inserted portion of the blade; the grip stays exposed.
        const imageHeight = Math.min(rig.clientHeight, rig.clientWidth * 1.5);
        const collarOffset = imageHeight / rig.clientHeight * 1.4;
        sheath.style.transform = `translate3d(0,${-78 + covered * (72 - collarOffset)}%,0)`;
        sheath.style.opacity = String(smooth(covered * 3));
        blade.style.transform = `translate3d(0,${-covered * 6}%,0)`;
        const throat = sheathMouth(rig);
        blade.style.clipPath = `inset(${Math.max(0, throat - 78 + covered * 78)}% 0 0 0)`;
        rig.style.opacity = String(0.66 - smooth(distance / 1.8) * 0.39);
        rig.style.setProperty("--steel-glint", `${(1 - covered) * 1500}px`);
        scene.current!.dataset.sheathed = String(Math.round(covered * 100));
      };
      render();
      const trigger = ScrollTrigger.create({ start: 0, end: "max", onUpdate: render, onRefresh: render });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, []);
  return <div ref={scene} className="cinematic-backdrop" aria-hidden="true">
    <div className="katana-rig">
      <div className="katana-blade"><KatanaArtwork /></div>
      <div className="katana-scabbard"><KatanaArtwork part="scabbard" /></div>
    </div>
  </div>;
}

export function ProjectSwordTransition({ index }: { index: number }) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const rig = el.querySelector<HTMLElement>(".project-sword-rig")!;
    const blade = el.querySelector<HTMLElement>(".project-sword-blade")!;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const smooth = (value: number) => { const n = Math.max(0, Math.min(1, value)); return n * n * (3 - 2 * n); };
      const playhead = { progress: 0 };
      const render = () => {
        const p = playhead.progress;
        const covered = p < 0.54 ? smooth((p - 0.08) / 0.34) : 1 - smooth((p - 0.54) / 0.36);
        const pull = 1 - covered;
        // Keep the case still relative to the rig and slide the steel through
        // its mouth. The inserted part of the blade is physically masked.
        blade.style.transform = `translate3d(0,${pull * 72 - 6}%,0)`;
        blade.style.clipPath = `inset(${Math.max(0, sheathMouth(rig) - pull * 72)}% 0 0 0)`;
        const tilt = 80 + p * 20;
        const travel = (pull * 0.36 - 0.073) * rig.clientHeight;
        const vertical = -rig.clientHeight / 2 - travel * Math.cos(tilt * Math.PI / 180);
        rig.style.transform = `translate3d(calc(-50% + ${travel}px),${vertical}px,0) rotate(${tilt}deg)`;
        rig.style.opacity = String(0.9 + Math.sin(p * Math.PI) * 0.1);
        rig.style.setProperty("--steel-glint", `${(1 - p) * 1800 - 100}px`);
        el.style.setProperty("--draw-strength", String(0.3 + Math.sin(p * Math.PI) * 0.7));
        el.dataset.sheathed = String(Math.round(covered * 100));
        el.dataset.swordPhase = p < 0.42 ? "sheathing" : p < 0.54 ? "sheathed" : "drawing";
      };
      render();
      const motion = gsap.to(playhead, {
        progress: 1, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.65, onRefresh: render },
        onUpdate: render,
      });
      return () => { motion.scrollTrigger?.kill(); motion.kill(); blade.removeAttribute("style"); rig.removeAttribute("style"); el.style.removeProperty("--draw-strength"); };
    });
    return () => media.revert();
  }, []);
  return <div ref={stage} className="project-sword-transition" data-project={index + 1} aria-hidden="true">
    <div className="project-sword-rig">
      <div className="project-sword-blade"><KatanaArtwork /></div>
      <div className="project-sword-case"><KatanaArtwork part="scabbard" /></div>
    </div>
  </div>;
}

export function SamuraiPresence() {
  const figure = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const sheet = el.querySelector<HTMLElement>(".kata-sheet")!;
    const nextSheet = el.querySelector<HTMLElement>(".kata-sheet-next")!;
    const kataWindow = el.querySelector<HTMLElement>(".kata-window")!;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const playhead = { progress: 0 };
      const motion = gsap.to(playhead, {
        progress: 1, ease: "none",
        scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 20%", scrub: 0.65 },
        onUpdate: () => {
          const position = playhead.progress * 15;
          const frame = Math.floor(position);
          const nextFrame = Math.min(15, frame + 1);
          const blend = position - frame;
          sheet.style.transform = `translate(${-(frame % 4) * 25}%,${-Math.floor(frame / 4) * 25}%)`;
          nextSheet.style.transform = `translate(${-(nextFrame % 4) * 25}%,${-Math.floor(nextFrame / 4) * 25}%)`;
          sheet.style.opacity = String(1 - blend);
          nextSheet.style.opacity = String(blend);
          kataWindow.style.transform = `translateY(${18 - playhead.progress * 36}px) scale(${0.94 + Math.sin(playhead.progress * Math.PI) * 0.08})`;
          el.dataset.pose = String(frame + 1);
        },
      });
      return () => { motion.scrollTrigger?.kill(); motion.kill(); sheet.removeAttribute("style"); nextSheet.removeAttribute("style"); kataWindow.style.removeProperty("transform"); };
    });
    return () => media.revert();
  }, []);
  return <figure ref={figure} className="samurai-presence" data-pose="1" aria-label="Scroll-controlled samurai sword practice">
    <div className="samurai-sun" aria-hidden="true" />
    <div className="kata-window"><Image className="kata-sheet" src="/images/samurai/kata.webp" alt="Armored samurai practicing drawing and returning a sword" width={1536} height={1536} sizes="(max-width: 700px) 300vw, 130vw" /><Image className="kata-sheet kata-sheet-next" src="/images/samurai/kata.webp" alt="" width={1536} height={1536} sizes="(max-width: 700px) 300vw, 130vw" /></div>
    <figcaption className="mono">FOCUS.<br />PRECISION.<br /><span>DISCIPLINE.</span></figcaption>
  </figure>;
}

export function SamuraiDuelBackdrop() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const shots = Array.from(el.querySelectorAll<HTMLElement>(".duel-shot"));
    const cameras = Array.from(el.querySelectorAll<HTMLElement>(".duel-shot-window"));
    const captions = Array.from(el.querySelectorAll<HTMLElement>(".cinema-caption span"));
    const markers = Array.from(el.querySelectorAll<HTMLElement>(".cinema-track i"));
    const blade = el.querySelector<HTMLElement>(".cinema-blade")!;
    const sparks = Array.from(el.querySelectorAll<HTMLElement>(".cinema-sparks i"));
    const cut = el.querySelector<HTMLElement>(".duel-scroll-slash")!;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const clamp = (n: number) => Math.max(0, Math.min(1, n));
      const smooth = (n: number) => n * n * (3 - 2 * n);
      // Dissolve between camera moves without revealing a rectangular canvas.
      const moves = [
        { scale: 1.24, zoom: -0.2, x: 2, pan: -4, y: 1 },
        { scale: 1.02, zoom: 0.15, x: -2, pan: 3, y: 2 },
        { scale: 1.18, zoom: -0.1, x: 3, pan: -5, y: -1 },
        { scale: 1.04, zoom: 0.14, x: -2, pan: 4, y: 1 },
        { scale: 1.14, zoom: -0.12, x: 1, pan: -1, y: -1 },
      ];
      const render = (progress: number) => {
        const phase = Math.min(shots.length - 0.001, progress * shots.length);
        const current = Math.floor(phase);
        const blend = current < shots.length - 1 ? smooth(clamp((phase - current - 0.6) / 0.4)) : 0;
        shots.forEach((shot, index) => {
          const incoming = index === current + 1 && blend > 0;
          shot.style.opacity = String(index === current ? 1 - blend : incoming ? blend : 0);
          const local = clamp(phase - index);
          const move = moves[index];
          cameras[index].style.transform = `scale(${move.scale + move.zoom * local}) translate3d(${move.x + move.pan * local}%,${move.y * (1 - local)}%,0)`;
          captions[index].style.opacity = index === current ? "1" : "0";
          markers[index].style.transform = `scaleX(${clamp(phase - index)})`;
        });
        const sweep = clamp((progress - 0.5) / 0.13);
        const strike = Math.sin(sweep * Math.PI);
        blade.style.opacity = String(strike * 0.9);
        blade.style.transform = `translate3d(${-95 + sweep * 205}%,${18 - sweep * 35}%,0) rotate(${-52 + sweep * 118}deg)`;
        cut.style.opacity = String(strike * 0.8);
        cut.style.transform = `rotate(-22deg) scaleX(${0.15 + sweep * 1.15})`;
        sparks.forEach((spark, index) => {
          const angle = (-160 + index * 43) * Math.PI / 180;
          const distance = sweep * (70 + index % 3 * 32);
          spark.style.opacity = String(strike * (1 - sweep) * 0.95);
          spark.style.transform = `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance}px) rotate(${angle}rad) scaleX(${0.3 + sweep})`;
        });
        el.dataset.scene = String(current + 1);
        el.dataset.cinemaProgress = progress.toFixed(3);
      };
      render(0);
      const playhead = { progress: 0 };
      const motion = gsap.to(playhead, {
        progress: 1, ease: "none",
        scrollTrigger: { trigger: el.closest(".work-scene"), start: "top top", end: "bottom bottom", scrub: 0.65 },
        onUpdate: () => render(playhead.progress),
      });
      return () => { motion.scrollTrigger?.kill(); motion.kill(); render(0); };
    });
    return () => media.revert();
  }, []);
  return <div ref={stage} className="duel-stage scroll-duel" data-scene="1" aria-hidden="true">
    <div className="duel-shot shot-portrait"><div className="duel-shot-window"><Image src="/images/samurai/warrior.webp" alt="" fill sizes="(max-width: 700px) 150vw, 90vw" /></div></div>
    {[0, 1, 2, 3].map(index => <div className={`duel-shot shot-${index}`} key={index}>
      <div className="duel-shot-window"><Image src="/images/samurai/duel-stills.webp" alt="" width={1536} height={1024} sizes="(max-width: 700px) 260vw, 160vw" /></div>
    </div>)}
    <div className="cinema-blade"><KatanaArtwork /></div>
    <span className="duel-scroll-slash" />
    <div className="cinema-sparks">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</div>
    <div className="cinema-caption mono">{["01 / STILLNESS", "02 / THE APPROACH", "03 / THE CLASH", "04 / THE STRIKE", "05 / AFTER THE STORM"].map(label => <span key={label}>{label}</span>)}</div>
    <div className="cinema-track">{shotsForTrack.map(i => <span key={i}><i /></span>)}</div>
  </div>;
}

const shotsForTrack = [0, 1, 2, 3, 4];

export function SwordSlash({ run }: { run: number }) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!run || !stage.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(stage.current, { autoAlpha: 1 });
      const sword = stage.current!.querySelector(".slash-katana");
      const trail = stage.current!.querySelector(".slash-trail");
      if (reduced) {
        gsap.set(sword, { opacity: 1, rotation: 25, xPercent: 0 });
        gsap.to(stage.current, { autoAlpha: 0, delay: 0.7, duration: 0 });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(sword, { opacity: 0, rotation: -65, xPercent: -115, yPercent: 10 }, { opacity: 1, rotation: -32, xPercent: -55, yPercent: 0, duration: 0.28, ease: "power2.out" })
        .to(sword, { rotation: 60, xPercent: 115, yPercent: -10, duration: 0.55, ease: "power3.inOut" })
        .fromTo(trail, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.36, ease: "power3.out" }, 0.36)
        .to(sword, { opacity: 0, duration: 0.22 }, 0.76)
        .to(trail, { opacity: 0, scaleY: 0, duration: 0.4 }, 0.72)
        .set(stage.current, { autoAlpha: 0 });
    }, stage);
    return () => ctx.revert();
  }, [run]);
  return <div ref={stage} className="sword-slash" aria-hidden="true">
    <div className="slash-trail" />
    <div className="slash-katana"><KatanaArtwork /></div>
  </div>;
}
