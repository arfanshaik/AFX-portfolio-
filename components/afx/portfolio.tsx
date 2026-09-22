"use client";

import { useCallback, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Plus, Sword } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { profile } from "@/data/profile";
import { skills, processStages } from "@/data/skills";
import { projects } from "@/data/projects";
import { Chapter, Footer, ScrollPrompt, SocialLinks, TransitionLink } from "./chrome";
import { Entry } from "./entry";
import { SamuraiPresence, SwordSlash, ScrollKatana, SamuraiDuelBackdrop, ProjectSwordTransition } from "./samurai";
import { NeuralCore } from "./neural-core";
import { ProjectCover } from "./project-cover";

function Hero({ onSlash }: { onSlash: () => void }) {
  const portrait = useRef<HTMLDivElement>(null);
  const [samurai, setSamurai] = useState(false);
  const reveal = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const position = (e.clientX - box.left) / box.width;
    if (position > 0.55) setSamurai(true);
    else if (position < 0.45) setSamurai(false);
  };
  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = e.currentTarget.getBoundingClientRect();
    portrait.current?.style.setProperty("--px", `${(e.clientX - box.left - box.width / 2) / box.width * 15}px`);
    portrait.current?.style.setProperty("--py", `${(e.clientY - box.top - box.height / 2) / box.height * 12}px`);
  };
  return <section className="hero" id="home" onPointerMove={move} aria-labelledby="hero-name">
    <div className="hero-grid" data-parallax aria-hidden="true" /><div className="hero-red-sun" aria-hidden="true" />
    <div className="hero-topline mono"><span>INDEPENDENT DEVELOPER & DESIGNER</span><span>INDIA / WORLDWIDE</span></div>
    <div className="hero-photo" ref={portrait} data-cursor="SWITCH" data-samurai={samurai} onPointerMove={reveal} onPointerLeave={() => setSamurai(false)}>
      <div className="hero-photo-inner"><div className="hero-photo-scroll" data-parallax>
        <Image src={profile.images.hero} alt="Black and white portrait of Shaik Arfan in a black T-shirt" fill priority sizes="(max-width: 700px) 85vw, 50vw" className="hero-image" />
        <div className="hero-samurai-layer" aria-hidden="true"><Image src="/images/samurai/warrior.webp" alt="" fill priority sizes="(max-width: 700px) 85vw, 50vw" className="hero-samurai-image" /></div>
      </div><div className="hero-photo-shade" /></div>
      <button className="hero-photo-toggle" aria-label={samurai ? "Show Arfan portrait" : "Show samurai portrait"} aria-pressed={samurai} onClick={() => setSamurai(value => !value)} onKeyDown={e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); setSamurai(e.key === "ArrowRight"); } }}><span className="sr-only">Move right for samurai, left for Arfan. Tap to switch.</span></button>
      <span className="photo-index mono">SUBJECT / 01<br />ARFAN · AFX.26</span><i className="photo-cross cross-one" /><i className="photo-cross cross-two" />
    </div>
    <button className="sword-replay mono" onClick={onSlash}><Sword size={18} strokeWidth={1.4} /> REPLAY SWORD</button><h1 id="hero-name" className="hero-name"><span>SHAIK</span><span>ARFAN<i>.</i></span></h1>
    <div className="hero-side-label mono"><span>AI SYSTEMS</span><span>INTERFACE DESIGN</span><span>CREATIVE TECHNOLOGY</span></div>
    <div className="hero-bottom"><div className="hero-intro"><span className="mono red">CODE. INTELLIGENCE. EXPERIENCE.</span><p>I build intelligence<br />you can interact with.</p></div><div className="hero-roles mono">{profile.roles.map(role => <span key={role}>{role}</span>)}</div><ScrollPrompt /></div>
    <span className="hero-edition mono">SELECTED PORTFOLIO — 2026</span>
  </section>;
}

function Marquee() {
  return <div className="marquees" aria-hidden="true">{["BUILD INTELLIGENCE · DESIGN EXPERIENCE · SHIP IDEAS · ", "AFX · CODE · DESIGN · AUTOMATE · CREATE · "].map((text, i) => <div className={`marquee ${i ? "reverse" : ""}`} key={text}><div>{[0,1,2,3].map(n => <span key={n}>{text}</span>)}</div></div>)}</div>;
}

function Portrait() {
  const [revealed, setRevealed] = useState(false);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  };
  return <div className={`portrait-reveal ${revealed ? "revealed" : ""}`} onPointerMove={move} data-cursor="EXPLORE"><Image src={profile.images.portrait} alt="Shaik Arfan wearing a helmet on his Royal Enfield motorcycle" fill sizes="(max-width: 700px) 90vw, 45vw" className="portrait-base" /><div className="portrait-light" aria-hidden="true"><Image src={profile.images.portrait} alt="" fill sizes="(max-width: 700px) 90vw, 45vw" /></div><span className="portrait-caption mono">ARFAN / AFX.26</span><button className="portrait-reveal-button mono" aria-pressed={revealed} onClick={() => setRevealed(!revealed)}><Plus size={17} />{revealed ? "DIM PORTRAIT" : "REVEAL PORTRAIT"}</button></div>;
}

