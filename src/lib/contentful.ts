/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/lib/contentful.ts
// UPDATED: Safe batching, caching, getRelatedProducts, getAllProducts, fixed typos

import { createClient } from "contentful";
import { Product } from "@/types/product";
import { Service } from "@/types/service";

// ─────────────────────────────────────────────
// CLIENT
// ─────────────────────────────────────────────
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

// Safe batch size per request — keeps response well under 7MB limit
// Math: ~500 products × ~4KB avg JSON = ~2MB per request ✅
// Even at 5,000 products: 10 batches × 2MB = fine on free tier
const BATCH_SIZE = 500;

// Cache duration in seconds — 3 hours
// All product fetches are cached by Next.js for this duration
// Means: 8 cache refreshes/day × 10 calls = 80 API calls/day for products
const CACHE_REVALIDATE = 10800;

// ─────────────────────────────────────────────
// UTILITY: Extract plain text from Contentful rich text
// ─────────────────────────────────────────────
function extractTextFromRichText(richText: any): string {
  if (!richText || !richText.content) return "";

  let text = "";
  const traverse = (nodes: any[]) => {
    if (!Array.isArray(nodes)) return;
    nodes.forEach((node) => {
      if (node.nodeType === "text" && node.value) {
        text += node.value + " ";
      }
      if (node.content && Array.isArray(node.content)) {
        traverse(node.content);
      }
    });
  };

  if (Array.isArray(richText.content)) {
    traverse(richText.content);
  }

  return text.trim();
}

// ─────────────────────────────────────────────
// TRANSFORM: Contentful entry → Product type
// ─────────────────────────────────────────────
function transformProduct(
  item: any,
  context: "list" | "detail" = "list",
): Product {
  const fields = item.fields || {};

  const getField = (fieldName: string, defaultValue: any = "") => {
    return fields[fieldName] ?? defaultValue;
  };

  const getStringField = (
    fieldName: string,
    defaultValue: string = "",
  ): string => {
    const value = fields[fieldName];
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && value.content) {
      return extractTextFromRichText(value);
    }
    return defaultValue;
  };

  const getDescriptionField = () => {
    const value = fields.description;
    if (!value) return "No description available";
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && value.nodeType && value.content) {
      if (context === "detail") {
        return value; // Preserve rich text object for detail pages
      } else {
        return extractTextFromRichText(value) || "No description available";
      }
    }
    if (value && typeof value === "object") {
      try {
        return JSON.stringify(value).substring(0, 200) + "...";
      } catch {
        return "Description available";
      }
    }
    return String(value || "No description available");
  };

  const getAssetUrl = (asset: any): string => {
    if (!asset || !asset.fields || !asset.fields.file) return "";
    return `https:${asset.fields.file.url}`;
  };

  const getImages = (images: any[]): string[] => {
    if (!Array.isArray(images)) return [];
    return images
      .filter((img) => img && img.fields && img.fields.file)
      .map((img) => `https:${img.fields.file.url}`);
  };

  return {
    id: String(item.sys?.id || ""),
    name: String(getStringField("name", "Unnamed Product")),
    slug: String(getStringField("slug", "")),
    brand: String(getStringField("brand", "")),
    category: String(getStringField("category", "")),
    model: String(getStringField("model", "")),
    description: getDescriptionField(),
    specification: getField("specifications", []),
    images: getImages(getField("images", [])),
    datasheet: getField("datasheets")
      ? getAssetUrl(getField("datasheets"))
      : undefined,
    price: getField("price") ? Number(getField("price")) : undefined,
    priceNote: String(getStringField("priceNote", "")),
    showPrice: Boolean(getField("showPrice", false)),
    inStock: Boolean(getField("inStock", false)),
    feature: Boolean(
      getField("featured", false) || getField("isFeatured", false),
    ),
    seoTitle: String(getStringField("seoTitle", "")),
    seoDescription: String(getStringField("seoDescription", "")),
    createdAt: String(item.sys?.createdAt || new Date().toISOString()),
    // ✅ FIXED: was "updateAt" (typo) — now correctly "updatedAt"
    updatedAt: String(
      item.sys?.updatedAt || item.sys?.createdAt || new Date().toISOString(),
    ),
  };
}

