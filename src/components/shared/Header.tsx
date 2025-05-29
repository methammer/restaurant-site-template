import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu as MenuIcon, UtensilsCrossed } from 'lucide-react';
import { ModeToggle } from './ModeToggle'; // We'll create this

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-bold font-serif text-xl">{siteConfig.name}</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {siteConfig.navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${
                  isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button asChild className="hidden md:inline-flex" size="sm">
            <Link to="/reservations">Réserver une Table</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="flex items-center space-x-2 mb-6">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                  <span className="font-bold font-serif text-xl">{siteConfig.name}</span>
                </Link>
                {siteConfig.navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `text-lg transition-colors hover:text-primary ${
                        isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Button asChild className="w-full mt-4">
                  <Link to="/reservations">Réserver une Table</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
