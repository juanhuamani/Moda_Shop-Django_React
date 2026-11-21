import { BenefitsSection } from "@/components/pages/app/home/BenefitsSection";
import { CategoriesSection } from "@/components/pages/app/home/CategoriesSection";
import { FeaturedProduct } from "@/components/pages/app/home/FeaturedProduct";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/pages/app/home/HeroSection";
import { PageHeader } from "@/components/PageHeader";
import { SpecialOffer } from "@/components/pages/app/home/SpecialOffer";
import { TrendingProducts } from "@/components/pages/app/home/TrendingProducts";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Category } from "@/types/Categories";
import type { Product } from "@/types/Product";
import { api } from "@/axios/BaseAxios";
import { paths } from "@/config/paths";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/common/Skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { cn } from "@/utils/cn";

type FetchStatus = "loading" | "ready" | "error";

function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex min-h-64 flex-col gap-4 rounded-card border border-card-border bg-card p-6 shadow-card", className)}>
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="min-h-32 flex-1" />
    </div>
  );
}

function SectionMessage({ className, title, description }: { className?: string; title: string; description: string }) {
  return (
    <div className={cn("flex min-h-64 items-center justify-center rounded-card border border-card-border bg-card p-4 text-center shadow-card", className)}>
      <EmptyState title={title} description={description} />
    </div>
  );
}

export function HomePage() {
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [categories, setCategories] = useState<Category[]>([]);
  const [productFeatured, setProductFeatured] = useState<Product>();
  const [productsPopular, setProductsPopular] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, featuredRes, popularRes] = await Promise.all([
          api.get("/api/categories"),
          api.get("/api/products/featured"),
          api.get("/api/products/popular"),
        ]);

        if (categoriesRes.data?.categories) setCategories(categoriesRes.data.categories);
        if (featuredRes.data) setProductFeatured(featuredRes.data);
        if (popularRes.data?.products) setProductsPopular(popularRes.data.products);
        setStatus("ready");
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  return (
    <motion.main
      className="pb-4"
      initial={false}
      animate={{ opacity: 1 }}
    >
      <PageHeader
        breadcrumbs={[
          { label: "Inicio", href: paths.app.root.path }
        ]}
      />

      <Container className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12">
        <HeroSection />

        {status === "loading" && (
          <>
            <SectionSkeleton className="col-span-full md:col-span-4" />
            <SectionSkeleton className="col-span-full md:col-span-4 lg:col-span-5" />
            <SectionSkeleton className="col-span-full md:col-span-4 lg:col-span-3" />
          </>
        )}

        {status === "error" && (
          <SectionMessage
            className="col-span-full"
            title="No se pudo cargar la tienda"
            description="Inténtalo de nuevo más tarde."
          />
        )}

        {status === "ready" && (
          <>
            {categories.length > 0 ? (
              <CategoriesSection categories={categories} />
            ) : (
              <SectionMessage
                className="col-span-full md:col-span-4"
                title="Sin categorías"
                description="No hay categorías disponibles en este momento."
              />
            )}

            {productFeatured ? (
              <FeaturedProduct product={productFeatured} />
            ) : (
              <SectionMessage
                className="col-span-full md:col-span-4 lg:col-span-5"
                title="Sin producto destacado"
                description="No hay producto destacado en este momento."
              />
            )}

            <SpecialOffer />

            {productsPopular.length > 0 ? (
              <TrendingProducts products={productsPopular} />
            ) : (
              <SectionMessage
                className="col-span-full lg:col-span-8"
                title="Sin tendencias"
                description="No hay productos tendencia en este momento."
              />
            )}
          </>
        )}

        <BenefitsSection />
      </Container>

      <Footer />
    </motion.main>
  );
}
