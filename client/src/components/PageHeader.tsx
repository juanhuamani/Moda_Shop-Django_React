import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Container } from "@/components/ui/Container"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[]
}

export function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <Container className="mb-6">
      <nav aria-label="Ruta de navegación">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => {
            const isCurrent = index === breadcrumbs.length - 1

            return (
              <li key={item.href ?? item.label} className="flex items-center">
                {item.href && !isCurrent ? (
                  <Link
                    to={item.href}
                    className="rounded-control px-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isCurrent ? "page" : undefined}
                    className={isCurrent ? "px-1 py-0.5 font-medium text-foreground" : "px-1 py-0.5 text-muted-foreground"}
                  >
                    {item.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </Container>
  )
}
