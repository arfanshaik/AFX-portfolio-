import type { Metadata } from "next";
import { Header, MotionSystem } from "@/components/afx/chrome";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { siteUrl } from "@/data/site";
import "./globals.css";

const title = "Shaik Arfan — AI Developer, LLM Developer & UI/UX Designer";
const description = "Portfolio of Shaik Arfan — AI developer, LLM developer, UI/UX designer and frontend developer building intelligent digital products, AI systems and experimental interfaces.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title, description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", url: siteUrl, siteName: "AFX — Shaik Arfan", locale: "en_IN" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
const person = {
  "@context": "https://schema.org", "@type": "Person", name: profile.name,
  url: siteUrl, jobTitle: profile.roles.join(" / "),
  image: `${siteUrl}${profile.images.profile}`,
  sameAs: [socials.github, socials.linkedin].filter(Boolean),
  knowsAbout: ["Artificial Intelligence", "Large Language Models", "UI/UX Design", "Frontend Development"],
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body id="top"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /><Header />{children}<MotionSystem /></body></html>;
}