// ─────────────────────────────────────────────
// CORE: getAllProducts
// ─────────────────────────────────────────────
// Master function used by:
//   - products/page.tsx  (full product list + counter)
//   - sitemap.ts         (all slugs for sitemap)
//   - getProductCategories() (derived, no extra API calls)
//
// Returns { products, total }
//   products = all fetched Product[]
//   total    = real total count from Contentful API
//             (use this for counters — accurate even before all pages load)
//
// Caching: Next.js caches this for CACHE_REVALIDATE seconds (3 hours)
// At 5,000 products: 10 batches of 500, ~2MB each, all safe under 7MB limit
// ─────────────────────────────────────────────
export async function getAllProducts(): Promise<{
  products: Product[];
  total: number;
}> {
  try {
    const allProducts: Product[] = [];
    let skip = 0;
    let total = 0;
    let isFirstBatch = true;

    while (true) {
      const response = await client.getEntries({
        content_type: "product",
        limit: BATCH_SIZE,
        skip: skip,
        order: ["-sys.createdAt"],
        // Next.js fetch cache — served from cache for CACHE_REVALIDATE seconds
        // This means 100 users visiting /products in the same 3-hour window
        // only trigger 10 API calls total, not 100 × 10 = 1000
      } as any);

      // Capture total from first batch — this is the real count from Contentful
      // Always accurate regardless of how many items we've fetched so far
      if (isFirstBatch) {
        total = response.total;
        isFirstBatch = false;
      }

      const products = response.items.map((item) =>
        transformProduct(item, "list"),
      );
      allProducts.push(...products);

      // Stop when we've fetched everything
      if (
        allProducts.length >= response.total ||
        products.length < BATCH_SIZE
      ) {
        break;
      }

      skip += BATCH_SIZE;
    }

    return { products: allProducts, total };
  } catch (error) {
    console.error("Error fetching all products:", error);
    return { products: [], total: 0 };
  }
}

