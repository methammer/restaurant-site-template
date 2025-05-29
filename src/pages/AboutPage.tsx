import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ChefHat, Leaf, ShieldCheck } from "lucide-react"; // Removed Users, Building2
import { siteConfig } from "@/config/site";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const establishmentImages = [
  { src: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", alt: "Intérieur élégant du restaurant" },
  { src: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", alt: "Table dressée avec soin" },
  { src: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", alt: "Détail de la décoration" },
  { src: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", alt: "Ambiance chaleureuse en soirée" },
];

const AboutPage = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Notre Histoire</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {siteConfig.name} est né d'une passion pour la gastronomie authentique et le désir de créer un lieu unique où saveurs, convivialité et élégance se rencontrent. Fondé en [Année de fondation - à remplacer], notre restaurant s'est rapidement imposé comme une référence pour les amateurs de cuisine bistronomique moderne. Notre philosophie repose sur le respect des produits, l'innovation culinaire et l'art de recevoir.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop" // Placeholder chef image
            alt="Chef [Nom du Chef]" 
            className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/5]"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold font-serif flex items-center">
            <ChefHat className="h-10 w-10 mr-3 text-primary" />
            Notre Chef, [Nom du Chef]
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Avec plus de [Nombre] années d'expérience dans les cuisines les plus prestigieuses, Chef [Nom du Chef] apporte sa vision unique à chaque plat. Sa cuisine est un hommage aux produits du terroir, sublimés par des techniques modernes et une touche de créativité audacieuse. Passionné par les saveurs justes et les associations harmonieuses, il s'engage à offrir une expérience gustative mémorable à chaque visite.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            "[Citation du chef sur sa philosophie culinaire - à remplacer]" - Chef [Nom du Chef]
          </p>
        </div>
      </section>

      <section className="bg-muted/50 -mx-4 px-4 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold font-serif text-center mb-10">L'Ambiance {siteConfig.name}</h2>
          <Carousel 
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
            className="w-full"
          >
            <CarouselContent>
              {establishmentImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden">
                    <div className="aspect-video">
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">{image.alt}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <p className="text-center mt-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre établissement a été pensé pour offrir un cadre à la fois élégant et accueillant. Des lumières tamisées, une décoration soignée et une atmosphère chaleureuse vous invitent à la détente et à la dégustation.
          </p>
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl md:text-4xl font-semibold font-serif text-center mb-10">Nos Engagements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-xl">Qualité des Produits</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Nous sélectionnons des ingrédients d'exception, frais et de saison, en privilégiant les producteurs locaux et responsables.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-xl">Savoir-Faire Artisanal</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Chaque plat est préparé avec soin et précision, dans le respect des techniques culinaires traditionnelles et innovantes.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-xl">Hospitalité & Service</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Notre équipe est dédiée à vous offrir un service attentionné et personnalisé pour une expérience des plus agréables.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Optional: Team Section */}
      {/* 
      <section>
        <h2 className="text-3xl md:text-4xl font-semibold font-serif text-center mb-10">Notre Équipe</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          // Team member card structure
          <Card className="text-center">
            <CardHeader className="items-center">
              <img src="placeholder_team_member.jpg" alt="Nom Membre" className="w-32 h-32 rounded-full object-cover mb-4" />
              <CardTitle className="font-serif">Nom Membre</CardTitle>
              <p className="text-sm text-primary">Rôle</p>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Courte description ou citation.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      */}
    </div>
  );
};

export default AboutPage;
