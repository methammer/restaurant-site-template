export const siteConfig = {
  name: "Le Régal Authentique",
  description: "Restaurant bistronomique moderne, offrant une cuisine raffinée avec des produits frais de saison.",
  url: "https://example.com", // Replace with actual URL
  ogImage: "https://example.com/og.jpg", // Replace with actual OG image
  links: {
    // Add social media links if any
    // twitter: "https://twitter.com/example",
    // facebook: "https://facebook.com/example",
  },
  navLinks: [
    { href: "/", label: "Accueil" },
    { href: "/menu", label: "Menu" },
    { href: "/a-propos", label: "À Propos" },
    { href: "/reservations", label: "Réservations" },
    { href: "/galerie", label: "Galerie" },
    { href: "/contact", label: "Contact" },
  ],
  contact: {
    phone: "+33 1 23 45 67 89",
    email: "contact@leregalauthentique.fr", // This should be protected on the contact page
    address: "123 Rue de la Gastronomie, 75000 Paris, France",
  },
  openingHours: {
    monday: "Fermé",
    tuesday: "12:00 - 14:30, 19:00 - 22:30",
    wednesday: "12:00 - 14:30, 19:00 - 22:30",
    thursday: "12:00 - 14:30, 19:00 - 22:30",
    friday: "12:00 - 14:30, 19:00 - 23:00",
    saturday: "19:00 - 23:00",
    sunday: "12:00 - 15:00",
  },
};

export type SiteConfig = typeof siteConfig;
