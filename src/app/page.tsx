"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

/* ------------------------------------------------------------------
   Content
   ------------------------------------------------------------------ */

const MARQUEE = [
  "BACKEND ARCHITECTURE",
  "✳",
  "API DESIGN",
  "✳",
  "AUTOMATION",
  "✳",
  "LLM EVALUATION",
  "✳",
];

type Project = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  linkLabel: string;
  youtubeId?: string;
  image?: string;
  placeholder?: string;
};

const PROJECTS: Project[] = [
  {
    index: "(01)",
    title: "SelfFit",
    description:
      "Site for an online fitness coaching practice aimed at busy tech leaders — positioning, structure and build, live at frankhidalgo.com.",
    tags: ["Live site", "Landing page"],
    href: "https://frankhidalgo.com/",
    linkLabel: "Visit frankhidalgo.com ↗",
    placeholder: "[ ADD SCREENSHOT → public/work/selffit.png ]",
  },
  {
    index: "(02)",
    title: "Freelance Navigator",
    description:
      "An interactive landing page and onboarding flow for tech professionals learning to sell themselves to online clients.",
    tags: ["Landing page", "Onboarding"],
    href: "https://www.youtube.com/watch?v=ObCZtbBXa7Y",
    linkLabel: "▶ Watch walkthrough",
    youtubeId: "ObCZtbBXa7Y",
  },
  {
    index: "(03)",
    title: "Nekotech",
    description:
      "Apple-inspired landing page built inside GoHighLevel, wired to the platform helping African graduates pursue a Master's in the US. I led the backend architecture behind it.",
    tags: ["Landing page", "Backend", "Flask · AWS"],
    href: "https://www.youtube.com/watch?v=btn290w6G2c",
    linkLabel: "▶ Watch walkthrough",
    youtubeId: "btn290w6G2c",
  },
];

const STATS = [
  { value: 8, suffix: "", label: "years shipping production software" },
  {
    value: 500,
    suffix: "+",
    label: "systems updated by one automation — 60 minutes down to 5",
  },
  {
    value: 56,
    suffix: "%",
    label: "less QA overhead after automating the test suite",
  },
];

const SERVICES = [
  {
    index: "(01)",
    title: "Backend & API architecture",
    description:
      "REST services, schema design and integrations built to stay reliable as they grow. Python, Flask, FastAPI, AWS.",
  },
  {
    index: "(02)",
    title: "Automation & CI/CD",
    description:
      "Pipelines, test automation and internal tooling that shorten release cycles and delete manual work.",
  },
  {
    index: "(03)",
    title: "LLM & agent evaluation",
    description:
      "Benchmarking harnesses and RAG pipelines that tell you whether the AI feature actually works.",
  },
  {
    index: "(04)",
    title: "Full-stack product work",
    description:
      "MVP through production — React and Next.js front ends on top of services that can carry them.",
  },
  {
    index: "(05)",
    title: "Code review & mentoring",
    description:
      "Reviews, pairing and practices that raise a team's baseline instead of one pull request.",
  },
];

