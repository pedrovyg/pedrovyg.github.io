import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/content";
import { CloseIcon, MenuIcon } from "./icons";
import { cn } from "../utils/cn";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] pointer-events-none w-full px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6 transition-all duration-300">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Floating pill navbar container */}
        <div
          className={cn(
            "pointer-events-auto relative flex w-full items-center justify-between rounded-2xl sm:rounded-[1.35rem] border transition-all duration-300 ease-out",
            "bg-[#0a0a0c]/80 backdrop-blur-xl border-white/[0.08]",
            "shadow-[0_12px_36px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.07)]",
            scrolled
              ? "h-[54px] sm:h-[56px] px-4 sm:px-7 bg-[#0a0a0c]/92 border-white/[0.12] shadow-[0_16px_42px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.09)]"
              : "h-[62px] sm:h-[64px] px-5 sm:px-8"
          )}
        >
          {/* Logo / Identificação à esquerda */}
          <a
            href="#home"
            className="group flex items-center gap-1.5 font-sans text-[15px] sm:text-[15.5px] font-extrabold tracking-[-0.055em] text-[#f6f6f7] transition-colors duration-200 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Ir para o topo - PV."
          >
            <span>PV.</span>
          </a>

          {/* Links Desktop & Tablet à direita */}
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navegação principal"
          >
            {NAV_LINKS.map((link) => {
              const isCurrent = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "relative py-1 text-[13.5px] font-medium tracking-tight transition-colors duration-200",
                    isCurrent
                      ? "text-white"
                      : "text-[#8d8d93] hover:text-[#f4f4f5]"
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {link.label}
                  {/* Underline ativo inspirado fielmente na referência */}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-white transition-all duration-300 ease-out",
                      isCurrent
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* Botão Mobile Hambúrguer moderno */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#d4d4d8] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white md:hidden"
            aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <CloseIcon className="h-4.5 w-4.5" />
            ) : (
              <MenuIcon className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

        {/* Menu Mobile suspenso com glassmorphism elegante */}
        <div
          className={cn(
            "pointer-events-auto md:hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0c]/95 backdrop-blur-2xl shadow-2xl transition-all duration-300 ease-out",
            open
              ? "mt-2 max-h-48 opacity-100 p-2 border-white/[0.12]"
              : "mt-0 max-h-0 opacity-0 p-0 border-transparent"
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Navegação móvel">
            {NAV_LINKS.map((link) => {
              const isCurrent = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    isCurrent
                      ? "bg-white/[0.08] text-white"
                      : "text-[#9a9aa0] hover:bg-white/[0.04] hover:text-white"
                  )}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {isCurrent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
