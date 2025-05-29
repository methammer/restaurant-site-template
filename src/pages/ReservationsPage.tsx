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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock, Users, Phone, MailWarning } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

const reservationFormSchema = z.object({
  date: z.date({
    required_error: "La date est requise.",
  }),
  time: z.string({
    required_error: "L'heure est requise.",
  }),
  guests: z.string().refine(val => parseInt(val) >= 1 && parseInt(val) <= 10, {
    message: "Le nombre de convives doit être entre 1 et 10.",
  }),
  firstName: z.string().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, {
    message: "Numéro de téléphone invalide.",
  }),
  email: z.string().email({
    message: "Adresse e-mail invalide.",
  }),
  specialRequests: z.string().max(300, {
    message: "Les demandes spéciales ne doivent pas dépasser 300 caractères.",
  }).optional(),
});

type ReservationFormValues = z.infer<typeof reservationFormSchema>;

// Dummy available time slots
const availableTimeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

const ReservationsPage = () => {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      guests: "2",
      specialRequests: "",
    },
  });

  function onSubmit(data: ReservationFormValues) {
    console.log(data); // In a real app, send this to a backend
    toast.success("Votre demande de réservation a été envoyée!", {
      description: `Nous vous contacterons bientôt pour confirmer votre table pour ${data.guests} personne(s) le ${format(data.date, "PPP", { locale: fr })} à ${data.time}.`,
    });
    form.reset();
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Réserver une Table</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Nous sommes ravis de vous accueillir. Veuillez remplir le formulaire ci-dessous pour demander une réservation.
          Pour les groupes de plus de 10 personnes, veuillez nous contacter directement.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="md:col-span-2 space-y-8 p-6 border rounded-lg shadow-sm bg-card">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: fr })
                            ) : (
                              <span>Choisissez une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                          }
                          initialFocus
                          locale={fr}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <Clock className="mr-2 h-4 w-4 opacity-50" />
                          <SelectValue placeholder="Choisissez une heure" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimeSlots.map(slot => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Convives</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <Users className="mr-2 h-4 w-4 opacity-50" />
                        <SelectValue placeholder="Nombre de personnes" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(10)].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1} personne(s)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre prénom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="06 12 34 56 78" {...field} />
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
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demandes Spéciales / Commentaires (Optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Allergies, occasion spéciale, préférences de table..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum 300 caractères.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">Envoyer la Demande</Button>
          </form>
        </Form>

        <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-muted/50">
          <h2 className="text-2xl font-semibold font-serif text-foreground">Autres Moyens de Réserver</h2>
          <p className="text-muted-foreground">
            Vous préférez réserver par téléphone ou avez une demande particulière ? N'hésitez pas à nous appeler.
          </p>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-primary" />
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-lg hover:text-primary transition-colors">
                {siteConfig.contact.phone}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Nos lignes sont ouvertes pendant nos heures de service.
            </p>
          </div>
          <hr className="border-border/60" />
          <div>
            <h3 className="text-lg font-semibold font-serif text-foreground mb-2">Confirmation</h3>
            <p className="text-sm text-muted-foreground">
              Veuillez noter que ce formulaire est une demande de réservation. Votre table sera confirmée par e-mail ou téléphone par notre équipe.
              Si vous ne recevez pas de confirmation dans les 24 heures, merci de nous contacter.
            </p>
          </div>
          <div className="mt-4 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-start">
            <MailWarning className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
            <p className="text-xs">
              Pour les réservations le jour même, surtout le week-end, nous vous recommandons fortement de nous appeler directement pour une confirmation immédiate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsPage;
