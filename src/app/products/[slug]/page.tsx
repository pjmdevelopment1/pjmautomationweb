/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/products/[slug]/page.tsx - UPDATED WITH SERVICE-LIKE LAYOUT
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Settings,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Users,
  Shield,
  Star,
  CheckCircle,
  AlertCircle,
  Wrench,
  ShoppingCart,
  Download,
  Package,
  MapPin,
} from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/contentful";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/lib/contants";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import RelatedProducts from "@/app/products/RelatedProducts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getCanonicalUrl } from "@/lib/url";

// export const dynamic = "force-dynamic"; 
// OR
export const revalidate = 10800;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Prestasi Jaya Maju",
      description: "The requested product could not be found.",
    };
  }

  const title = product.seoTitle;
  const description = product.seoDescription;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.brand,
      product.model,
      product.category,
      "technical support",
      "parameter setting",
      "commissioning service",
      "automation parts indonesia",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: getCanonicalUrl(`/products/${product.slug}`),
      images:
        product.images.length > 0
          ? [
              {
                url: product.images[0],
                width: 800,
                height: 600,
                alt: product.name,
              },
            ]
          : [],
    },
    alternates: {
      canonical: getCanonicalUrl(`/products/${product.slug}`),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products (same category)
  // const relatedProducts = await getProducts({
  //   category: product.category,
  //   limit: 5,
  // });

  // // Filter out current product from related
  // const filteredRelated = relatedProducts.filter((p) => p.id !== product.id);

  // Fetch all products for smart related logic
  const allProducts = await getProducts({ limit: 2000 });

  // STRATEGY: Category dulu, baru brand - dengan urutan PLC, HMI, Inverter
  let relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // Brand yang sama dalam category = +10 poin
      if (a.brand === product.brand) scoreA += 10;
      if (b.brand === product.brand) scoreB += 10;

      // Model series yang mirip = +5 poin
      const productModelPrefix = product.model.substring(0, 4);
      if (a.model.startsWith(productModelPrefix)) scoreA += 5;
      if (b.model.startsWith(productModelPrefix)) scoreB += 5;

      return scoreB - scoreA;
    })
    .slice(0, 4);

  // Jika hasil kurang dari 4, tambah dari category terdekat
  if (relatedProducts.length < 4) {
    // Urutan priority: current category dulu, lalu PLC, HMI, Inverter
    const categoryPriority = [product.category, "PLC", "HMI", "Inverter"];

    const otherCategories = allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          p.category !== product.category &&
          ["PLC", "HMI", "Inverter"].includes(p.category) &&
          !relatedProducts.some((rp) => rp.id === p.id)
      )
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // Brand yang sama = +10 poin (prioritas tertinggi)
        if (a.brand === product.brand) scoreA += 10;
        if (b.brand === product.brand) scoreB += 10;

        // Category priority: PLC > HMI > Inverter
        const aCategoryIndex = categoryPriority.indexOf(a.category);
        const bCategoryIndex = categoryPriority.indexOf(b.category);
        scoreA += (4 - aCategoryIndex) * 2; // PLC=6, HMI=4, Inverter=2
        scoreB += (4 - bCategoryIndex) * 2;

        return scoreB - scoreA;
      })
      .slice(0, 4 - relatedProducts.length);

    relatedProducts = [...relatedProducts, ...otherCategories];
  }

  const filteredRelated = relatedProducts;

  // Breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    {
      name: product.category,
      url: `/products?category=${product.category
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />

      {/* Main Content */}
      <div className="mt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Product Header - Grid Layout like Service Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-12 overflow-hidden">
            {/* Left Side - Product Image */}
            <div className="lg:col-span-1">
              <ProductImageSection product={product} />
            </div>

            {/* Right Side - Product Info */}
            <div className="lg:col-span-2 space-y-3">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href="/products"
                  className="text-blue-900 hover:underline"
                >
                  Products
                </Link>
                <span className="text-gray-400">/</span>
                <Link
                  href={`/products?category=${product.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-blue-900 hover:underline"
                >
                  {product.category}
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{product.name}</span>
              </div>

              {/* Brand & Category Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.feature && (
                  <Badge className="bg-yellow-500 text-sm">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Product Title & Model */}
              <div>
                <h1 className="text-xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Jual {product.name} | Supplier Automation Indonesia
                </h1>
                {/* <p className="text-lg text-gray-600 mb-4">
                  Model: <span className="font-semibold text-gray-900">{product.model}</span>
                </p> */}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">
                      Available for immediate shipping
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">
                      Contact for availability & lead time
                    </span>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Hubungi kami untuk harga terbaik
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Kami menawarkan harga terbaik dengan dukungan engineering
                  support
                </p>
                {product.showPrice && product.price && (
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {formatPrice(product.price)}
                  </div>
                )}
                {product.priceNote && (
                  <p className="text-sm text-gray-500">{product.priceNote}</p>
                )}
              </div>

              {/* Services Included */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">
                  Services Option:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-900 flex-shrink-0" />
                    <span className="text-sm text-blue-900">
                      Programming / Parameter Setting
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-900 flex-shrink-0" />
                    <span className="text-sm text-blue-900">
                      Installation Documentation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-blue-900 flex-shrink-0" />
                    <span className="text-sm text-blue-900">
                      Commissioning Service
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-900 flex-shrink-0" />
                    <span className="text-sm text-blue-900">
                      Training & Support
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-blue-900 hover:bg-blue-950 text-white px-8 py-3"
                  asChild
                >
                  <Link href={`/quote?product=${product.slug}`}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Request Quote
                  </Link>
                </Button>
                {product.datasheet && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={product.datasheet}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Datasheet
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Product Details - Full Width */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg p-4 lg:p-8 overflow-hidden">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Product Details
                </h2>
                <div className="prose prose-lg max-w-none product-description break-words overflow-hidden">
                  {typeof product.description === "string" ? (
                    <div className="text-gray-700 leading-relaxed">
                      {product.description
                        .split("\n")
                        .map((paragraph, index) => (
                          <p
                            key={index}
                            className="mb-4 text-justify leading-relaxed break-words overflow-wrap-anywhere"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  ) : product.description &&
                    typeof product.description === "object" ? (
                    <div className="text-gray-700">
                      {documentToReactComponents(product.description)}
                    </div>
                  ) : (
                    <div className="text-gray-700">
                      <p>No description available</p>
                    </div>
                  )}
                </div>

                {/* Specifications */}
                {product.specification && product.specification.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                      Technical Specifications
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.specification.map(
                          (spec: any, index: number) => (
                            <div
                              key={index}
                              className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                            >
                              <span className="font-medium text-gray-900">
                                {spec.name || spec.key}
                              </span>
                              <span className="text-gray-600">
                                {spec.value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Get Technical Support
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-blue-900" />
                    <span>Direct engineer consultation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-900" />
                    <span>Fast response time</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-blue-900" />
                    <span>Quality Product</span>
                  </div>

                  <div className="pt-4 border-t">
                    <Link
                      href="https://api.whatsapp.com/send/?phone=6285210067755&text=Halo PJMOtomasi, saya membutuhkan informasi mengenai produk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-blue-900 hover:bg-blue-950 text-white mb-3">
                        Contact Our Team
                      </Button>
                    </Link>
                    <p className="text-xs text-gray-500 text-center mb-4">
                      Free consultation available
                    </p>
                  </div>

                  {/* Quick Contact */}
                  <div className="pt-4 border-t font-semibold">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Direct Contact:
                    </h4>
                    <div className="space-y-4">
                      <a
                        href={`tel:${SITE_CONFIG.company.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{SITE_CONFIG.company.phone}</span>
                      </a>
                      <a
                        href="https://api.whatsapp.com/send/?phone=6285210067755&text=Halo PJMOtomasi, saya membutuhkan informasi mengenai produk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>
                          {" "}
                          WhatsApp 1 : <br />
                          Iqbal - 085210067755
                        </span>
                      </a>
                      <a
                        href="https://api.whatsapp.com/send/?phone=6281112003634&text=Halo PJMOtomasi, saya membutuhkan informasi mengenai produk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-900 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>
                          {" "}
                          WhatsApp 2 : <br />
                          Tegar - 081112003634
                        </span>
                      </a>
                      <a
                        href={`mailto:${SITE_CONFIG.company.email}`}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{SITE_CONFIG.company.email}</span>
                      </a>
                      <br />
                      <h4 className="font-medium text-gray-900 mb-3">
                        PT. Prestasi Jaya Maju
                      </h4>
                      <br />
                      <a
                        href="https://maps.app.goo.gl/YJ238fdpCgSw1FzW7"
                        className="font-medium text-gray-900 mb-3"
                      >
                        Address :
                        <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-900 transition-colors">
                          <MapPin className="h-6 w-6" />
                          <span>{SITE_CONFIG.company.address}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {filteredRelated.length > 0 && (
            <div className="mt-16">
              <RelatedProducts products={filteredRelated} />
            </div>
          )}
        </div>
      </div>

      {/*CTA Section*/}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
        {/* Background Pattern */}
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

        <div className="px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Looking for Complete Automation Solutions?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Our engineering team can help you design complete automation
              systems with compatible components. Get consultation for your
              project requirements.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {/* Primary Button - Free System Design */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Settings className="h-5 w-5 mr-2" />
                <span>System Design Consultation</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </div>
              </Link>

              {/* Secondary Button - Request Quote */}
              <Link
                href="/quote"
                className="group relative inline-flex items-center justify-center px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <FileText className="h-5 w-5 mr-2" />
                <span>Request Custom Quote</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>

            {/* Contact Information Card */}
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
                  href="https://wa.me/6285210067755?text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation"
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
                      Iqbal - 085210067755
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
                  <div className="hidden sm:block w-1 h-1 bg-blue-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>8+ Years Experience</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-blue-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Certified Solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Note */}
            <p className="text-blue-100 text-sm mt-6 opacity-80">
              💡 For fastest response, use the floating WhatsApp button or call
              directly
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// Product Image Section Component
function ProductImageSection({ product }: { product: any }) {
  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-64 lg:h-80 w-full rounded-lg overflow-hidden bg-gray-100">
        {hasImages ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {product.feature && (
              <Badge className="bg-yellow-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            <Badge
              className={
                product.inStock
                  ? "bg-green-500 text-white"
                  : "bg-orange-500 text-white"
              }
            >
              {product.inStock ? "In Stock" : "Quote"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      {hasImages && product.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(1, 5).map((image: string, index: number) => (
            <div
              key={index}
              className="aspect-square relative bg-gray-100 rounded-md overflow-hidden"
            >
              <Image
                src={image}
                alt={`${product.name} view ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