function System() {
  return <section id="system" className="section system-section">
    <Chapter number="03" title="SYSTEM" note="A CONNECTED TOOLKIT" />
    <h2 className="section-heading" data-reveal>WHAT I<br /><span className="outline">BUILD WITH.</span></h2>
    <Tabs defaultValue={skills[0].code} className="skills-tabs">
      <TabsList className="skills-list" aria-label="Skill disciplines">{skills.map(skill => <TabsTrigger key={skill.code} value={skill.code} className="skill-trigger"><span className="mono">{skill.code}</span>{skill.name}<ArrowUpRight /></TabsTrigger>)}</TabsList>
      {skills.map(skill => <TabsContent value={skill.code} key={skill.code} className="skill-content"><div><span className="mono red">DISCIPLINE / {skill.code}</span><h3>{skill.headline}</h3><p>{skill.description}</p></div><ul className="skill-cloud">{skill.items.map((item, i) => <li key={item} style={{ "--delay": `${i * 35}ms` } as CSSProperties}>{item}</li>)}</ul></TabsContent>)}
    </Tabs>
  </section>;
}

function Process() {
  const [active, setActive] = useState(0);
  return <section className="section process-section" id="process"><Chapter number="04" title="PROCESS" note="HOW AN IDEA BECOMES REAL" /><div className="process-layout"><div className="process-intro"><h2 data-reveal>THINK.<br />MAKE.<br /><span className="red">REPEAT.</span></h2><div className="process-number" aria-hidden="true">0{active + 1}</div></div><div className="process-stages">{processStages.map((stage, i) => <div className={`process-stage ${i === active ? "active" : ""}`} key={stage.name}><button aria-expanded={active === i} aria-controls={`process-${i}`} onClick={() => setActive(i)}><span className="mono">0{i + 1}</span><h3>{stage.name}</h3><Plus /></button><div id={`process-${i}`} className="process-answer" hidden={active !== i}><h4>{stage.text}</h4><p>{stage.detail}</p></div></div>)}</div></div></section>;
}

function Work() {
  return <section id="work" className="work-section"><div className="work-scene"><div className="section work-intro"><SamuraiDuelBackdrop /><Chapter number="05" title="SELECTED WORK" note="2026 / AN ONGOING COLLECTION" /><div className="work-heading"><h2 data-reveal>IDEAS,<br /><span className="outline">IN ACTION.</span></h2><p>AI experiments, useful tools<br />and interfaces with intention.<br /><span className="mono">{String(projects.length).padStart(2, "0")} SELECTED PROJECTS</span></p></div></div></div>
    {projects.map((project, i) => <article className="project" key={project.slug}><div className="project-top mono"><span>SELECTED WORK / {String(i + 1).padStart(2, "0")}</span><span>{project.year} · {project.status.toUpperCase()}</span></div><div className="project-composition"><TransitionLink href={`/work/${project.slug}`} className="project-media" label={`View ${project.title}`}><div data-parallax><ProjectCover project={project} /></div><span className="project-open"><ArrowUpRight size={24} /></span></TransitionLink><div className="project-info" data-reveal><span className="project-number">{String(i + 1).padStart(2, "0")}<span>/08</span></span><h3><TransitionLink href={`/work/${project.slug}`}>{project.title}</TransitionLink></h3><p>{project.description}</p><div className="project-tags mono">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><TransitionLink className="text-link" href={`/work/${project.slug}`}>VIEW PROJECT <ArrowUpRight size={18} /></TransitionLink>{project.github && <a className="text-link muted" href={project.github} target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={16} /></a>}</div></div></div><ProjectSwordTransition index={i} /></article>)}
  </section>;
}

function Journey() {
  const entries = [
    { date: "2026", title: "Started B.Tech", label: "NIAT / 2026 — 2030", description: "Learning the foundations of engineering while turning curiosity into practical projects." },
    { date: "2026", title: "Building AFX", label: "AI + DESIGN + DEVELOPMENT", description: "Bringing developer tools, AI ideas and digital experiences together under a personal creative identity." },
    { date: "NEXT", title: "The next chapter", label: "OPEN TO WHAT'S POSSIBLE", description: "Internships. Hackathons. Open source. Real products. Looking for people and problems that push me to grow." },
  ];
  const [active, setActive] = useState(0);
  return <section className="section journey-section" id="journey"><Chapter number="07" title="JOURNEY" note="JUST GETTING STARTED" /><h2 className="section-heading" data-reveal>EARLY DAYS.<br /><span className="outline">BIG INTENTIONS.</span></h2><Tabs value={String(active)} onValueChange={v => setActive(Number(v))} className="journey-tabs"><TabsList className="journey-list" aria-label="Journey milestones">{entries.map((entry, i) => <TabsTrigger className="journey-trigger" value={String(i)} key={entry.title}><span className="timeline-dot" /><span>{entry.date}</span><small>{entry.title}</small></TabsTrigger>)}</TabsList>{entries.map((entry, i) => <TabsContent value={String(i)} key={entry.title} className="journey-content"><span className="mono red">{entry.label}</span><h3>{entry.title}</h3><p>{entry.description}</p></TabsContent>)}</Tabs></section>;
}

