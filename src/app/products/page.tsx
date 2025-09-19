/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/products/page.tsx - UPDATED WITH SERVER COMPONENTS
// 🎯 PURE SERVER COMPONENT ARCHITECTURE - Zero Hydration Errors
// ✅ 4-column responsive grid implemented
// ✅ Server-side filtering and pagination
// ✅ Perfect SEO and performance
// ✅ Uses new server components

import { Metadata } from "next";
import { Suspense } from "react";
import { getProducts, getProductCategories } from "@/lib/contentful";
import {
  PRODUCT_CATEGORIES,
  SITE_CONFIG,
  TARGET_KEYWORDS,
} from "@/lib/contants";
import {
  ArrowRight,
  Headphones,
  Settings,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { extractPlainTextFromRichText } from "@/components/common/RichTextRenderer";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ✅ NEW SERVER COMPONENTS - No hydration issues!
import ProductGridServer from "@/components/products/server/ProductGrid";
import ProductSearchServer from "@/components/products/server/ProductSearch";
import { getCanonicalUrl } from "@/lib/url";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    page?: string;
    sort?: string;
    view?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const { category, brand, search } = params;

  let title =
    "Industrial Automation Products + Technical Support | Mederi Karya";
  let description =
    "Complete catalog automation parts: PLC, HMI, Inverter, Servo , Power Meter & Sensors dengan technical support. Programming, Parameter setting, commissioning, & engineering consultation.";

  if (category) {
    const categoryData = PRODUCT_CATEGORIES.find(
      (cat) => cat.slug === category
    );
    if (categoryData) {
      title = `${categoryData.name} + Technical Support | Mederi Karya Indonesia`;
      description = `${categoryData.description}. Harga terbaik dengan support engineering services.`;
    }
  }

  if (brand) {
    title = `${
      brand.charAt(0).toUpperCase() + brand.slice(1)
    } Products + Technical Support | Mederi Karya`;
    description = `${brand} automation products dengan programming, parameter setting, commissioning service dan engineering services .`;
  }

  if (search) {
    title = `Search: "${search}" - Automation Parts + Technical Support | Mederi Karya`;
    description = `Search results for "${search}" - automation parts dengan engineering services. programming, Parameter setting, troubleshooting, konsultasi.`;
  }

  let canonicalPath = "/products";

  if (category) {
    canonicalPath += `?category=${category}`;
  } else if (brand) {
    canonicalPath += `?brand=${brand}`;
  } else if (search) {
    canonicalPath += `?search=${search}`;
  }

  return {
    title,
    description,
    keywords: [
      ...TARGET_KEYWORDS.primary,
      category ? `${category} automation` : null,
      brand ? `${brand} automation products` : null,
      search ? `${search} automation parts` : null,
      "technical support automation",
      "parameter setting service",
      "engineering consultation indonesia",
    ].filter((k): k is string => Boolean(k)),
    openGraph: {
      title,
      description,
      url: "/products",
      type: "website",
    },
    alternates: {
      canonical: getCanonicalUrl(canonicalPath),
    },
  };
}

