import { Button, Image } from "@/components/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Instagram } from "lucide-react"
import heroOne from "@/assets/pages/hero.jpg"
import heroTwo from "@/assets/pages/hero2.jpg"
import heroThree from "@/assets/pages/hero3.jpg"

const feedImages = [heroOne, heroTwo, heroThree, heroOne, heroTwo, heroThree]

export function InstagramFeed() {
  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center text-heading text-foreground">
          <Instagram className="mr-2 h-5 w-5" /> Instagram
        </CardTitle>
        <CardDescription>Síguenos en @modashop</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {feedImages.map((image, index) => (
            <a
              key={`publicacion-${index + 1}`}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-control bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <Image
                src={image}
                alt={`Publicación de Instagram ${index + 1}`}
                className="h-full w-full rounded-control object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Instagram className="h-6 w-6 text-foreground" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full rounded-control">
          Seguir en Instagram
        </Button>
      </CardFooter>
    </Card>
  )
}