export function Portfolio() {
  const [entered, setEntered] = useState(false);
  const onEnter = useCallback(() => setEntered(true), []);
  const [slash, setSlash] = useState(0);
  const onSlash = useCallback(() => setSlash(value => value + 1), []);
  return <><SwordSlash run={slash} /><Entry onEnter={onEnter} onSlash={onSlash} /><main id="main-content" className={`portfolio ${entered ? "is-entered" : "awaiting-entry"}`}>
    <ScrollKatana /><Hero onSlash={onSlash} /><Marquee />
    <section className="section manifesto" id="manifesto"><Chapter number="01" title="MANIFESTO" note="WHY I BUILD" /><div className="manifesto-layout"><SamuraiPresence /><div><h2 className="manifesto-statement" data-reveal>Technology becomes<br />powerful when<br /><span className="red">intelligence</span> and<br /><span className="outline">experience</span> feel<br />like one system.</h2><div className="manifesto-foot"><p>I build AI-powered applications, interfaces and tools that turn complex technology into products people can actually use.</p><span className="mono">SHAIK ARFAN<br />AI · DESIGN · CODE</span></div></div></div><div className="manifesto-line" data-reveal><span>I DON&apos;T WANT TO JUST USE AI.</span><strong>I WANT TO BUILD WITH IT.</strong></div></section>
    <section className="section about-section" id="about"><Chapter number="02" title="ABOUT" note="THE HUMAN BEHIND THE SYSTEM" /><div className="about-layout"><div className="about-portrait"><Portrait /><p className="mono portrait-note">CURIOUS BY NATURE. A BUILDER BY CHOICE.</p></div><div className="about-copy"><h2 data-reveal>STILL<br />LEARNING.<br /><span className="red">ALREADY<br />BUILDING.</span></h2><p>I&apos;m Shaik Arfan — an AI developer, LLM developer, UI/UX designer and frontend developer studying B.Tech at NIAT.</p><p>I enjoy turning ideas into working digital products by combining AI systems with thoughtful interfaces. From AI agents and RAG systems to developer tools and experimental web experiences, I learn by building.</p><dl className="about-facts"><div><dt>LOCATION</dt><dd>{profile.location}</dd></div><div><dt>EDUCATION</dt><dd>B.Tech · NIAT</dd></div><div><dt>TIMELINE</dt><dd>2026 — 2030</dd></div><div><dt>FOCUS</dt><dd>AI · LLMs · UI/UX · Frontend</dd></div><div className="wide"><dt>STATUS</dt><dd><span className="status-dot" /> {profile.status}</dd></div></dl></div></div></section>
    <System /><Process /><Work />
    <section className="section build-log" id="build-log"><Chapter number="06" title="BUILD LOG" note="A SNAPSHOT, NOT A FINISH LINE" /><div className="metrics">{[{ n: String(projects.length).padStart(2,"0"), label: "FEATURED PROJECTS" },{ n: String(profile.roles.length).padStart(2,"0"), label: "CORE DISCIPLINES" },{ n: "2026", label: "THIS CHAPTER" },{ n: "∞", label: "IDEAS IN QUEUE" }].map(metric => <div data-reveal key={metric.label}><strong>{metric.n}</strong><span className="mono">{metric.label}</span></div>)}</div></section>
    <Journey />
    <section className="section philosophy"><div className="philosophy-text"><span className="mono red">THE IDEA THAT CONNECTS IT ALL</span><h2 data-reveal>THE BEST<br />TECHNOLOGY<br /><span className="outline">DISAPPEARS</span><br />INTO THE<br /><span className="red">EXPERIENCE.</span></h2><p>That&apos;s the kind of product I want to build.</p></div><div className="core-panel"><div className="core-label mono"><span>EXPERIMENT / 001</span><span>NEURAL CORE</span></div><NeuralCore /><p className="mono core-help">SEVEN DISCIPLINES. ONE PRODUCT BUILDER.<br />SELECT A NODE TO EXPLORE.</p></div></section>
    <section className="section contact-section" id="contact"><Chapter number="08" title="CONTACT" note="GOOD THINGS START WITH A CONVERSATION" /><div className="contact-title"><h2 data-reveal>LET&apos;S<br /><span className="red">BUILD</span><br />SOMETHING.</h2><ArrowUpRight className="contact-arrow" strokeWidth={0.8} aria-hidden="true" /></div><div className="contact-bottom"><p>Have an internship, collaboration, hackathon,<br />project or idea worth building?<br /><strong>Let&apos;s talk.</strong></p><SocialLinks large /></div><div className="contact-status mono"><span className="status-dot" /> AVAILABLE FOR INTERNSHIPS · COLLABORATIONS · PROJECTS <ArrowRight size={17} /></div></section>
    <Footer />
  </main><noscript><style>{".portfolio.awaiting-entry{visibility:visible!important}.entry-panel{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript></>;
}