// 🎯 MAIN SERVER COMPONENT - Pure server rendering
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const {
    category,
    brand,
    search,
    page = "1",
    sort = "newest",
    view = "grid",
  } = params;
  const currentPage = parseInt(page);
  const itemsPerPage = 12;

  // ✅ SERVER-SIDE DATA FETCHING
  const [allProducts, categories] = await Promise.all([
    getProducts({ limit: 1000 }),
    getProductCategories(),
  ]);

  // ✅ SERVER-SIDE FILTERING
  let filteredProducts = allProducts;

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase().replace(/\s+/g, "-") === category
    );
  }

  // Filter by brand
  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand.toLowerCase().replace(/\s+/g, "-") === brand
    );
  }

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) => {
      const plainDescription =
        typeof product.description === "string"
          ? product.description
          : extractPlainTextFromRichText(product.description) || "";

      return (
        String(product.name).toLowerCase().includes(searchLower) ||
        String(product.brand).toLowerCase().includes(searchLower) ||
        String(product.model).toLowerCase().includes(searchLower) ||
        String(product.category).toLowerCase().includes(searchLower) ||
        plainDescription.toLowerCase().includes(searchLower)
      );
    });
  }

  // ✅ SERVER-SIDE SORTING
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "name":
        return String(a.name).localeCompare(String(b.name));
      case "brand":
        return String(a.brand).localeCompare(String(b.brand));
      case "category":
        return String(a.category).localeCompare(String(b.category));
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  // ✅ SERVER-SIDE PAGINATION
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ✅ BREADCRUMB DATA
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ];

  if (category) {
    const categoryData = PRODUCT_CATEGORIES.find(
      (cat) => cat.slug === category
    );
    if (categoryData) {
      breadcrumbItems.push({
        name: categoryData.name,
        url: `/products?category=${category}`,
      });
    }
  }

  return (
    <>
      {/* ✅ SERVER-RENDERED SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      {/* ✅ HERO HEADER SECTION */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-8 mt-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={breadcrumbItems}
            className="mb-6 [&_a]:text-white [&_a:hover]:text-white [&_span]:text-white"
          />

          <div className="max-w-4xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {category
                ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)
                    ?.name || "Products"
                : brand
                  ? `${brand.charAt(0).toUpperCase() + brand.slice(1)} Products`
                  : search
                    ? `Search Results`
                    : "Industrial Automation Products"}
              <span className="block text-white text-lg lg:text-xl font-normal mt-2">
                + Technical Support & Engineering Services
              </span>
            </h1>

            <p className="text-base text-blue-100 leading-relaxed max-w-3xl">
              {category
                ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)
                    ?.description ||
                  "Quality automation parts with comprehensive engineering support."
                : search
                  ? `Search results for "${search}" with technical support included`
                  : "Complete range of automation parts with comprehensive engineering support. Programming, Parameter setting, commissioning, troubleshooting services available."}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ MAIN CONTENT AREA */}
      <div className="container mx-auto px-4 py-8">
        {/* ✅ SEARCH COMPONENT - Server rendered */}
        <Suspense fallback={<SearchCardSkeleton />}>
          <ProductSearchServer
            totalProducts={totalProducts}
            currentCategory={category}
            currentBrand={brand}
            currentSearch={search}
            enableAutoSubmit={false} // Can be enabled for progressive enhancement
          />
        </Suspense>

        {/* ✅ PRODUCT GRID - Server rendered with 4-column layout */}
        <div className="mt-8">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGridServer
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              baseUrl="/products"
              searchParams={params}
              viewMode={view as "grid" | "list"}
              enablePagination={true}
              itemsPerPage={itemsPerPage}
            />
          </Suspense>
        </div>
      </div>

      {/* ✅ TECHNICAL SUPPORT CTA - ENHANCED WITH CONTACT INFO */}
      {totalProducts > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
          {/* Background Pattern - Same as home page */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                         radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Technical Support?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Our engineering team provides parameter setting, commissioning,
                and troubleshooting services for all products. Get best
                consultation for your automation project.
              </p>

              {/* CTA Buttons - Same style as home page but keeping current sizing */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {/* Primary Button - Request Technical Support */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Headphones className="h-5 w-5 mr-2" />
                  <span>Request Technical Support</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>
                </Link>

                {/* Secondary Button - Engineering Consultation */}
                <Link
                  href="/quote"
                  className="group relative inline-flex items-center justify-center px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  <span>Engineering Consultation</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>

              {/* Contact Information Card - Professional & Clean */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-5xl mx-auto">
                <h3 className="text-white font-semibold mb-6 text-lg">
                  Direct Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Phone Contact */}
                  <a
                    href={`tel:${SITE_CONFIG.company.phone}`}
                    className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">
                        Call Direct
                      </p>
                      <p className="font-semibold text-white text-sm group-hover:text-blue-100 transition-colors">
                        {SITE_CONFIG.company.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email Contact */}
                  <a
                    href={`mailto:${SITE_CONFIG.company.email}`}
                    className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">
                        Email Us
                      </p>
                      <p className="font-semibold text-white text-sm group-hover:text-blue-100 transition-colors truncate">
                        {SITE_CONFIG.company.email}
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp Contact */}
                  <a
                    href="https://wa.me/6285210067755?text=Halo MKI, saya membutuhkan technical support untuk automation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex-shrink-0">
                      <MessageSquare className="h-6 w-6 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">
                        WhatsApp
                      </p>
                      <p className="font-semibold text-white text-sm group-hover:text-blue-100 transition-colors">
                        Iqbal - 085210067755 <br />
                        Iksan - 085717278739
                      </p>
                    </div>
                  </a>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Response within 2 hours</span>
                    </div>
                    {/* <div className="hidden sm:block w-1 h-1 bg-blue-200 rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>8+ Years Experience</span>
                    </div> */}
                    <div className="hidden sm:block w-1 h-1 bg-blue-200 rounded-full"></div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Nationwide Service</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Note */}
              <p className="text-blue-100 text-sm mt-6 opacity-80">
                💡 For fastest response, use the floating WhatsApp button or
                call directly
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ✅ SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category
              ? PRODUCT_CATEGORIES.find((cat) => cat.slug === category)?.name
              : "Industrial Automation Products",
            description:
              "Complete catalog of automation parts with technical support",
            url: "/products",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: `https://mederikaryaindonesia.com${item.url}`,
              })),
            },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: totalProducts,
              itemListElement: paginatedProducts
                .slice(0, 10)
                .map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    name: product.name,
                    url: `https://mederikaryaindonesia.com/products/${product.slug}`,
                    brand: {
                      "@type": "Brand",
                      name: product.brand,
                    },
                    category: product.category,
                    description:
                      extractPlainTextFromRichText(product.description) ||
                      "Product description available",
                    offers: {
                      "@type": "Offer",
                      availability: product.inStock
                        ? "https://schema.org/InStock"
                        : "https://schema.org/PreOrder",
                      seller: {
                        "@type": "Organization",
                        name: "Mederi Karya Indonesia",
                      },
                    },
                  },
                })),
            },
            provider: {
              "@type": "Organization",
              name: "Mederi Karya Indonesia",
              description:
                "Industrial automation parts supplier with technical support",
              url: "https://mederikaryaindonesia.com",
            },
          }),
        }}
      />
    </>
  );
}

// ✅ LOADING SKELETONS - Server-safe components
function SearchCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-40" />
          </div>
        </div>
        <div className="text-right">
          <div className="h-6 bg-gray-200 rounded w-8 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div>
      {/* Toolbar Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-white border border-gray-200 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48" />
        <div className="flex items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-32" />
          <div className="h-8 bg-gray-200 rounded w-16" />
        </div>
      </div>

      {/* 4-Column Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="grid grid-cols-2 gap-1">
                <div className="h-8 bg-gray-200 rounded" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
