import { siteConfig } from '@/config/site';
import { UtensilsCrossed, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border/40">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <UtensilsCrossed className="h-8 w-8 text-primary" />
              <span className="font-bold font-serif text-2xl text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="text-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground font-serif">Liens Rapides</h3>
            <ul className="space-y-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground font-serif">Nous Contacter</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground font-serif">Horaires d'Ouverture</h3>
            <ul className="space-y-1 text-sm">
              {Object.entries(siteConfig.openingHours).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span className="capitalize">{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 text-center text-sm">
          <p>&copy; {currentYear} {siteConfig.name}. Tous droits réservés.</p>
          {/* Optional: Add links to privacy policy, terms, etc. */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
