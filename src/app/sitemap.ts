/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/sitemap.ts - OPTIMIZED FOR ACTIVE DEVELOPMENT
import { MetadataRoute } from "next";
import { getProducts, getBlogPosts, getServices } from "@/lib/contentful";
import {
  SITE_CONFIG,
  PRODUCT_CATEGORIES,
  LOCATIONS,
  SERVICES,
} from "@/lib/contants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date().toISOString();

  try {
    // Fetch dynamic content with error handling - ADD SERVICES
    const [products, blogPosts, services] = await Promise.all([
      getProducts({ limit: 1000 }).catch(() => []),
      getBlogPosts(200).catch(() => []),
      getServices().catch(() => []), // ← ADD THIS
    ]);

    // Static pages with proper priorities and change frequencies
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: currentDate,
        changeFrequency: "daily", // ← KEEP DAILY for active updates
        priority: 0.95, // ← HIGHER PRIORITY
      },
      {
        url: `${baseUrl}/services`,
        lastModified: currentDate,
        changeFrequency: "daily", // ← CHANGED from "weekly" to "daily"
        priority: 0.9, // ← LOWER than individual service pages (was 0.95)
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/quote`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.8,
      },
    ];

    // Product category pages - LOWER than individual products
    const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map(
      (category) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: currentDate,
        changeFrequency: "daily" as const, // ← CHANGED from "weekly" to "daily"
        priority: 0.85, // ← LOWER than product pages (was 0.9)
      })
    );

    // Individual product pages - HIGH PRIORITY SEO GOLDMINE
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updateAt || currentDate,
      changeFrequency: "daily" as const, // ← DAILY for active updates
      priority: product.feature ? 0.95 : 0.92, // ← MUCH HIGHER (was 0.85/0.8)
    }));

    // DYNAMIC SERVICE PAGES from Contentful - HIGHEST SEO PRIORITY
    const dynamicServicePages: MetadataRoute.Sitemap = services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: service.updatedAt || currentDate, // Use actual update date
      changeFrequency: "daily" as const, // ← DAILY for active updates
      priority: service.featured ? 0.98 : 0.95, // ← HIGHEST PRIORITY (SEO weapon!)
    }));

    // Blog post pages - Safe handling of Contentful entries
    const blogPages: MetadataRoute.Sitemap = blogPosts
      .filter((post: any) => post?.fields?.slug)
      .map((post: any) => ({
        url: `${baseUrl}/blog/${post.fields.slug}`,
        lastModified: post.sys?.updatedAt || currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    // Location pages - Important for local SEO
    const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
      url: `${baseUrl}/location/${location.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Additional technical pages for SEO
    const technicalPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/faq`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: currentDate,
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: currentDate,
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
    ];

    // Brand-specific pages for better SEO - HIGHER PRIORITY
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
      changeFrequency: "daily" as const, // ← CHANGED from "weekly" to "daily"
      priority: 0.8, // ← HIGHER PRIORITY (was 0.75)
    }));

    // Combine all pages - PRIORITIZE DYNAMIC CONTENT
    const allPages = [
      ...staticPages,
      ...categoryPages,
      ...productPages,
      ...dynamicServicePages, // ← ONLY dynamic services from Contentful
      ...blogPages,
      ...locationPages,
      // Removed staticServicePages - all services are from Contentful now
      ...technicalPages,
      ...brandPages,
    ];

    // Remove duplicate service pages (in case of any overlaps)
    const uniquePages = allPages.filter((page, index, self) =>
      index === self.findIndex((p) => p.url === page.url)
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
        changeFrequency: "daily",
        priority: 0.95,
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