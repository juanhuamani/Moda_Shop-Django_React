"use client"

import { useState, useEffect } from "react"
import { Star, Heart, Share2, Truck, ShoppingBag, Check, Clock } from "lucide-react"
import { Button, Badge } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { Tooltip } from "@/components/ui/ToolTip"
import { PageHeader } from "@/components/PageHeader"

const allProducts = [
    {
      id: 5,
      name: "Camiseta de algodón premium",
      price: "€29.99",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      reviews: 87,
    },
    {
      id: 6,
      name: "Pantalones vaqueros slim fit",
      price: "€59.99",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.3,
      reviews: 62,
    },
    {
      id: 7,
      name: "Sudadera con capucha",
      price: "€49.99",
      image: "/placeholder.svg?height=400&width=400",
      originalPrice: "€69.99",
      rating: 4.7,
      reviews: 103,
      discount: "30%",
    },
    {
      id: 8,
      name: "Zapatillas casual",
      price: "€79.99",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.4,
      reviews: 76,
    },
    {
      id: 9,
      name: "Gorra deportiva",
      price: "€19.99",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.2,
      reviews: 45,
    },
    {
      id: 10,
      name: "Bolso de mano",
      price: "€39.99",
      image: "/placeholder.svg?height=400&width=400",
      originalPrice: "€49.99",
      rating: 4.6,
      reviews: 58,
      discount: "20%",
    },
    {
      id: 11,
      name: "Cinturón de cuero",
      price: "€24.99",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.5,
      reviews: 37,
    },
    {
      id: 12,
      name: "Gafas de sol polarizadas",
      price: "€89.99",
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviews: 92,
      isNew: true,
    },
  ]

