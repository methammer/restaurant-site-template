import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu as MenuIcon, ChefHat } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher'; // Corrected: Use named import

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'À Propos' },
  { href: '/reservations', label: 'Réservations' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl font-serif">{siteConfig.name.split(' ')[0]} <span className="text-primary">{siteConfig.name.split(' ').slice(1).join(' ')}</span></span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeSwitcher /> {/* Add ThemeSwitcher here */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-6">
                  <Link to="/" className="flex items-center space-x-2 mb-6">
                     <ChefHat className="h-7 w-7 text-primary" />
                    <span className="font-bold text-xl font-serif">{siteConfig.name}</span>
                  </Link>
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      className={({ isActive }) =>
                        `transition-colors hover:text-primary ${
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-8">
                  <Button className="w-full" asChild>
                    <Link to="/reservations">Réserver une Table</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
           <Button className="hidden md:inline-flex" asChild>
            <Link to="/reservations">Réserver une Table</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
