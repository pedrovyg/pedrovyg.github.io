import type { ContactLink } from "../data/content";
import {
  ArrowUpRightIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "./icons";

const CONTACT_ICONS = {
  whatsapp: WhatsAppIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  email: MailIcon,
};

export default function ContactCard({ contact }: { contact: ContactLink }) {
  const Icon = CONTACT_ICONS[contact.id];
  const isEmail = contact.id === "email";
  const label = isEmail
    ? `Enviar e-mail para ${contact.username} no aplicativo de e-mail padrão`
    : `Abrir ${contact.title} de Pedro Vygotsky (${contact.username}) em nova aba`;

  return (
    <a
      className="contact-card"
      href={contact.href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      aria-label={label}
      title={label}
    >
      <div className="contact-card-top">
        <span className="contact-card-icon">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRightIcon className="contact-card-arrow h-4 w-4" />
      </div>

      <div>
        <h3 className="contact-card-title">{contact.title}</h3>
        <p className="contact-card-username">{contact.username}</p>
      </div>
    </a>
  );
}