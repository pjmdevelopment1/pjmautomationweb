/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// src/app/blog/page.tsx - COMPLETE BLOG PAGE WITH FIXES
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  MessageSquare,
  Mail,
  Phone,
  Package,
  Headphones,
} from "lucide-react";
import { getBlogPosts } from "@/lib/contentful";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/common/Breadcrumb";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { getCanonicalUrl } from "@/lib/url";
import { SITE_CONFIG } from "@/lib/contants";

export const metadata: Metadata = {
  title: "Technical Blog & Automation Guides | Mederi Karya Indonesia",
  description:
    "Expert insights on industrial automation: PLC programming tutorials, troubleshooting guides, parameter setting tips, and engineering best practices from MKI team.",
  keywords: [
    "automation blog indonesia",
    "plc programming tutorial",
    "automation troubleshooting guide",
    "technical blog automation",
    "engineering insights indonesia",
    "parameter setting guide",
    "automation best practices",
    "industrial automation tips",
  ],
  openGraph: {
    title: "Technical Blog & Automation Guides | MKI",
    description: "Expert engineering insights and automation tutorials",
    url: "/blog",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl("/blog"),
  },
};

// Helper function to safely extract fields from Contentful entry
function extractBlogFields(entry: any) {
  if (!entry || !entry.fields) {
    return null;
  }

  const fields = entry.fields;
  const sys = entry.sys || {};

  return {
    title: fields.title || "Untitled Post",
    slug: fields.slug || "",
    excerpt: fields.excerpt || "",
    featuredImage: fields.featuredImage
      ? {
          url: fields.featuredImage.fields?.file?.url
            ? `https:${fields.featuredImage.fields.file.url}`
            : null,
          title: fields.featuredImage.fields?.title || "",
          width:
            fields.featuredImage.fields?.file?.details?.image?.width || 400,
          height:
            fields.featuredImage.fields?.file?.details?.image?.height || 300,
        }
      : null,
    author: fields.author || "MKI Engineering Team",
    publishDate: fields.publishDate || sys.createdAt,
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    category: fields.category || "Technical Guide",
    readingTime: fields.readingTime || 5,
  };
}

// Calculate reading time from excerpt
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(" ").length;
  return Math.ceil(wordCount / wordsPerMinute) || 5;
}

