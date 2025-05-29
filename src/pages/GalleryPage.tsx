import { useState } from 'react';
import { Card } from "@/components/ui/card"; // Removed CardContent
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { XIcon } from 'lucide-react';
import { siteConfig } from '@/config/site'; // Added siteConfig import
import type { GalleryMedia as GalleryMediaType } from '@/types'; // Import the type

// Dummy data - replace with actual high-quality images and videos
const galleryMedia: GalleryMediaType[] = [
  { type: 'image', src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Plat gastronomique coloré' },
  { type: 'image', src: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Service de fruits de mer' },
  { type: 'image', src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Salade fraîche et appétissante' },
  { type: 'image', src: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Intérieur du restaurant, ambiance chaleureuse' },
  { type: 'image', src: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Table dressée avec élégance' },
  { type: 'image', src: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Dessert au chocolat gourmand' },
  { type: 'image', src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Cocktails colorés au bar' },
  { type: 'image', src: 'https://images.pexels.com/photos/761854/pexels-photo-761854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Chef en action en cuisine' },
  { type: 'video', src: 'https://videos.pexels.com/video-files/854194/854194-hd_1280_720_25fps.mp4', thumbnail: 'https://images.pexels.com/videos/854194/pexels-photo-854194.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Préparation de plat en vidéo' },
];

const GalleryPage = () => {
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (media: GalleryMediaType) => {
    setSelectedMedia(media);
    setIsDialogOpen(true);
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Galerie</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Plongez dans l'univers visuel de {siteConfig.name}. Découvrez nos plats signatures, l'ambiance de notre établissement et les moments capturés.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryMedia.map((media, index) => (
          <Dialog key={index} open={isDialogOpen && selectedMedia?.src === media.src} onOpenChange={(open) => { if(!open) setSelectedMedia(null); setIsDialogOpen(open);}}>
            <DialogTrigger asChild>
              <Card 
                className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                onClick={() => openDialog(media)}
              >
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={media.type === 'video' ? media.thumbnail : media.src}
                    alt={media.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80 group-hover:opacity-100 transition-opacity">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  )}
                </AspectRatio>
              </Card>
            </DialogTrigger>
            {selectedMedia && selectedMedia.src === media.src && (
               <DialogContent className="max-w-3xl p-0 border-0 bg-transparent shadow-none">
                {selectedMedia.type === 'image' ? (
                  <img src={selectedMedia.src} alt={selectedMedia.alt} className="rounded-lg w-full h-auto max-h-[80vh] object-contain" />
                ) : (
                  <video src={selectedMedia.src} controls autoPlay className="rounded-lg w-full h-auto max-h-[80vh]">
                    Votre navigateur ne supporte pas la balise vidéo.
                  </video>
                )}
                 <button 
                    onClick={() => {setSelectedMedia(null); setIsDialogOpen(false);}} 
                    className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Fermer"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
