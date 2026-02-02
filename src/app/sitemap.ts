/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/sitemap.ts - OPTIMIZED FOR SEO + API EFFICIENCY
import { MetadataRoute } from "next";
import { getProducts, getBlogPosts, getServices } from "@/lib/contentful";
import {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  LOCATIONS,
  SERVICES,
} from "@/lib/contants";

// ✅ OPTIMIZED: Changed from 86400 (daily) to 604800 (weekly)
// WHY: Sitemap structure doesn't change daily, only content does
// Google will still crawl based on individual page frequencies
export const revalidate = 604800; // 7 days

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date().toISOString();

  try {
    // Fetch dynamic content with error handling
    const [products, blogPosts, services] = await Promise.all([
      getProducts({ limit: 2000 }).catch(() => []),
      getBlogPosts(200).catch(() => []),
      getServices().catch(() => []),
    ]);

    // ═══════════════════════════════════════════════════════════════
    // STATIC PAGES - Core website pages
    // ═══════════════════════════════════════════════════════════════
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: "weekly", // ✅ OPTIMIZED - Product pages are the SEO weapons, not homepage
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: currentDate,
        changeFrequency: "weekly", // ✅ OPTIMIZED - Individual product pages get the traffic, not listing
        priority: 0.95,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: currentDate,
        changeFrequency: "monthly", // ✅ OPTIMIZED: Services don't change often
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: "monthly", // ✅ GOOD - Rarely changes
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: "monthly", // ✅ GOOD - Rarely changes
        priority: 0.8,
      },
      {
        url: `${baseUrl}/quote`,
        lastModified: currentDate,
        changeFrequency: "monthly", // ✅ OPTIMIZED: Form page doesn't change
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: "weekly", // ✅ OPTIMIZED: Blog listing changes when new posts added
        priority: 0.8,
      },
    ];

    // ═══════════════════════════════════════════════════════════════
    // CATEGORY PAGES - Product categories
    // ═══════════════════════════════════════════════════════════════
    const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map(
      (category) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const, // ✅ OPTIMIZED: Was "daily", now "weekly"
        // WHY: Categories get new products, but not every day
        priority: 0.85,
      })
    );

    // ═══════════════════════════════════════════════════════════════
    // INDIVIDUAL PRODUCT PAGES - Your 1564 product pages
    // ═══════════════════════════════════════════════════════════════
    const productPages: MetadataRoute.Sitemap = products.map((product) => {
      // ✅ SMART LOGIC: New products get "weekly", old products get "monthly"
      const productAge = new Date().getTime() - new Date(product.createdAt).getTime();
      const isNewProduct = productAge < 30 * 24 * 60 * 60 * 1000; // Less than 30 days old
      
      return {
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: product.updateAt || currentDate,
        // ✅ OPTIMIZED: New products = weekly, old products = monthly
        // WHY: New products may get updates, old products are stable
        changeFrequency: isNewProduct ? "weekly" : "monthly" as const,
        priority: product.feature ? 0.95 : 0.92,
      };
    });

    // ═══════════════════════════════════════════════════════════════
    // SERVICE PAGES - Individual service pages
    // ═══════════════════════════════════════════════════════════════
    const dynamicServicePages: MetadataRoute.Sitemap = services.map(
      (service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt || currentDate,
        changeFrequency: "monthly" as const, // ✅ OPTIMIZED: Was "daily", now "monthly"
        // WHY: Services are stable, don't change often
        priority: service.featured ? 0.98 : 0.95,
      })
    );

    // ═══════════════════════════════════════════════════════════════
    // BLOG PAGES - Blog posts
    // ═══════════════════════════════════════════════════════════════
    const blogPages: MetadataRoute.Sitemap = blogPosts
      .filter((post: any) => post?.fields?.slug)
      .map((post: any) => ({
        url: `${baseUrl}/blog/${post.fields.slug}`,
        lastModified: post.sys?.updatedAt || currentDate,
        changeFrequency: "yearly" as const, // ✅ OPTIMIZED: Published posts rarely change
        priority: 0.6,
      }));

    // ═══════════════════════════════════════════════════════════════
    // LOCATION PAGES - City/region pages
    // ═══════════════════════════════════════════════════════════════
    const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
      url: `${baseUrl}/location/${location.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const, // ✅ GOOD - Location info stable
      priority: 0.7,
    }));

    // ═══════════════════════════════════════════════════════════════
    // TECHNICAL PAGES - Legal/info pages
    // ═══════════════════════════════════════════════════════════════
    const technicalPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/faq`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const, // ✅ GOOD
        priority: 0.6,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: currentDate,
        changeFrequency: "yearly" as const, // ✅ GOOD - Legal pages rarely change
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: currentDate,
        changeFrequency: "yearly" as const, // ✅ GOOD
        priority: 0.3,
      },
    ];

    // ═══════════════════════════════════════════════════════════════
    // BRAND PAGES - Brand-specific product listings
    // ═══════════════════════════════════════════════════════════════
    const brandPages: MetadataRoute.Sitemap = [
      "mitsubishi",
      "schneider",
      "siemens",
      "omron",
      "fuji",
      "ls",
      "proface",
      "keyence",
    ].map((brand) => ({
      url: `${baseUrl}/products?brand=${brand}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const, // ✅ OPTIMIZED: Was "daily", now "weekly"
      // WHY: Brand pages get new products weekly, not daily
      priority: 0.8,
    }));

    // ═══════════════════════════════════════════════════════════════
    // COMBINE ALL PAGES
    // ═══════════════════════════════════════════════════════════════
    const allPages = [
      ...staticPages,
      ...categoryPages,
      ...productPages,
      ...dynamicServicePages,
      ...blogPages,
      ...locationPages,
      ...technicalPages,
      ...brandPages,
    ];

    // Remove duplicate URLs (if any)
    const uniquePages = allPages.filter(
      (page, index, self) => index === self.findIndex((p) => p.url === page.url)
    );

    // Sort by priority (highest first) for better crawling
    return uniquePages.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return minimal sitemap on error
    return [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.95,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  }
}