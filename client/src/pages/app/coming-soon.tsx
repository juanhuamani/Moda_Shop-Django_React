import { Link } from "react-router-dom"
import { StatusPage } from "@/components/common/StatusPage"
import { AnimatedPage } from "@/components/layouts/AnimatedPage"
import { buttonVariants } from "@/components/ui/Button"
import { paths } from "@/config/paths"

interface ComingSoonPageProps {
  title: string
  description: string
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <AnimatedPage>
      <StatusPage
        title={title}
        description={description}
        action={
          <Link to={paths.app.root.path} className={buttonVariants({ variant: "primary" })}>
            Volver al dashboard
          </Link>
        }
      />
    </AnimatedPage>
  )
}
