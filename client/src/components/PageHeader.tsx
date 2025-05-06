import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string; 
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
}

export function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center text-sm text-tertiary">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center">
            {item.href ? (
              <a href={item.href} className="hover:text-tertiary">
                {item.label}
              </a>
            ) : (
              <span className="text-tertiary">{item.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="mx-2 h-4 w-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