// Main page component
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string; category?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 6;

  try {
    const rawPosts = await getBlogPosts(100);
    const posts = rawPosts
      .map(extractBlogFields)
      .filter(Boolean) as NonNullable<ReturnType<typeof extractBlogFields>>[];

    // Filter by tag or category if provided
    let filteredPosts = posts;
    if (params.tag) {
      filteredPosts = posts.filter((post) =>
        post.tags.some((tag: string) =>
          tag.toLowerCase().includes(params.tag!.toLowerCase())
        )
      );
    }
    if (params.category) {
      filteredPosts = posts.filter((post) =>
        post.category.toLowerCase().includes(params.category!.toLowerCase())
      );
    }

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + pageSize
    );

    // Helper for pagination URLs
    const getPaginationUrl = (page: number) => {
      if (page < 1 || page > totalPages) return "/blog";
      const urlParams = new URLSearchParams();
      if (page > 1) urlParams.set("page", page.toString());
      if (params.tag) urlParams.set("tag", params.tag);
      if (params.category) urlParams.set("category", params.category);
      return urlParams.toString() ? `/blog?${urlParams.toString()}` : "/blog";
    };

    return (
      <>
        {/* Header Section with Breadcrumb */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-950 py-16 text-white mt-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb inside header */}
            <div className="mb-8">
              <Breadcrumb
                items={[
                  { name: "Home", url: "/" },
                  { name: "Blog", url: "/blog" },
                ]}
                className="[&_a]:text-blue-200 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-blue-200"
              />
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Technical Blog & Automation Guides
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Expert insights, tutorials, and troubleshooting guides from our
                engineering team. Stay updated with the latest automation
                technologies and best practices.
              </p>

              {/* Active filters display */}
              {(params.tag || params.category) && (
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-sm text-blue-200">Filtered by:</span>
                  {params.tag && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-white/10 text-white border-white/20"
                    >
                      Tag: {params.tag}
                      <Link href="/blog" className="hover:text-red-300">
                        ×
                      </Link>
                    </Badge>
                  )}
                  {params.category && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-white/10 text-white border-white/20"
                    >
                      Category: {params.category}
                      <Link href="/blog" className="hover:text-red-300">
                        ×
                      </Link>
                    </Badge>
                  )}
                </div>
              )}

              <div className="text-lg text-white/90">
                {totalPosts} article{totalPosts !== 1 ? "s" : ""} available
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid - Card Layout */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {paginatedPosts.length > 0 ? (
              <div className="grid gap-6 max-w-4xl mx-auto">
                {paginatedPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    No articles found
                  </h3>
                  <p className="text-gray-600 mb-8">
                    We couldn't find any articles matching your criteria.
                  </p>
                  <Button asChild>
                    <Link href="/blog">View All Articles</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages} ({totalPosts} articles)
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <Link
                    href={getPaginationUrl(currentPage - 1)}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      currentPage === 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Link>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Link
                          key={pageNum}
                          href={getPaginationUrl(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-blue-900 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <Link
                    href={getPaginationUrl(currentPage + 1)}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      currentPage === totalPages
                        ? "border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Full CTA Section - Blog Page Style */}
        <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Need Technical Support?
              </h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Our engineering team provides direct technical consultation and
                troubleshooting services for your automation projects.
              </p>

              {/* Two Enhanced Buttons with proper spacing */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Headphones className="h-5 w-5 mr-2" />
                  <span>Contact Engineers</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>
                </Link>

                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Package className="h-5 w-5 mr-2" />
                  <span>Browse Products</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>
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
                    href="https://wa.me/6285210067755?text=Halo Mederi Karya, saya membutuhkan technical support untuk automation"
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
            </div>
          </div>
        </section>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Mederi Karya Indonesia Technical Blog",
              description: "Technical insights and automation guides",
              url: "/blog",
              publisher: {
                "@type": "Organization",
                name: "Mederi Karya Indonesia",
              },
              blogPost: paginatedPosts.slice(0, 10).map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishDate,
                author: {
                  "@type": "Organization",
                  name: post.author,
                },
                url: `/blog/${post.slug}`,
              })),
            }),
          }}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);

    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Currently Unavailable
          </h1>
          <p className="text-gray-600 mb-8">
            We're experiencing technical difficulties. Please try again later.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }
}

// Blog Post Card Component - FIXED MOBILE LAYOUT
function BlogPostCard({
  post,
}: {
  post: NonNullable<ReturnType<typeof extractBlogFields>>;
}) {
  const readingTime = post.readingTime || calculateReadingTime(post.excerpt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden md:h-80" // FIXED: h-80 only on desktop
    >
      <div className="flex flex-col md:flex-row md:h-full">
        {" "}
        {/* FIXED: Always flex-col on mobile */}
        {/* Image Section - Top on Mobile, Left on Desktop */}
        <div className="w-full md:w-80 md:flex-shrink-0">
          {" "}
          {/* FIXED: Full width on mobile */}
          <div className="aspect-video md:aspect-square relative bg-gray-100">
            {" "}
            {/* FIXED: aspect-video on mobile */}
            {post.featuredImage?.url ? (
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.title || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <span className="text-sm">No Image</span>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Content Section - Bottom on Mobile, Right on Desktop */}
        <div className="flex-1 p-6 md:flex md:flex-col">
          {" "}
          {/* FIXED: flex-col only on desktop */}
          {/* Category Badge */}
          <div className="mb-3">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          </div>
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors">
            {post.title}
          </h2>
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed md:flex-grow">
              {" "}
              {/* FIXED: flex-grow only on desktop */}
              {post.excerpt}
            </p>
          )}
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          {/* Meta Info & Read More */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:mt-auto">
            {" "}
            {/* FIXED: flex-col on mobile, mt-auto only on desktop */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readingTime} min read</span>
              </div>
            </div>
            {/* Read More Link */}
            <span className="inline-flex items-center text-blue-800 font-medium text-sm group-hover:text-blue-950 sm:flex-shrink-0">
              Read More
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
