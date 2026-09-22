"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { profile } from "@/data/profile";
import { gsap } from "gsap";
import Image from "next/image";
import { KatanaArtwork } from "./katana-artwork";

export function Entry({ onEnter, onSlash }: { onEnter: () => void; onSlash: () => void }) {
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [readyProgress, setReadyProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const counter = useRef({ value: 0 });
  const panel = useRef<HTMLDivElement>(null);
  const entered = useRef(false);
  useEffect(() => {
    let cancelled = false;
    let completed = 0;
    // Readiness follows real assets; the displayed count eases into each update.
    const photo = new window.Image();
    photo.src = profile.images.hero;
    const loaded = photo.decode().catch(() => { if (!cancelled) setFailed(true); });
    const artwork = ["/images/samurai/katana.webp", "/images/samurai/warrior.webp", "/images/samurai/scabbard.webp"].map(src => { const image = new window.Image(); image.src = src; return image.decode(); });
    const tasks = [loaded, ...artwork, document.fonts.load('700 20px "Space Grotesk Variable"'), document.fonts.load('400 12px "IBM Plex Mono"')];
    const finishTask = () => { completed++; if (!cancelled) setReadyProgress(Math.round(completed / tasks.length * 100)); };
    for (const task of tasks) task.then(finishTask, finishTask);
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    if (!open || readyProgress <= counter.current.value) return;
    const tween = gsap.to(counter.current, {
      value: readyProgress,
      duration: (readyProgress - counter.current.value) / 100 * 1.8,
      ease: "none",
      overwrite: true,
      onUpdate: () => setProgress(Math.floor(counter.current.value)),
      onComplete: () => setProgress(readyProgress),
    });
    return () => { tween.kill(); };
  }, [readyProgress, open]);
  const enter = () => {
    if (entered.current || progress < 100) return;
    entered.current = true;
    onSlash();
    const done = () => { setOpen(false); onEnter(); };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) done();
    else gsap.to(panel.current, { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", delay: 0.48, duration: 0.75, ease: "power4.inOut", onComplete: done });
  };
  const status = progress === 100 ? failed ? "PORTRAIT UNAVAILABLE · EXPERIENCE READY" : "ALL SYSTEMS READY" : progress < 34 ? "LOADING IDENTITY" : progress < 67 ? "ASSEMBLING INTERFACE" : "CONNECTING INTELLIGENCE";
  return <Dialog open={open} onOpenChange={value => { if (!value) enter(); }}>
    <DialogContent ref={panel} className="entry-panel" showCloseButton={false} onOpenAutoFocus={e => e.preventDefault()} onCloseAutoFocus={e => e.preventDefault()} onEscapeKeyDown={e => { e.preventDefault(); enter(); }} onPointerDownOutside={e => e.preventDefault()}>
      <div className="entry-samurai" aria-hidden="true"><Image src="/images/samurai/warrior.webp" alt="" fill priority sizes="(max-width: 700px) 110vw, 75vw" /></div>
      <div className="entry-katana" aria-hidden="true"><KatanaArtwork /></div>
      <div className="entry-top mono"><span><b>00</b> / ENTERING</span><span>BUILD · AFX.26<br />SHAIK ARFAN / 2026</span></div>
      <div className="entry-center"><span className="entry-way mono">FOCUS / PRECISION / DISCIPLINE</span><DialogTitle className="entry-mark">AFX</DialogTitle><DialogDescription className="mono">THE WAY OF THE BUILDER.</DialogDescription></div>
      <div className="entry-bottom"><div className="entry-count" role="progressbar" aria-label="Loading AFX" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>{String(progress).padStart(3, "0")}<span>%</span><p className="mono">{status}</p></div><button className="enter-button" onClick={enter} disabled={progress < 100}>ENTER AFX <ArrowUpRight size={30} /><span className="mono">CODE. INTELLIGENCE. EXPERIENCE.</span></button></div>
    </DialogContent>
  </Dialog>;
}
