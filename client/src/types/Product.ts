interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    price: number;
    category: string;
    discount?: number;
    isNew?: number;
    reviews?: number;
    rating?: number;
    originalPrice?: number;
}

export type { Product };