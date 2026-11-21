import { useEffect, useRef, useState, type FormEvent } from "react"
import { Button, Input } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/Card"
import { Check, Percent } from "lucide-react"
import { showSuccessToast } from "@/utils/toast"

export function SpecialOffer() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Introduce un correo electrónico válido")
      return
    }

    setError("")
    setIsSubmitting(true)

    timerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      setSubscribed(true)
      showSuccessToast("¡Listo! Tienes un 15% de descuento en tu primera compra")
    }, 700)
  }

  return (
    <Card className="col-span-full md:col-span-4 lg:col-span-3">
      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
        <Percent className="mb-4 h-12 w-12 text-ring" />
        <h3 className="mb-2 text-heading font-bold text-foreground">Oferta especial</h3>
        <p className="mb-4 text-foreground/80">
          ¡Suscríbete a nuestro boletín y obtén un 15% de descuento en tu primera compra!
        </p>

        {subscribed ? (
          <div
            role="status"
            className="flex flex-col items-center gap-2 rounded-card border border-success/40 bg-success/10 p-4 text-success-light"
          >
            <Check className="h-6 w-6" aria-hidden="true" />
            <p className="text-sm font-medium">¡Suscripción confirmada!</p>
            <p className="text-xs text-muted-foreground">Revisa tu correo para ver tu código.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="w-full" noValidate>
            <div className="mb-4 w-full">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                aria-label="Tu correo electrónico"
                aria-invalid={Boolean(error)}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                errorMessage={error}
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              className="border-ring text-foreground"
              isLoading={isSubmitting}
              loadingText="Suscribiendo..."
            >
              Suscribirse
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
