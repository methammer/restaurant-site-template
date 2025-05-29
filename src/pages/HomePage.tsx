import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Award, Star, ChefHat, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

// Dummy data - replace with actual data
const featuredDishes = [
  {
    name: "Filet de Boeuf Rossini",
    description: "Tendreté et saveurs exquises, foie gras poêlé, sauce truffée.",
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=600", 
    price: "32€"
  },
  {
    name: "Risotto aux Cèpes Frais",
    description: "Crémosité du riz Arborio, parfum boisé des cèpes de saison.",
    image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: "24€"
  },
  {
    name: "Moelleux au Chocolat Grand Cru",
    description: "Coeur coulant intense, accompagné de sa glace vanille artisanale.",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: "12€"
  }
];

const testimonials = [
  {
    quote: "Une expérience culinaire inoubliable. Chaque plat était une œuvre d'art.",
    name: "Sophie L.",
    stars: 5
  },
  {
    quote: "L'ambiance est chaleureuse et le service impeccable. Vivement recommandé!",
    name: "Marc D.",
    stars: 5
  },
  {
    quote: "Des produits frais, une cuisine inventive. Le meilleur restaurant du quartier.",
    name: "Chloé P.",
    stars: 4
  }
];

// Utiliser des images Pexels pour le carrousel héros
const heroImages = [
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];


const HomePage = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section - MODIFIED for full viewport width */}
      <section className="relative w-screen h-[70vh] md:h-[80vh] -mt-8 left-1/2 -translate-x-1/2">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          className="w-full h-full"
        >
          <CarouselContent className="h-full">
            {heroImages.map((src, index) => (
              <CarouselItem key={index} className="h-full">
                <img 
                  src={src} 
                  alt={`Hero image ${index + 1}`} 
                  className="w-full h-full object-cover" 
                  crossOrigin="anonymous" 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none z-10" />
        </Carousel>
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight mb-4 animate-fade-in-down">
            {siteConfig.name}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in-up animation-delay-300">
            Une symphonie de saveurs où tradition et modernité se rencontrent.
          </p>
          <div className="space-x-4 animate-fade-in-up animation-delay-600">
            <Button size="lg" asChild>
              <Link to="/reservations">Réserver une Table</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/menu">Consulter le Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold font-serif mb-6">Bienvenue au {siteConfig.name}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Plongez au cœur d'une expérience bistronomique où chaque plat raconte une histoire. Notre chef passionné et son équipe dédient leur savoir-faire à la création de mets raffinés, élaborés à partir de produits frais et de saison, sourcés localement autant que possible. Laissez-vous séduire par une ambiance chaleureuse et un service attentionné, pour un moment de pur plaisir gustatif.
        </p>
      </section>

      {/* Key Points Section */}
      <section>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-2xl">Produits Frais de Saison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nous sélectionnons rigoureusement nos ingrédients pour leur fraîcheur et leur qualité, en privilégiant les circuits courts.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-2xl">Chef Passionné</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notre chef met sa créativité et son expertise au service d'une cuisine inventive qui sublime les saveurs authentiques.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-2xl">Ambiance Chaleureuse</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Profitez d'un cadre élégant et convivial, idéal pour vos repas d'affaires, dîners romantiques ou moments entre amis.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-semibold font-serif text-center mb-10">Quelques unes de nos créations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  crossOrigin="anonymous" 
                />
              </div>
              <CardHeader>
                <CardTitle className="font-serif text-xl">{dish.name}</CardTitle>
                <CardDescription className="text-primary font-semibold">{dish.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <Link to="/menu">Découvrir Tout le Menu</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 -mx-4 md:-mx-6 lg:-mx-8 px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold font-serif text-center mb-10">Ce que nos clients disent</h2>
          <Carousel 
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 7000, stopOnInteraction: true })]}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < testimonial.stars ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`} />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="italic">"{testimonial.quote}"</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <p className="font-semibold text-right">- {testimonial.name}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-25px] sm:left-[-40px]" />
            <CarouselNext className="right-[-25px] sm:right-[-40px]" />
          </Carousel>
        </div>
      </section>
      
      {/* Quick Access Info */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold font-serif mb-6">Prêt à nous rendre visite ?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Nous sommes impatients de vous accueillir. Réservez votre table dès maintenant ou contactez-nous pour toute question.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center text-lg">
            <MapPin className="h-6 w-6 mr-2 text-primary" />
            <span>{siteConfig.contact.address}</span>
          </div>
          <div className="flex items-center text-lg">
            <Phone className="h-6 w-6 mr-2 text-primary" />
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
         <div className="mt-8">
            <Button size="lg" asChild>
              <Link to="/reservations">Réserver en ligne</Link>
            </Button>
          </div>
      </section>

    </div>
  );
};

export default HomePage;
