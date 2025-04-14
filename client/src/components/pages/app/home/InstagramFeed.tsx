import { Button } from "@/components/ui"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Instagram } from "lucide-react"

export function InstagramFeed() {
  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Instagram className="mr-2 h-5 w-5" /> Instagram
        </CardTitle>
        <CardDescription>Síguenos en @modashop</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <a
              key={index}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-md bg-[hsl(224,34%,25%)]"
            >
              <img
                src={`/placeholder.svg?height=200&width=200&text=Insta ${index + 1}`}
                alt={`Instagram post ${index + 1}`}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[hsl(220,47%,10%)/70] opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="h-6 w-6 text-white" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Seguir en Instagram
        </Button>
      </CardFooter>
    </Card>
  )
}
