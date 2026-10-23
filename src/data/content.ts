export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "contatos", label: "Contatos", href: "#contatos" },
] as const;

export const HERO_TAGS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "n8n",
  "Git",
] as const;

export const SOCIALS = {
  portfolio: "https://pedrovyg-dev.vercel.app/",
  github: "https://github.com/pedrovyg",
} as const;

export const CONTACT_LINKS = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    username: "@pedrovyg",
    href: "https://api.whatsapp.com/send/?phone=5581999367665&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20queria%20conversar%20mais%20sobre%20seus%20servi%C3%A7os",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    username: "@pedrovygotsky",
    href: "https://www.linkedin.com/in/pedrovygotsky/",
  },
  {
    id: "instagram",
    title: "Instagram",
    username: "@pedrovyg",
    href: "https://www.instagram.com/pedrovyg/",
  },
  {
    id: "email",
    title: "E-mail",
    username: "pedrovyg.dev@gmail.com",
    href: "mailto:pedrovyg.dev@gmail.com?subject=Contato%20atrav%C3%A9s%20do%20site",
  },
] as const;

export type ContactLink = (typeof CONTACT_LINKS)[number];
