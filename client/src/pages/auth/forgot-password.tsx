import { useEffect, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Button, Input, Label } from "@/components/ui"
import { paths } from "@/config/paths"
import { showSuccessToast } from "@/utils/toast"

export const ForgotPasswordRoute = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Introduce un correo electrónico válido")
      return
    }

    setError("")
    setIsSubmitting(true)

    timerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      setSent(true)
      showSuccessToast("Te enviamos un enlace para restablecer tu contraseña")
    }, 700)
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Recuperar contraseña</h1>
        <p className="text-sm text-muted-foreground">
          Te enviaremos un enlace para crear una nueva contraseña.
        </p>
      </div>

      {sent ? (
        <div role="status" className="rounded-card border border-success/40 bg-success/10 p-4 text-center text-sm text-success-light">
          Revisa tu correo. El enlace caduca en unos minutos.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(error)}
              errorMessage={error}
            />
          </div>
          <Button type="submit" className="w-full" isLoading={isSubmitting} loadingText="Enviando enlace...">
            Enviar enlace
          </Button>
        </form>
      )}

      <div className="text-center text-sm">
        <Link
          to={paths.auth.login.path}
          className="font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  )
}