const STACK_KEY = ["Python", "Flask", "FastAPI", "AWS", "TypeScript", "LLMs"];
const STACK = [
  "Python",
  "Flask",
  "FastAPI",
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Argo CD",
  "TypeScript",
  "Node.js",
  "React",
  "Next.js",
  "Angular",
  "Firebase",
  "Pytest",
  "Cypress",
  "LLMs",
  "RAG",
  "Ollama",
  "Helicone",
  "Git",
  "Linux",
];

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    let cleanup = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }, LenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      /* Smooth scroll — the thing that makes the rest feel expensive. */
      const Lenis = LenisMod.default;
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        /* --- hero: letters rise out of their mask, portrait settles --- */
        const letters = gsap.utils.toArray<HTMLElement>("[data-letter]");
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(letters, {
            yPercent: 115,
            duration: 1.5,
            stagger: 0.06,
          })
          .from(
            "[data-hero-portrait]",
            { scale: 1.08, opacity: 0, duration: 1.8 },
            0.2
          )
          .from(
            "[data-hero-fade]",
            { y: 24, opacity: 0, duration: 1.3, stagger: 0.12 },
            0.45
          );

        /* --- marquee: seamless loop, nudged by scroll velocity --- */
        const track = document.querySelector<HTMLElement>("[data-marquee]");
        if (track) {
          const half = track.scrollWidth / 2;
          const loop = gsap.to(track, {
            x: -half,
            duration: 22,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: (v) => `${parseFloat(v) % half}px`,
            },
          });
          ScrollTrigger.create({
            onUpdate: (self) => {
              const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 4);
              gsap.to(loop, {
                timeScale: self.direction === -1 ? -boost : boost,
                duration: 0.4,
                overwrite: true,
              });
            },
          });
        }

        /* --- section titles wipe up as they enter --- */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 88%" },
            y: 44,
            opacity: 0,
            duration: 1.3,
            ease: "expo.out",
          });
        });

        /* --- projects: copy in from the left, media drifts up past it --- */
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((el) => {
          gsap.from(el.querySelectorAll("[data-project-copy]"), {
            scrollTrigger: { trigger: el, start: "top 80%" },
            y: 36,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.09,
          });

          const media = el.querySelector("[data-project-media]");
          if (media) {
            gsap.from(media, {
              scrollTrigger: { trigger: media, start: "top 92%" },
              y: 70,
              opacity: 0,
              duration: 1.5,
              ease: "expo.out",
            });
            gsap.to(media, {
              scrollTrigger: {
                trigger: media,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
              yPercent: -6,
              ease: "none",
            });
          }
        });

        /* --- stats count up once --- */
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          const obj = { n: 0 };
          gsap.to(obj, {
            n: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.n)}${suffix}`;
            },
          });
        });

        /* --- service rows stagger in --- */
        gsap.utils.toArray<HTMLElement>("[data-service]").forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            x: -30,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: (i % 3) * 0.05,
          });
        });

        /* --- stack words light up one by one --- */
        gsap.from("[data-stack-word]", {
          scrollTrigger: { trigger: "[data-stack]", start: "top 85%" },
          opacity: 0,
          y: 12,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.025,
        });

        /* --- terminal types itself out --- */
        gsap.from("[data-term]", {
          scrollTrigger: { trigger: "[data-terminal]", start: "top 85%" },
          opacity: 0,
          duration: 0.01,
          stagger: 0.16,
        });
      }, root);

      cleanup = () => {
        ctx.revert();
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <div className={styles.page} ref={root}>
      {/* ---------- top bar ---------- */}
      <div className={styles.shell}>
        <div className={styles.topbar}>
          <span className={styles.topbarName}>Alberto Cambronero</span>
          <span className={styles.topbarMeta}>Est. 2018 — Costa Rica</span>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            Available
          </span>
        </div>
      </div>

      {/* ---------- hero ---------- */}
      <section className={`${styles.shell} ${styles.grid} ${styles.hero}`}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroName} aria-label="Beto">
            <span className={styles.heroNameMask} aria-hidden="true">
              {"BETO".split("").map((ch, i) => (
                <span key={i} data-letter style={{ display: "inline-block" }}>
                  {ch}
                </span>
              ))}
            </span>
          </h1>
          <p className={styles.heroLede} data-hero-fade>
            Senior software engineer building backend systems that hold up under
            load. Eight years of Python, Flask and AWS — from firmware
            automation at Intel to AI agent evaluation.
          </p>
          <div className={styles.heroCurrently} data-hero-fade>
            <span className={styles.eyebrow}>Currently</span>
            <span className={styles.heroRole}>
              AI Software Engineer, Eleva Labs
            </span>
            <a className={styles.heroMail} href="mailto:albcambro25@gmail.com">
              albcambro25@gmail.com →
            </a>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.portrait} data-hero-portrait>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.portraitImg}
              src="/beto-headshot.png"
              alt="Alberto Cambronero"
            />
          </div>
          <div className={styles.portraitCaption} data-hero-fade>
            <span className={styles.eyebrow}>Fig. 01 — The engineer</span>
          </div>
        </div>
      </section>

      {/* ---------- marquee ---------- */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack} data-marquee>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span className={styles.marqueeItem} key={i}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- work ---------- */}
      <section className={`${styles.shell} ${styles.work}`} id="work">
        <div className={`${styles.grid} ${styles.sectionHead}`}>
          <h2 className={styles.sectionTitle} data-reveal>
            SELECTED
            <br />
            WORK
          </h2>
          <span className={`${styles.sectionMeta} ${styles.eyebrow}`}>
            Three projects
            <br />
            2024 — 2026
          </span>
        </div>

        {PROJECTS.map((p) => (
          <article className={styles.project} key={p.title} data-project>
            <div className={`${styles.grid} ${styles.projectHead}`}>
              <span className={styles.projectIndex} data-project-copy>
                {p.index}
              </span>
              <h3 className={styles.projectTitle} data-project-copy>
                {p.title}
              </h3>
              <div className={styles.projectAside}>
                <p className={styles.projectDesc} data-project-copy>
                  {p.description}
                </p>
                <div className={styles.tags} data-project-copy>
                  {p.tags.map((t) => (
                    <span className={styles.tag} key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  className={styles.projectLink}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-project-copy
                >
                  <span>{p.linkLabel}</span>
                </a>
              </div>
            </div>

            <div className={styles.media} data-project-media>
              {p.youtubeId ? (
                <iframe
                  className={styles.mediaFrame}
                  src={`https://www.youtube.com/embed/${p.youtubeId}?modestbranding=1&rel=0`}
                  title={p.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : p.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img className={styles.mediaShot} src={p.image} alt={p.title} />
              ) : (
                <span className={styles.mediaPlaceholder}>{p.placeholder}</span>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* ---------- numbers ---------- */}
      <section className={`${styles.shell} ${styles.grid} ${styles.numbers}`}>
        <span className={`${styles.numbersLabel} ${styles.eyebrow}`}>
          (Index 03)
          <br />
          Numbers
        </span>
        <div className={styles.numbersGrid}>
          {STATS.map((s) => (
            <div className={styles.stat} key={s.label}>
              <span
                className={styles.statValue}
                data-count={s.value}
                data-suffix={s.suffix}
              >
                {s.value}
                {s.suffix}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section className={`${styles.shell} ${styles.grid} ${styles.about}`}>
        <div className={styles.aboutMedia}>
          <span className={styles.eyebrow}>(Index 04) — Who am I?</span>
          <div className={styles.aboutFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.aboutImg}
              src="/pictures_of_beto/betocoffee.png"
              alt="Alberto Cambronero"
            />
          </div>
        </div>
        <div className={styles.aboutText}>
          <h2 className={styles.aboutTitle} data-reveal>
            Creator first,
            <br />
            engineer second.
          </h2>
          <div className={styles.aboutBody}>
            <p>
              Stop-motion with Legos, hand-drawn sketches, edited videos, games
              built for the joy of it — I&rsquo;ve been making things since I
              was a kid.
            </p>
            <p>
              That turned into eight years of software: firmware automation at
              Intel, FastAPI services and CI/CD at First Factory, e-commerce at
              Wind River, backend architecture at Autonomi, KYC and user systems
              at GAP, and AI agent benchmarking at Eleva Labs.
            </p>
            <p className={styles.aboutExtra}>
              National swimming champion in Costa Rica, 2019. Same discipline,
              different pool.
            </p>
            <p className={styles.aboutExtra}>
              Motorcycles, watches, and projects that mean something. The goal
              is to build things that don&rsquo;t just work — they move people.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- services ---------- */}
      <section className={styles.services} id="services">
        <div className={styles.shell}>
          <h2
            className={styles.sectionTitle}
            data-reveal
            style={{ paddingBottom: "clamp(28px, 3.5vw, 56px)" }}
          >
            SERVICES
          </h2>
        </div>
        {SERVICES.map((s) => (
          <div
            className={`${styles.shell} ${styles.grid} ${styles.serviceRow}`}
            key={s.title}
            data-service
          >
            <span className={styles.serviceIndex}>{s.index}</span>
            <h3 className={styles.serviceTitle}>{s.title}</h3>
            <p className={styles.serviceDesc}>{s.description}</p>
          </div>
        ))}
      </section>

      {/* ---------- stack ---------- */}
      <section
        className={`${styles.shell} ${styles.grid} ${styles.stack}`}
        data-stack
      >
        <span className={`${styles.stackLabel} ${styles.eyebrow}`}>
          (Index 06)
          <br />
          Stack
        </span>
        <p className={styles.stackList}>
          {STACK.map((word, i) => (
            <span key={word} data-stack-word>
              <span
                className={
                  STACK_KEY.includes(word) ? styles.stackKey : undefined
                }
              >
                {word}
              </span>
              {i < STACK.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      {/* ---------- terminal ---------- */}
      <div className={`${styles.shell} ${styles.terminalWrap}`}>
        <div className={styles.terminal} data-terminal>
          <div className={styles.terminalBar}>
            <span className={styles.dot} style={{ background: "#FF5F57" }} />
            <span className={styles.dot} style={{ background: "#FEBC2E" }} />
            <span className={styles.dot} style={{ background: "#28C840" }} />
            <span className={styles.terminalTitle}>beto@macbook ~</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.termLine} data-term>
              <span className={styles.termPrompt}>$</span>whoami
            </div>
            <div className={styles.termOut} data-term>
              Alberto Cambronero — Senior Software Engineer
            </div>
            <div className={styles.termLine} data-term>
              <span className={styles.termPrompt}>$</span>uptime
            </div>
            <div className={styles.termOut} data-term>
              8 years, 6 companies, 0 unshipped projects
            </div>
            <div className={styles.termLine} data-term>
              <span className={styles.termPrompt}>$</span>echo $STATUS
            </div>
            <div
              className={`${styles.termOut} ${styles.termOutAccent}`}
              data-term
            >
              Available for work<span className={styles.caret}>▋</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <footer className={`${styles.shell} ${styles.footer}`} id="contact">
        <div className={`${styles.grid} ${styles.footerHead}`}>
          <h2 className={styles.footerTitle} data-reveal>
            LET&rsquo;S
            <br />
            WORK
          </h2>
          <p className={styles.footerNote}>
            Got something that needs to hold up in production? Let&rsquo;s talk.
          </p>
        </div>
        <a className={styles.mailLink} href="mailto:albcambro25@gmail.com">
          albcambro25@gmail.com
        </a>
        <div className={styles.footerLinks}>
          <a
            className={styles.footerLink}
            href="https://www.linkedin.com/in/alberto-cambronero"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            className={styles.footerLink}
            href="https://github.com/tobe5"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <span className={styles.footerDim}>San José, CR — UTC−6</span>
          <span className={styles.footerDim}>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
