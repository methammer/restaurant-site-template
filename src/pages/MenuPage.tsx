import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Leaf, Wheat, Fish, Drumstick, Cake, Info, Utensils } from "lucide-react"; // Removed Wine
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Dummy data - replace with actual data
interface Allergen {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const allergens: Allergen[] = [
  { id: 'vegetarian', name: 'Végétarien', icon: Leaf, description: 'Convient aux végétariens' },
  { id: 'gluten-free', name: 'Sans Gluten', icon: Wheat, description: 'Préparé sans gluten' },
  // Add more allergens as needed
];

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  allergenIds?: string[]; // IDs from the allergens list
}

interface MenuCategory {
  name: string;
  icon: React.ElementType;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    name: "Entrées",
    icon: Utensils, // Now correctly uses imported Utensils
    items: [
      { id: "e1", name: "Velouté de Saison", description: "Selon l'inspiration du marché, servi avec croûtons à l'ail.", price: "12€", image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400", allergenIds: ['vegetarian'] },
      { id: "e2", name: "Foie Gras de Canard Mi-Cuit", description: "Chutney de figues maison, pain d'épices toasté.", price: "18€", image: "https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: "e3", name: "Tartare de Daurade Royale", description: "Agrumes, coriandre fraîche et perles de yuzu.", price: "16€", image: "https://images.pexels.com/photos/5639633/pexels-photo-5639633.jpeg?auto=compress&cs=tinysrgb&w=400", allergenIds: ['gluten-free'] },
    ],
  },
  {
    name: "Plats Principaux - Viandes",
    icon: Drumstick,
    items: [
      { id: "v1", name: "Filet de Boeuf Façon Rossini", description: "Tournedos de boeuf, escalope de foie gras poêlée, sauce Périgueux.", price: "32€", image: "https://images.pexels.com/photos/361184/pexels-photo-361184.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: "v2", name: "Magret de Canard Rôti", description: "Jus corsé au miel et épices douces, écrasé de pommes de terre vitelotte.", price: "28€", image: "https://images.pexels.com/photos/6049273/pexels-photo-6049273.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: "v3", name: "Carré d'Agneau en Croûte d'Herbes", description: "Légumes de saison glacés, jus d'agneau réduit.", price: "30€", image: "https://images.pexels.com/photos/60616/appetite-beef-big-bread-60616.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
  },
  {
    name: "Plats Principaux - Poissons",
    icon: Fish,
    items: [
      { id: "p1", name: "Bar de Ligne Cuit sur Peau", description: "Risotto crémeux aux asperges vertes, émulsion citronnée.", price: "29€", image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400", allergenIds: ['gluten-free'] },
      { id: "p2", name: "Noix de Saint-Jacques Poêlées", description: "Fondue de poireaux, sauce champagne safranée.", price: "34€", image: "https://images.pexels.com/photos/2280901/pexels-photo-2280901.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
  },
  {
    name: "Desserts",
    icon: Cake,
    items: [
      { id: "d1", name: "Moelleux au Chocolat Grand Cru", description: "Coeur coulant, glace vanille Bourbon artisanale.", price: "12€", image: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: "d2", name: "Tarte Tatin Revisitée", description: "Pommes caramélisées, pâte feuilletée croustillante, crème fraîche d'Isigny.", price: "11€", image: "https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { id: "d3", name: "Assiette de Fromages Affinés", description: "Sélection de notre maître fromager, confiture de cerises noires.", price: "14€", image: "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=400" },
    ],
  },
  // Add more categories like Boissons, Menus, etc.
];

const AllergenIconDisplay: React.FC<{ allergenId: string }> = ({ allergenId }) => {
  const allergen = allergens.find(a => a.id === allergenId);
  if (!allergen) return null;
  const IconComponent = allergen.icon;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="p-1 bg-muted rounded-full">
            <IconComponent className="h-4 w-4 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{allergen.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};


const MenuPage = () => {
  const handleDownloadMenu = () => {
    // In a real app, this would point to the PDF file URL
    alert("Le téléchargement du menu PDF n'est pas encore implémenté.");
    // window.open('/path-to-your-menu.pdf', '_blank');
  };

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Notre Carte</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez une sélection de plats élaborés avec passion, mettant en valeur les meilleurs produits de saison.
        </p>
        <Button onClick={handleDownloadMenu} className="mt-6">
          <Download className="mr-2 h-4 w-4" /> Télécharger le Menu (PDF)
        </Button>
      </section>

      <Tabs defaultValue={menuData[0].name} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center gap-2 h-auto">
          {menuData.map((category) => (
            <TabsTrigger key={category.name} value={category.name} className="flex-grow lg:flex-grow-0">
              <category.icon className="mr-2 h-5 w-5" /> {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {menuData.map((category) => (
          <TabsContent key={category.name} value={category.name} className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Card key={item.id} className="flex flex-col overflow-hidden group">
                  {item.image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="font-serif text-xl">{item.name}</CardTitle>
                      <CardDescription className="text-lg text-primary font-semibold whitespace-nowrap">{item.price}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    {item.allergenIds && item.allergenIds.length > 0 && (
                      <div className="flex space-x-2 mt-auto pt-2 border-t border-border/40">
                        {item.allergenIds.map(id => <AllergenIconDisplay key={id} allergenId={id} />)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <section className="mt-12 p-6 bg-muted/50 rounded-lg">
        <div className="flex items-center text-primary mb-2">
          <Info className="h-6 w-6 mr-2" />
          <h3 className="text-xl font-semibold font-serif">Informations Allergènes</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Nous prenons les allergies très au sérieux. Veuillez informer notre personnel de toute allergie ou restriction alimentaire lors de votre commande.
          Bien que nous prenions toutes les précautions, nous ne pouvons garantir l'absence totale de traces d'allergènes.
        </p>
        <div className="flex flex-wrap gap-4">
          {allergens.map(allergen => (
            <div key={allergen.id} className="flex items-center text-sm">
              <allergen.icon className="h-5 w-5 mr-1.5 text-primary" />
              <span>{allergen.name}: {allergen.description}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
