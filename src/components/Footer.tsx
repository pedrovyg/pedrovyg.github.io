import { NAV_LINKS } from "../data/content";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#050505] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 xl:px-12 2xl:px-16">
      <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-[#6e6e74]">
          © 2026 Pedro Vygotsky
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Rodapé">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-[13px] text-[#6e6e74] transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