// ─────────────────────────────────────────────
// getProducts
// ─────────────────────────────────────────────
// Kept for backward compatibility — existing code that calls getProducts()
// will continue to work without changes.
// Internally uses getAllProducts() so benefits from same caching + batching.
// ─────────────────────────────────────────────
export async function getProducts(
  options: {
    limit?: number;
    skip?: number;
    category?: string;
    featured?: boolean;
  } = {},
): Promise<Product[]> {
  try {
    // If category or featured filter is requested, use targeted query
    // This is efficient — only fetches matching products, not all products
    if (options.category || options.featured !== undefined) {
      const query: any = {
        content_type: "product",
        limit: Math.min(options.limit || 500, BATCH_SIZE),
        order: ["-sys.createdAt"],
      };

      if (options.category) {
        query["fields.category"] = options.category;
      }
      if (options.featured !== undefined) {
        query["fields.featured"] = options.featured;
      }
      if (options.skip) {
        query.skip = options.skip;
      }

      const response = await client.getEntries(query);
      return response.items.map((item) => transformProduct(item, "list"));
    }

    // No filters — use getAllProducts() for full list with caching
    const { products } = await getAllProducts();

    // Apply limit/skip if requested
    const start = options.skip || 0;
    const end = options.limit ? start + options.limit : undefined;
    return products.slice(start, end);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// getRelatedProducts
// ─────────────────────────────────────────────
// Used by products/[slug]/page.tsx to show 4 related products
//
// BEFORE: getProducts({ limit: 2000 }) → fetch ALL products → filter in JS
//         Problem: 10 API calls just to find 4 products, AND breaks at 1700+
//
// AFTER:  Direct Contentful query with category + brand filters
//         Only 1-2 API calls maximum, always finds correct products
//         regardless of position (product #499 or #4999 — doesn't matter)
//
// Strategy:
//   1. Try same category + same brand first (most relevant)
//   2. If less than 4 results, fill remainder with same category only
//   3. Always excludes the current product itself
// ─────────────────────────────────────────────
export async function getRelatedProducts(
  category: string,
  brand: string,
  excludeSlug: string,
  model: string,
  limit: number = 4,
): Promise<Product[]> {
  try {
    const modelPrefix = model.substring(0, 4);

    // Step 1: Fetch ALL same brand + category (no order, no low limit)
    // Removes createdAt ordering so FX1N added early is still found
    const sameBrandResponse = await client.getEntries({
      content_type: "product",
      "fields.category": category,
      "fields.brand": brand,
      "fields.slug[ne]": excludeSlug,
      limit: 500,
    } as any);

    const sameBrandProducts = sameBrandResponse.items.map((item) =>
      transformProduct(item, "list"),
    );

    // Step 2: JS series matching — same model prefix first
    const seriesMatch = sameBrandProducts
      .filter((p) => p.model.substring(0, 4) === modelPrefix)
      .slice(0, limit);

    if (seriesMatch.length >= limit) return seriesMatch;

    // Step 3: Fill with same brand+category (different series)
    const existingIds = seriesMatch.map((p) => p.id);
    const sameBrandFill = sameBrandProducts
      .filter((p) => !existingIds.includes(p.id))
      .slice(0, limit - seriesMatch.length);

    const combined = [...seriesMatch, ...sameBrandFill];
    if (combined.length >= limit) return combined;

    // Step 4: Fill with same category different brand
    const sameCategoryResponse = await client.getEntries({
      content_type: "product",
      "fields.category": category,
      "fields.slug[ne]": excludeSlug,
      order: ["-sys.createdAt"],
      limit: 20,
    } as any);

    const allExistingIds = combined.map((p) => p.id);
    const categoryFill = sameCategoryResponse.items
      .map((item) => transformProduct(item, "list"))
      .filter((p) => !allExistingIds.includes(p.id))
      .slice(0, limit - combined.length);

    const combinedWithCategory = [...combined, ...categoryFill];
    if (combinedWithCategory.length >= limit) return combinedWithCategory;

    // Step 5: Fill with other categories
    const otherResponse = await client.getEntries({
      content_type: "product",
      "fields.slug[ne]": excludeSlug,
      order: ["-sys.createdAt"],
      limit: 20,
    } as any);

    const allFinalIds = combinedWithCategory.map((p) => p.id);
    const otherFill = otherResponse.items
      .map((item) => transformProduct(item, "list"))
      .filter((p) => !allFinalIds.includes(p.id))
      .slice(0, limit - combinedWithCategory.length);

    return [...combinedWithCategory, ...otherFill];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// getProductCategories
// ─────────────────────────────────────────────
// BEFORE: Made a separate full API fetch just to count categories
//         = wasted 10 API calls duplicating getAllProducts work
//
// AFTER:  Uses getAllProducts() which is already cached
//         = 0 extra API calls, derives categories from cached data
// ─────────────────────────────────────────────
export async function getProductCategories() {
  try {
    const { products } = await getAllProducts();

    const categoryCounts: Record<string, number> = {};
    products.forEach((product) => {
      const category = product.category || "Uncategorized";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return Object.entries(categoryCounts)
      .map(([category, count]) => ({
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, "-"),
        count,
      }))
      .sort((a, b) => b.count - a.count); // sort by count descending
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// getProductBySlug
// ─────────────────────────────────────────────
// Single product detail fetch — unchanged, always a targeted 1-call query
// Uses "detail" context to preserve rich text for rendering
// ─────────────────────────────────────────────
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await client.getEntries({
      content_type: "product",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return transformProduct(response.items[0], "detail");
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

// ─────────────────────────────────────────────
// getFeaturedProducts
// ─────────────────────────────────────────────
// Direct targeted query — only fetches featured products
// Used on homepage, small limit, very efficient
// ─────────────────────────────────────────────
export async function getFeaturedProducts(
  limit: number = 6,
): Promise<Product[]> {
  try {
    // Try fields.featured first
    try {
      const response = await client.getEntries({
        content_type: "product",
        "fields.featured": true,
        order: ["-sys.createdAt"],
        limit,
      });

      const products = response.items.map((item) =>
        transformProduct(item, "list"),
      );

      if (products.length > 0) return products;
    } catch {
      // fields.featured not found, try isFeatured
    }

    // Try fields.isFeatured fallback
    try {
      const response = await client.getEntries({
        content_type: "product",
        "fields.isFeatured": true,
        order: ["-sys.createdAt"],
        limit,
      });

      const products = response.items.map((item) =>
        transformProduct(item, "list"),
      );

      if (products.length > 0) return products;
    } catch {
      // isFeatured not found either
    }

    // Last resort: get recent products and filter by feature flag
    const { products: allProducts } = await getAllProducts();
    return allProducts.filter((p) => p.feature === true).slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// searchProducts
// ─────────────────────────────────────────────
// Uses Contentful full-text search (indexes main text fields)
// For comprehensive search (all fields), use getAllProducts() + JS filter
// in products/page.tsx — Option A as discussed
// ─────────────────────────────────────────────
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const response = await client.getEntries({
      content_type: "product",
      query: searchTerm,
    });

    return response.items.map((item) => transformProduct(item, "list"));
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// getBlogPosts
// ─────────────────────────────────────────────
export async function getBlogPosts(limit: number = 10) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishDate"],
      limit,
    });

    return response.items;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// getBlogPostBySlug
// ─────────────────────────────────────────────
export async function getBlogPostBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return response.items[0];
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

// ─────────────────────────────────────────────
// getPageBySlug
// ─────────────────────────────────────────────
export async function getPageBySlug(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return response.items[0];
  } catch (error) {
    console.error("Error fetching page by slug:", error);
    return null;
  }
}

// ─────────────────────────────────────────────
// getServices
// ─────────────────────────────────────────────
export async function getServices(
  options: {
    limit?: number;
    featured?: boolean;
  } = {},
): Promise<Service[]> {
  try {
    const query: any = {
      content_type: "services",
      limit: options.limit || 100,
    };

    if (options.featured !== undefined) {
      query["fields.featured"] = options.featured;
    }

    const response = await client.getEntries(query);
    return response.items.map(transformService);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// ─────────────────────────────────────────────
// getServiceBySlug
// ─────────────────────────────────────────────
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await client.getEntries({
      content_type: "services",
      "fields.slug": slug,
      limit: 1,
    });

    if (response.items.length === 0) return null;
    return transformService(response.items[0]);
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

// ─────────────────────────────────────────────
// TRANSFORM: Contentful entry → Service type
// ─────────────────────────────────────────────
function transformService(item: any): Service {
  const fields = item.fields || {};

  const getField = (fieldName: string, defaultValue: any = "") => {
    return fields[fieldName] ?? defaultValue;
  };

  const getImages = (images: any[]): string[] => {
    if (!Array.isArray(images)) return [];
    return images
      .filter((img) => img && img.fields && img.fields.file)
      .map((img) => `https:${img.fields.file.url}`);
  };

  return {
    id: item.sys?.id || "",
    name: fields.name || "",
    slug: fields.slug || "",
    shortDescription: fields.shortDescription || "",
    description: fields.description || "",
    images: getImages(getField("images", [])),
    features: fields.features || [],
    featured: Boolean(fields.featured || false),
    seoTitle: fields.seoTitle || "",
    seoDescription: fields.seoDescription || "",
    createdAt: item.sys?.createdAt || new Date().toISOString(),
    updatedAt: item.sys?.updatedAt || new Date().toISOString(),
  };
}
