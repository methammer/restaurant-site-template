import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, Train, ParkingCircle, Accessibility } from "lucide-react"; // Removed Clock
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }).max(500, { message: "Le message ne doit pas dépasser 500 caractères." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data); // In a real app, send this to a backend (e.g., via an API endpoint)
    toast.success("Votre message a été envoyé!", {
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    form.reset();
  }

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Contactez-Nous</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Une question, une suggestion ou besoin d'informations ? N'hésitez pas à nous contacter.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Information & Map */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold font-serif mb-4 text-foreground">Nos Coordonnées</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                {/* This is a simple mailto link. For spam protection, a backend solution or JS encoding is better. */}
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold font-serif mb-4 text-foreground">Horaires d'Ouverture</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {Object.entries(siteConfig.openingHours).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span className="capitalize font-medium">{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Map Placeholder */}
          <div>
            <h2 className="text-2xl font-semibold font-serif mb-4 text-foreground">Nous Trouver</h2>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              {/* Replace with actual Google Maps embed iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625996838!2d2.292292615674396!3d48.85837360866062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1670000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border:0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte de localisation du restaurant"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 md:p-8 border rounded-lg shadow-sm bg-card">
          <h2 className="text-2xl font-semibold font-serif mb-6 text-foreground">Envoyez-nous un Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom Complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom complet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="votre.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sujet</FormLabel>
                    <FormControl>
                      <Input placeholder="Sujet de votre message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Écrivez votre message ici..."
                        className="resize-none min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      Maximum 500 caractères.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full">Envoyer le Message</Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Practical Access Info */}
      <section className="bg-muted/50 -mx-4 px-4 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold font-serif text-center mb-8 text-foreground">Informations Pratiques d'Accès</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Train className="h-10 w-10 mx-auto text-primary mb-2" />
              <h3 className="text-xl font-semibold font-serif text-foreground">Transports en Commun</h3>
              <p className="text-sm text-muted-foreground">Métro Ligne X: Station [Nom Station] (5 min à pied)<br/>Bus Ligne Y, Z: Arrêt [Nom Arrêt]</p>
            </div>
            <div className="space-y-2">
              <ParkingCircle className="h-10 w-10 mx-auto text-primary mb-2" />
              <h3 className="text-xl font-semibold font-serif text-foreground">Stationnement</h3>
              <p className="text-sm text-muted-foreground">Parking public [Nom Parking] à 200m.<br/>Quelques places disponibles dans les rues adjacentes (payant).</p>
            </div>
            <div className="space-y-2">
              <Accessibility className="h-10 w-10 mx-auto text-primary mb-2" />
              <h3 className="text-xl font-semibold font-serif text-foreground">Accessibilité PMR</h3>
              <p className="text-sm text-muted-foreground">Notre restaurant est accessible aux personnes à mobilité réduite. Entrée de plain-pied et toilettes adaptées.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
