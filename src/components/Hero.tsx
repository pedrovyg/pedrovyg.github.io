import { useRef, useState } from "react";
import portraitImage from "../../assets/pedro-vygotsky.jpg";
import { HERO_TAGS, SOCIALS } from "../data/content";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { ArrowRightIcon, ChevronDownIcon, GitHubIcon } from "./icons";

export default function Hero() {
  const [portraitUnavailable, setPortraitUnavailable] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    section: sectionRef,
    background: backgroundRef,
    overlay: overlayRef,
    content: contentRef,
    title: titleRef,
    subtitle: subtitleRef,
    meta: metaRef,
    hint: hintRef,
  });

  return (
    <section id="hero-section" ref={sectionRef} className="relative w-full bg-[#050505]">
      <div
        id="home"
        className="viewport-height flex w-full flex-col px-3 pb-3 pt-[76px] sm:px-4 sm:pb-4 sm:pt-[84px] lg:px-6 lg:pb-6"
      >
        <div className="relative flex min-h-0 w-full flex-1 overflow-hidden rounded-[1.25rem] border border-white/[0.075] bg-[#0b0b0d] sm:rounded-[1.5rem]">
          <div
            ref={backgroundRef}
            className="hero-grid pointer-events-none absolute -inset-[12%] origin-center"
            aria-hidden="true"
          />
          <div
            className="hero-vignette pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 bg-black opacity-[0.18]"
            aria-hidden="true"
          />

          {!portraitUnavailable && (
            <div className="hero-portrait" aria-hidden="true">
              <div className="hero-portrait-glow" />
              <img
                src={portraitImage}
                alt=""
                width="1250"
                height="1250"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="hero-portrait-img"
                onError={() => setPortraitUnavailable(true)}
              />
              <div className="hero-portrait-fade hero-portrait-fade--left" />
              <div className="hero-portrait-fade hero-portrait-fade--top" />
              <div className="hero-portrait-fade hero-portrait-fade--bottom" />
            </div>
          )}

          <div className="relative z-10 flex min-h-full w-full flex-1 flex-col px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-14 md:px-10 lg:px-14 xl:px-16 2xl:px-20 lg:pt-[72px] lg:pb-12">
            <div ref={contentRef} className="w-full">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#141416]/90 px-3.5 py-[7px]">
                <span className="available-dot" aria-hidden="true" />
                <span className="text-[10px] font-medium tracking-[0.18em] text-[#c8c8cc]">
                  DISPONÍVEL PARA COLABORAÇÕES
                </span>
              </div>

              <h1
                ref={titleRef}
                className="hero-title mt-7 sm:mt-8"
              >
                <span className="hero-title-primary">Programador Web</span>{" "}
                <span className="hero-title-secondary">Dev Fullstack &amp; AI</span>
              </h1>

              <p
                ref={subtitleRef}
                className="mt-6 w-full max-w-[620px] text-[15px] leading-relaxed text-[#9a9aa2] sm:mt-7 sm:text-base md:text-[17px]"
              >
                👋 Olá, eu sou Pedro Vygotsky
              </p>

              <div ref={metaRef} className="mt-8 w-full sm:mt-9">
                <ul className="flex flex-wrap gap-2">
                  {HERO_TAGS.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-white/[0.08] bg-[#121214]/80 px-2.5 py-1 text-[11px] text-[#c4c4c8]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
                  <a
                    href={SOCIALS.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta hero-cta--primary"
                    title="Abrir o portfólio de Pedro Vygotsky em nova aba"
                    aria-label="Abrir o portfólio de Pedro Vygotsky em nova aba"
                  >
                    <span className="hero-cta-label">
                      Portfólio
                      <ArrowRightIcon className="hero-cta-arrow h-4 w-4" />
                    </span>
                  </a>
                  <a
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta hero-cta--secondary"
                    title="Abrir o perfil do GitHub de Pedro Vygotsky em nova aba"
                    aria-label="Abrir o perfil do GitHub de Pedro Vygotsky em nova aba"
                  >
                    <span className="hero-cta-label">
                      <GitHubIcon className="h-4 w-4" />
                      GitHub
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div
              ref={hintRef}
              className="mt-auto flex w-full flex-col items-center pt-10"
            >
              <a
                href="#contatos"
                className="group flex flex-col items-center gap-1.5 text-[#5c5c64] transition hover:text-[#9a9aa2]"
              >
                <span className="text-[10px] font-medium tracking-[0.28em]">
                  ROLE PARA EXPLORAR
                </span>
                <ChevronDownIcon className="scroll-chevron h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
