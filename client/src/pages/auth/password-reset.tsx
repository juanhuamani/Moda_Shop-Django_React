import { useEffect, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Button, Input, Label } from "@/components/ui"
import { paths } from "@/config/paths"
import { showSuccessToast } from "@/utils/toast"

export const PasswordResetRoute = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setError("")
    setIsSubmitting(true)

    timerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      setDone(true)
      showSuccessToast("Contraseña actualizada correctamente")
    }, 700)
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Nueva contraseña</h1>
        <p className="text-sm text-muted-foreground">Elige una contraseña segura para tu cuenta.</p>
      </div>

      {done ? (
        <div role="status" className="rounded-card border border-success/40 bg-success/10 p-4 text-center text-sm text-success-light">
          Tu contraseña ya está actualizada.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="password">Nueva contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              aria-invalid={Boolean(error)}
              errorMessage={error}
            />
          </div>
          <Button type="submit" className="w-full" isLoading={isSubmitting} loadingText="Guardando...">
            Guardar contraseña
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