export function ProductDetailRoute() {
  const productId = Number.parseInt('31')
  const product = allProducts.find((p) => p.id === productId) || allProducts[0]

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<typeof allProducts>([])

  useEffect(() => {
    const related = allProducts
      .filter((p) => p.id !== product.id)
      .sort(() => 0.5 - Math.random()) 
      .slice(0, 4)

    setRelatedProducts(related)
  }, [product.id])

  const productImages = [
    product.image,
    "/placeholder.svg?height=400&width=400&text=Vista+Lateral",
    "/placeholder.svg?height=400&width=400&text=Vista+Trasera",
    "/placeholder.svg?height=400&width=400&text=Detalle",
  ]

  // Características del producto
  const productFeatures = [
    "Material de alta calidad",
    "Diseño ergonómico",
    "Resistente al agua",
    "Fácil de limpiar",
    "Garantía de 2 años",
  ]

  // Especificaciones técnicas
  const productSpecs = [
    { name: "Material", value: "Algodón 100%" },
    { name: "Peso", value: "250g" },
    { name: "Dimensiones", value: "30 x 20 x 10 cm" },
    { name: "País de origen", value: "España" },
    { name: "Instrucciones de lavado", value: "Lavado a máquina a 30°C" },
    { name: "Código de barras", value: "8400000" + product.id.toString().padStart(6, "0") },
    { name: "Referencia", value: "REF-" + product.id.toString().padStart(4, "0") },
  ]

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const stockStatus = {
    status: "in_stock", // in_stock, low_stock, out_of_stock, preorder
    quantity: 15,
    message: "En stock. Envío en 24-48h",
  }

  return (
      <div className="p-4 md:p-6">
        <PageHeader
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/products" },
            { label: product.name, href: `/app/products/${product.name}` }
          ]}
        />

        {/* Product Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border border-[hsl(224,34%,30%)] bg-[hsl(224,34%,25%)]">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-contain p-4"
              />
              {product.discount && (
                <Badge variant="destructive" className="absolute left-4 top-4">
                  -{product.discount}
                </Badge>
              )}
              {product.isNew && (
                <Badge variant="primary" className="absolute left-4 top-4">
                  Nuevo
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`overflow-hidden rounded-md border ${
                    selectedImage === index ? "border-[hsl(215,100%,92%)]" : "border-[hsl(224,34%,30%)]"
                  } bg-[hsl(224,34%,25%)]`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Vista ${index + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                {product.isNew && <Badge variant="primary">Nuevo</Badge>}
                {product.discount && <Badge variant="destructive">-{product.discount}</Badge>}

                {stockStatus.status === "in_stock" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Check className="h-3 w-3" /> En stock
                  </Badge>
                )}
                {stockStatus.status === "low_stock" && (
                  <Badge variant="secondary" className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700">
                    <Clock className="h-3 w-3" /> Pocas unidades
                  </Badge>
                )}
                {stockStatus.status === "out_of_stock" && (
                  <Badge variant="secondary" className="flex items-center gap-1 bg-red-600 hover:bg-red-700">
                    Agotado
                  </Badge>
                )}
              </div>

              <h1 className="mb-2 text-3xl font-bold text-[hsl(215,100%,92%)]">{product.name}</h1>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current text-yellow-500" : "text-[hsl(215,100%,92%)/30]"}`}
                    />
                  ))}
                  <span className="ml-2 text-[hsl(215,100%,92%)]">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
                <span className="text-[hsl(215,100%,92%)/70]">
                  Código: PRD-{product.id.toString().padStart(4, "0")}
                </span>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <span className="text-3xl font-bold text-[hsl(215,100%,92%)]">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-[hsl(215,100%,92%)/70] line-through">{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="rounded-md bg-red-500/20 px-2 py-1 text-sm font-medium text-red-400">
                    Ahorras {product.discount}
                  </span>
                )}
              </div>

              {/* Stock Status Message */}
              <div className="mb-6 flex items-center gap-2 text-sm">
                {stockStatus.status === "in_stock" && (
                  <div className="flex items-center gap-1 text-green-400">
                    <Check className="h-4 w-4" />
                    <span>{stockStatus.message}</span>
                  </div>
                )}
                {stockStatus.status === "low_stock" && (
                  <div className="flex items-center gap-1 text-amber-400">
                    <Clock className="h-4 w-4" />
                    <span>¡Solo quedan {stockStatus.quantity} unidades!</span>
                  </div>
                )}
                {stockStatus.status === "out_of_stock" && (
                  <div className="flex items-center gap-1 text-red-400">
                    <span>Agotado temporalmente. Disponible en 2-3 semanas.</span>
                  </div>
                )}
              </div>

              <p className="mb-6 text-[hsl(215,100%,92%)/80]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              </p>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="mb-2 font-medium text-[hsl(215,100%,92%)]">Cantidad</h3>
                <div className="flex w-32 items-center rounded-md border border-[hsl(224,34%,30%)]">
                  <button
                    className="flex h-10 w-10 items-center justify-center border-r border-[hsl(224,34%,30%)] text-[hsl(215,100%,92%)/70] hover:bg-[hsl(224,34%,25%)] hover:text-[hsl(215,100%,92%)]"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                    className="w-12 border-none bg-transparent p-0 text-center text-[hsl(215,100%,92%)] focus:outline-none focus:ring-0"
                  />
                  <button
                    className="flex h-10 w-10 items-center justify-center border-l border-[hsl(224,34%,30%)] text-[hsl(215,100%,92%)/70] hover:bg-[hsl(224,34%,25%)] hover:text-[hsl(215,100%,92%)]"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                
                <Tooltip content="Añadir a favoritos">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Tooltip>
                <Tooltip content="Compartir">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </Tooltip>
              </div>

              {/* Shipping Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(224,34%,30%)]">
                      <Truck className="h-5 w-5 text-[hsl(215,100%,92%)]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[hsl(215,100%,92%)]">Envío gratuito</h3>
                      <p className="text-sm text-[hsl(215,100%,92%)/70]">
                        En pedidos superiores a €100. Entrega en 3-5 días laborables.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-[hsl(215,100%,92%)]">Descripción del producto</h3>
                  <div className="space-y-4 text-[hsl(215,100%,92%)/80]">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia,
                      nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies
                      lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                    </p>
                    <p>
                      Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet
                      nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit
                      amet nisl.
                    </p>

                    <h4 className="mt-6 text-lg font-semibold text-[hsl(215,100%,92%)]">Características principales</h4>
                    <ul className="list-inside list-disc space-y-2">
                      {productFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-lg border border-[hsl(224,34%,30%)] bg-[hsl(224,34%,25%)] p-4">
                      <h4 className="mb-2 font-semibold text-[hsl(215,100%,92%)]">Nota importante</h4>
                      <p className="text-sm text-[hsl(215,100%,92%)/80]">
                        Los colores pueden variar ligeramente debido a la configuración de tu pantalla. Las medidas
                        pueden tener una variación de ±2cm debido al proceso de fabricación.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-[hsl(215,100%,92%)]">Especificaciones técnicas</h3>
                  <div className="divide-y divide-[hsl(224,34%,30%)]">
                    {productSpecs.map((spec, index) => (
                      <div key={index} className="flex py-3">
                        <span className="w-1/3 font-medium text-[hsl(215,100%,92%)]">{spec.name}</span>
                        <span className="w-2/3 text-[hsl(215,100%,92%)/80]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-[hsl(215,100%,92%)]">Productos relacionados</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-[hsl(224,34%,25%)]">
                  <img
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                  {relatedProduct.discount && (
                    <Badge variant="destructive" className="absolute left-2 top-2">
                      -{relatedProduct.discount}
                    </Badge>
                  )}
                  {relatedProduct.isNew && (
                    <Badge variant="primary" className="absolute left-2 top-2">
                      Nuevo
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-1 font-medium text-[hsl(215,100%,92%)]">
                    <a href={`/products/${relatedProduct.id}`} className="hover:text-[hsl(215,100%,92%)/80]">
                      {relatedProduct.name}
                    </a>
                  </h3>
                  <div className="mb-2 flex items-center">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    <span className="ml-1 text-xs text-[hsl(215,100%,92%)/70]">
                      {relatedProduct.rating} ({relatedProduct.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[hsl(215,100%,92%)]">{relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-[hsl(215,100%,92%)/70] line-through">
                          {relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button variant="ghost" size="icon-sm" asChild>
                      <a href={`/products/${relatedProduct.id}`}>
                        <ShoppingBag className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
  )
}
