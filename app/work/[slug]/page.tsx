import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Chapter, Footer, TransitionLink } from "@/components/afx/chrome";
import { ProjectCover } from "@/components/afx/project-cover";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} — Shaik Arfan`, description: project.description, alternates: { canonical: `/work/${slug}` }, openGraph: { title: `${project.title} — AFX`, description: project.description, url: `/work/${slug}`, images: [] }, twitter: { card: "summary", title: `${project.title} — AFX`, description: project.description, images: [] } };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index], next = projects[(index + 1) % projects.length];
  return <main className="project-page" id="main-content"><section className="section case-hero"><Link href="/#work" className="case-back mono"><ArrowLeft size={16} /> ALL WORK</Link><Chapter number={String(index + 1).padStart(2,"0")} title="PROJECT NOTES" note={`${project.year} / ${project.status.toUpperCase()}`} /><h1>{project.title}<span className="red">.</span></h1><div className="case-intro"><p>{project.description}</p><dl><div><dt>ROLE / FOCUS</dt><dd>{project.role}</dd></div><div><dt>TECHNOLOGY / DISCIPLINE</dt><dd>{project.tags.join(" · ")}</dd></div><div><dt>YEAR</dt><dd>{project.year}</dd></div></dl></div><div className="case-cover"><ProjectCover project={project} variant="detail" /></div></section>
    <section className="section case-story"><Chapter number="01" title="OVERVIEW" note="THE THINKING BEHIND THE PROJECT" /><div className="case-story-grid"><h2>FROM A<br />QUESTION<br /><span className="outline">TO A DIRECTION.</span></h2><div>{[{ label: "THE PROBLEM", text: project.problem },{ label: "THE APPROACH", text: project.approach },{ label: "THE SOLUTION", text: project.solution }].map(part => <article key={part.label} data-reveal><h3 className="mono red">{part.label}</h3><p>{part.text}</p></article>)}</div></div></section>
    <section className="section case-gallery"><Chapter number="02" title={project.gallery.length ? "PROJECT GALLERY" : "INTERFACE DIRECTION"} note={project.gallery.length ? "A CLOSER LOOK" : "CONCEPT STUDY / NOT A PRODUCT SCREENSHOT"} />{project.gallery.length ? <div className="gallery-grid">{project.gallery.map((src, i) => <Image key={src} src={src} alt={`${project.title}, screen ${i + 1}`} width={1440} height={900} sizes="(max-width: 768px) 100vw, 80vw" />)}</div> : <div className="case-direction"><span className="case-direction-mark" aria-hidden="true">{String(index + 1).padStart(2,"0")}</span><div><span className="mono red">{project.tags[0].toUpperCase()} / {project.year}</span><h3>{project.shortTitle}</h3><p>{project.solution}</p><div className="direction-tags mono">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></div>}</section>
    <section className="section case-result"><Chapter number="03" title="WHERE IT STANDS" /><div><h2>BUILDING.<br /><span className="red">LEARNING.</span><br />MOVING FORWARD.</h2><div><p>{project.result}</p>{project.github ? <a className="cta-link" href={project.github} target="_blank" rel="noopener noreferrer">EXPLORE THE SOURCE <ArrowUpRight /></a> : <Link className="cta-link" href="/#contact">TALK ABOUT THIS PROJECT <ArrowUpRight /></Link>}</div></div></section>
    <section className="section next-project"><span className="mono">NEXT PROJECT / {String((index + 1) % projects.length + 1).padStart(2,"0")}</span><TransitionLink href={`/work/${next.slug}`}><h2>{next.title}</h2><ArrowRight size={60} strokeWidth={1} /></TransitionLink></section><Footer /></main>;
}
