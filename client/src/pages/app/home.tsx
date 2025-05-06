import { BenefitsSection } from "@/components/pages/app/home/BenefitsSection";
import { CategoriesSection } from "@/components/pages/app/home/CategoriesSection";
import { FeaturedProduct } from "@/components/pages/app/home/FeaturedProduct";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "@/components/pages/app/home/HeroSection";
import { PageHeader } from "@/components/PageHeader";
import { SpecialOffer } from "@/components/pages/app/home/SpecialOffer";
import { TrendingProducts } from "@/components/pages/app/home/TrendingProducts";

import { useEffect, useState } from "react";
import { Category } from "@/types/Categories";
import { Product } from "@/types/Product";
import { protectedApi } from "@/axios/BaseAxios";

import { AnimatedPage } from "@/components/layouts/AnimatedPage";


export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productFeatured, setProductFeatured] = useState<Product>();
  const [productsPopular, setProductsPopular] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, featuredRes, popularRes] = await Promise.all([
          protectedApi.get("/categories"),
          protectedApi.get("/products/featured"),
          protectedApi.get("/products/popular"),
        ]);
  
        const { categories } = categoriesRes.data;
        if (categories) setCategories(categories);
  
        if (featuredRes.data) setProductFeatured(featuredRes.data);
        if (popularRes.data) setProductsPopular(popularRes.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <AnimatedPage>
    <div className="p-4 md:p-6">
      <PageHeader
        breadcrumbs={[
          { label: "Inicio", href: "/" }
        ]}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">
        <HeroSection />
        <CategoriesSection categories={categories} />
        {productFeatured && <FeaturedProduct product={productFeatured} />}
        <SpecialOffer />
        {productsPopular && <TrendingProducts products={productsPopular} />}
        <BenefitsSection />
      </div>

      <Footer />
    </div>
    </AnimatedPage>
  );
}
