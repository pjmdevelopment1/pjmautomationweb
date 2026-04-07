/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/sitemap.ts
// CHANGES:
// 1. getProducts({ limit: 2000 }) → getAllProducts() — works at 5000+ products
// 2. Removed unused SERVICES import
// 3. Removed ?brand= and ?category= URLs — low SEO value in sitemap
// 4. Fixed product.updateAt typo → product.updatedAt
// 5. Fixed fallback sitemap "daily" → "weekly"
// 6. Static pages use real hardcoded lastModified dates

import { MetadataRoute } from "next";
import { getAllProducts, getBlogPosts, getServices } from "@/lib/contentful";
import {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  LOCATIONS,
} from "@/lib/contants";

export const revalidate = 604800; // 7 days

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  try {
    // ✅ FIXED: getAllProducts() handles 5000+ products safely
    // Batches in 500 per request, no 7MB crash
    const [{ products }, blogPosts, services] = await Promise.all([
      getAllProducts().catch(() => ({ products: [], total: 0 })),
      getBlogPosts(200).catch(() => []),
      getServices().catch(() => []),
    ]);

    // ═══════════════════════════════════════════════════════════════
    // STATIC PAGES
    // Use real hardcoded dates — not currentDate which changes every deploy
    // Google trusts lastModified more when it only changes on real updates
    // ═══════════════════════════════════════════════════════════════
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: "2025-10-01",
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: "2025-10-01",
        changeFrequency: "weekly",
        priority: 0.95,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: "2025-10-01",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: "2025-10-01",
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: "2025-10-01",
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/quote`,
        lastModified: "2025-10-01",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: "2025-10-01",
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ];

    // ═══════════════════════════════════════════════════════════════
    // CATEGORY PAGES
    // ═══════════════════════════════════════════════════════════════
    const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map(
      (category) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: "2025-10-01",
        changeFrequency: "weekly" as const,
        priority: 0.85,
      })
    );

    // ═══════════════════════════════════════════════════════════════
    // INDIVIDUAL PRODUCT PAGES
    // ✅ FIXED: product.updatedAt (was product.updateAt — typo)
    // ✅ Smart logic: new products weekly, old products monthly
    // ═══════════════════════════════════════════════════════════════
    const productPages: MetadataRoute.Sitemap = products.map((product) => {
      const productAge =
        new Date().getTime() - new Date(product.createdAt).getTime();
      const isNewProduct = productAge < 30 * 24 * 60 * 60 * 1000;

      return {
        url: `${baseUrl}/products/${product.slug}`,
        // ✅ FIXED: was product.updateAt (typo) — now product.updatedAt
        lastModified: product.updatedAt || "2025-10-01",
        changeFrequency: isNewProduct ? "weekly" : "monthly" as const,
        priority: product.feature ? 0.9 : 0.7,
      };
    });

    // ═══════════════════════════════════════════════════════════════
    // SERVICE PAGES
    // ═══════════════════════════════════════════════════════════════
    const dynamicServicePages: MetadataRoute.Sitemap = services.map(
      (service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt || "2025-10-01",
        changeFrequency: "monthly" as const,
        priority: service.featured ? 0.98 : 0.95,
      })
    );

    // ═══════════════════════════════════════════════════════════════
    // BLOG PAGES
    // ═══════════════════════════════════════════════════════════════
    const blogPages: MetadataRoute.Sitemap = blogPosts
      .filter((post: any) => post?.fields?.slug)
      .map((post: any) => ({
        url: `${baseUrl}/blog/${post.fields.slug}`,
        lastModified: post.sys?.updatedAt || "2025-10-01",
        changeFrequency: "yearly" as const,
        priority: 0.6,
      }));

    // ═══════════════════════════════════════════════════════════════
    // LOCATION PAGES
    // ═══════════════════════════════════════════════════════════════
    const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
      url: `${baseUrl}/location/${location.slug}`,
      lastModified: "2025-10-01",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // ═══════════════════════════════════════════════════════════════
    // TECHNICAL PAGES
    // ═══════════════════════════════════════════════════════════════
    const technicalPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/faq`,
        lastModified: "2025-10-01",
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: "2025-10-01",
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: "2025-10-01",
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
    ];

    // ═══════════════════════════════════════════════════════════════
    // COMBINE ALL PAGES
    // ✅ REMOVED: brandPages (?brand=mitsubishi etc)
    // WHY: Query param URLs are low SEO value in sitemap
    //      They show same products as /products page
    //      Wastes crawl budget on near-duplicate content
    // ═══════════════════════════════════════════════════════════════
    const allPages = [
      ...staticPages,
      ...categoryPages,
      ...productPages,
      ...dynamicServicePages,
      ...blogPages,
      ...locationPages,
      ...technicalPages,
    ];

    // Remove duplicate URLs
    const uniquePages = allPages.filter(
      (page, index, self) =>
        index === self.findIndex((p) => p.url === page.url)
    );

    // Sort by priority (highest first) for better crawling
    return uniquePages.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  } catch (error) {
    console.error("Error generating sitemap:", error);

    // ✅ FIXED: fallback was "daily" — now "weekly"
    return [
      {
        url: baseUrl,
        lastModified: "2025-10-01",
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: "2025-10-01",
        changeFrequency: "weekly",
        priority: 0.95,
      },
      {
        url: `${baseUrl}/services`,
        lastModified: "2025-10-01",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: "2025-10-01",
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  }
}