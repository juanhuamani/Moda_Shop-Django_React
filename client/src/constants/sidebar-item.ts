import { Home, Package, Tag, ShoppingCart, Users, Percent, Settings, HelpCircle } from 'lucide-react'
import { LucideIcon } from "lucide-react"
import { paths } from "@/config/paths";

export interface SidebarItem {
    id: string
    title: string 
    icon: LucideIcon
    href: string
    gap?: boolean
}

export const sidebarItems: SidebarItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: Home,
        href: paths.app.root.path
    },
    {
        id: 'products',
        title: 'Productos',
        icon: Package,
        href: paths.app.products.path
    },
    {
        id: 'categories',
        title: 'Categorías',
        icon: Tag,
        href: paths.app.categories.path
    },
    {
        id: 'cart',
        title: 'Cart',
        icon: ShoppingCart,
        href: paths.app.cart.path
    },
    {
        id: 'customers',
        title: 'Clientes',
        icon: Users,
        href: paths.app.customers.path
    },
    {
        id: 'discounts',
        title: 'Descuentos',
        icon: Percent,
        href: paths.app.discounts.path
    },
    {
        id: 'settings',
        title: 'Configuración',
        icon: Settings,
        href: paths.app.settings.path,
    },
    {
        id: 'help',
        title: 'Ayuda',
        icon: HelpCircle,
        href: paths.app.help.path
    }
];
