// src/app/page.tsx - OPTIMIZED HOMEPAGE STRUCTURE
import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import {
  getFeaturedProducts,
  getProductCategories,
  getServices,
} from "@/lib/contentful";
import { TARGET_KEYWORDS, SITE_CONFIG } from "@/lib/contants";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesHighlight from "@/components/home/ServicesHighlight";
import CTASection from "@/components/home/CTASection";
import BrandShowcase from "@/components/home/BrandShowcase";
import { getCanonicalUrl } from "@/lib/url";

export const metadata: Metadata = {
  title:
    "One Stop Solution for Industrial Automation Supplier + Engineering Support | Prestasi Jaya Maju",
  description:
    "Solusi Industrial Automation lengkap, PLC, Inverter, HMI, Sensor , Servo dan Power meter dengan engineering support Programming & Parameter setting, commissioning, engineering consultation Jakarta.",
  keywords: [
    ...TARGET_KEYWORDS.primary,
    ...TARGET_KEYWORDS.secondary.slice(0, 3),
    "Prestasi Jaya Maju",
    "automation parts bekasi",
  ],
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default async function HomePage() {
  // Fetch data
  const [featuredProducts, categories, services] = await Promise.all([
    getFeaturedProducts(6),
    getProductCategories(),
    getServices({ limit: 10 }),
  ]);

  return (
    <>
      {/* SECTION 1: Hero Section */}
      <HeroSection />

      {/* SECTION 2: brand Showcase */}
      <BrandShowcase />

      {/* SECTION 3: Product Categories (Primary focus) */}
      <CategoryShowcase categories={categories} />

      {/* SECTION 4: Why Choose Us (Value Proposition) */}
      <WhyChooseUs />

      {/* SECTION 5: Services Highlight */}
      <ServicesHighlight services={services} />

      {/* SECTION 6: Featured Products (Only if available) */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts products={featuredProducts} />
      )}

      {/* SECTION 7: Final CTA */}
      <CTASection />

      {/* Simple SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Prestasi Jaya Maju",
            url: SITE_CONFIG.url,
            telephone: SITE_CONFIG.company.phone,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Bekasi",
              addressRegion: "West Java",
              addressCountry: "ID",
            },
            openingHours: "Mo-Fr 08:00-17:00",
            areaServed: ["Jakarta", "Surabaya", "Bandung", "Tangerang", "Balikpapan"],
            description:
              "Supplier automation parts dengan technical support profesional",
          }),
        }}
      />
    </>
  );
}
