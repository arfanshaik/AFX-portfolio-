"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ArrowDown, ArrowUpRight, ArrowUp, Plus, X } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { navigation, profile } from "@/data/profile";
import { socials } from "@/data/socials";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TransitionLink({ href, children, className, label }: { href: string; children: ReactNode; className?: string; label?: string }) {
  const router = useRouter();
  const go = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    const wipe = document.querySelector(".page-wipe");
    if (!wipe) { router.push(href); return; }
    gsap.set(wipe, { transformOrigin: "bottom", scaleY: 0 });
    gsap.to(wipe, { scaleY: 1, duration: 0.38, ease: "power3.inOut", onComplete: () => router.push(href) });
  };
  return <Link href={href} className={className} aria-label={label} onClick={go} data-cursor="VIEW">{children}</Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const pathname = usePathname();
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="AFX — home">AFX<span>.26</span><i /></Link>
      <div className="header-availability"><span className="status-dot" /> AVAILABLE FOR<br /><span>INTERNSHIPS · 2026</span></div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><button className="menu-button" aria-label="Open menu">MENU <Plus size={19} strokeWidth={1.5} /></button></DialogTrigger>
        <DialogContent className="afx-menu" showCloseButton={false}>
          <div className="menu-top"><span className="wordmark">AFX<span>.26</span><i /></span><DialogClose asChild><button className="menu-button" aria-label="Close menu">CLOSE <X size={20} /></button></DialogClose></div>
          <DialogTitle className="sr-only">Portfolio navigation</DialogTitle>
          <DialogDescription className="sr-only">Choose a chapter in Shaik Arfan&apos;s portfolio.</DialogDescription>
          <div className="menu-body">
            <nav aria-label="Main navigation">{navigation.map((item, i) => <a href={`${pathname === "/" ? "" : "/"}#${item.id}`} key={item.id} onClick={() => setOpen(false)} onMouseEnter={() => setPreview(i)} onFocus={() => setPreview(i)}><span className="mono">0{i}</span><span>{item.label}</span><ArrowUpRight /></a>)}</nav>
            <div className="menu-preview"><div className="menu-preview-image"><Image src={profile.images.portrait} alt="" fill sizes="30vw" /><span>{String(preview).padStart(2, "0")}</span></div><p className="mono">{navigation[preview].caption}</p><p className="menu-location">{profile.location}</p></div>
          </div>
          <div className="menu-bottom mono"><span>AI · DESIGN · CODE</span><span>BUILDING WHAT&apos;S NEXT.</span></div>
        </DialogContent>
      </Dialog>
    </header>
  </>;
}

export function Chapter({ number, title, note }: { number: string; title: string; note?: string }) {
  return <div className="chapter-line"><span><b>{number}</b> {title}</span>{note && <span>{note}</span>}</div>;
}

export function SocialLinks({ large = false }: { large?: boolean }) {
  const links = [
    ...(socials.email ? [{ label: "EMAIL ME", href: `mailto:${socials.email}`, external: false }] : []),
    ...(socials.linkedin ? [{ label: "LINKEDIN", href: socials.linkedin, external: true }] : []),
    { label: "GITHUB", href: socials.github, external: true },
  ];
  return <div className={large ? "social-links large" : "social-links"}>{links.map(link => <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} data-cursor="OPEN ↗">{link.label}<ArrowUpRight size={large ? 25 : 17} /></a>)}</div>;
}

export function Footer() {
  return <footer className="site-footer"><Link href="/#home" className="wordmark">AFX<span>.26</span><i /></Link><div className="mono">SHAIK ARFAN<br /><span>AI · DESIGN · CODE</span></div><span className="copyright mono">© 2026</span><a href="#top" className="back-top mono">BACK TO TOP <ArrowUp size={17} /></a></footer>;
}

export function ScrollPrompt() { return <a className="scroll-prompt mono" href="#manifesto">SCROLL TO EXPLORE <span><ArrowDown size={16} /></span></a>; }

export function MotionSystem() {
  const pathname = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".page-wipe", { scaleY: 0, transformOrigin: "top", duration: reduced.matches ? 0 : 0.5, ease: "power3.inOut" });
      if (!reduced.matches) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach(el => {
          gsap.fromTo(el, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });
      }
    });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    const lenis = reduced.matches ? null : new Lenis({ duration: 0.85, smoothWheel: true, syncTouch: false, anchors: { offset: -85 }, prevent: node => !!node.closest('[role="dialog"]') });
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (lenis) { lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(tick); }
    const onVisibility = () => { if (document.hidden) gsap.ticker.remove(tick); else if (lenis) gsap.ticker.add(tick); };
    document.addEventListener("visibilitychange", onVisibility);
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    return () => { ctx.revert(); observer.disconnect(); lenis?.destroy(); gsap.ticker.remove(tick); document.removeEventListener("visibilitychange", onVisibility); window.removeEventListener("scroll", scroll); };
  }, [pathname]);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    let x = -100, y = -100;
    const move = (event: PointerEvent) => {
      x = event.clientX; y = event.clientY;
      if (!frame) frame = requestAnimationFrame(() => { if (cursor.current) cursor.current.style.transform = `translate3d(${x}px,${y}px,0)`; frame = 0; });
      const target = (event.target as Element).closest<HTMLElement>("[data-cursor],a,button");
      if (cursor.current) cursor.current.dataset.active = target ? "true" : "false";
      if (cursorLabel.current) cursorLabel.current.textContent = target?.dataset.cursor ?? "";
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);
  return <><div className="read-progress" ref={progress} aria-hidden="true" /><div className="custom-cursor" ref={cursor} aria-hidden="true"><span ref={cursorLabel} /></div><div className="page-wipe" aria-hidden="true"><span>AFX.26</span></div></>;
}
