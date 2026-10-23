import { CONTACT_LINKS } from "../data/content";
import ContactCard from "./ContactCard";

export default function About() {
  return (
    <section
      id="contatos"
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#050505] px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24 xl:px-12 2xl:px-16"
    >
      <div className="w-full">
        <p className="section-label">Contatos</p>
        <div className="mt-5 grid w-full gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] xl:gap-16 2xl:gap-20">
          <div className="min-w-0 w-full">
            <h2 id="contact-heading" className="about-title">
              <span className="about-title-primary">Construindo</span>{" "}
              <span className="about-title-secondary">projetos digitais que realmente escalam.</span>
            </h2>
          </div>

          <div className="grid min-w-0 w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {CONTACT_LINKS.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
