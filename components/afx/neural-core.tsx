"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const disciplines = [
  { name: "AI", text: "Intelligence that makes complex tasks feel simple." },
  { name: "DESIGN", text: "Thoughtful decisions that turn a system into an experience." },
  { name: "CODE", text: "The connection between an idea and something that works." },
  { name: "LLM", text: "Language models connected to context and useful tools." },
  { name: "RAG", text: "Relevant knowledge brought into the conversation." },
  { name: "AGENTS", text: "Purposeful workflows that connect reasoning and action." },
  { name: "UX", text: "Less friction between a person and what they want to do." },
];

export function NeuralCore() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = canvas.current, wrap = stage.current;
    if (!el || !wrap) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, inView = false, phase = 0, mx = 0, my = 0;
    const resize = () => {
      width = wrap.clientWidth; height = wrap.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = width * dpr; el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced.matches) draw();
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const r = Math.min(width, height) * 0.35;
      const points: { x: number; y: number; z: number }[] = [];
      const rotation = phase + mx * 0.12;
      for (let i = 0; i < 100; i++) {
        const v = 1 - 2 * (i + 0.5) / 100;
        const t = Math.acos(v), p = i * 2.399963 + rotation;
        const x = Math.sin(t) * Math.cos(p), z = Math.sin(t) * Math.sin(p);
        points.push({ x: width / 2 + x * r, y: height / 2 + v * r * 0.85 + z * r * my * 0.1, z });
      }
      const threshold = r * (0.38 + Math.min(window.scrollY / 20000, 0.12));
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < threshold && Math.abs(p.z - q.z) < 0.55) {
            ctx.strokeStyle = `rgba(255,32,44,${(1 - d / threshold) * (p.z + 1.5) * 0.25})`;
            ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = p.z > 0 ? "#ff3944" : "#5d151b";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.z > 0 ? 1.8 : 1, 0, Math.PI * 2); ctx.fill();
      }
    };
    const loop = () => { phase += 0.0015; draw(); frame = requestAnimationFrame(loop); };
    const sync = () => { cancelAnimationFrame(frame); if (inView && !document.hidden && !reduced.matches) frame = requestAnimationFrame(loop); else draw(); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    observer.observe(wrap);
    const sizes = new ResizeObserver(resize); sizes.observe(wrap);
    const move = (event: PointerEvent) => { if (event.pointerType !== "mouse") return; const box = wrap.getBoundingClientRect(); mx = (event.clientX - box.left) / box.width - 0.5; my = (event.clientY - box.top) / box.height - 0.5; };
    wrap.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", sync); reduced.addEventListener("change", sync);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect(); wrap.removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync); };
  }, []);
  return <div className="neural-system">
    <div className="neural-stage" ref={stage}><canvas ref={canvas} aria-hidden="true" /><div className="neural-center" aria-hidden="true">AFX<span>NEURAL CORE</span></div>
      {disciplines.map((node, i) => { const angle = i / disciplines.length * Math.PI * 2 - Math.PI / 2; return <button key={node.name} className={`neural-node ${active === i ? "selected" : ""}`} style={{ "--nx": `${50 + Math.cos(angle) * 44}%`, "--ny": `${50 + Math.sin(angle) * 43}%` } as CSSProperties} aria-pressed={active === i} onClick={() => setActive(i)}>{node.name}</button>; })}
    </div>
    <p className="neural-description" aria-live="polite"><span className="mono">{disciplines[active].name} /</span> {disciplines[active].text}</p>
  </div>;
}
