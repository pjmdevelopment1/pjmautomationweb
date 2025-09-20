/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/blog/[slug]/not-found.tsx
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Search,
  FileText,
  Mail,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/contants";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 mt-20">
      <div className="max-w-lg mx-auto text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-12 w-12 text-blue-900" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Blog Post Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the technical article or blog post you're
          looking for. It may have been moved, updated, or the link might be
          incorrect.
        </p>

        {/* Actions */}
        <div className="space-y-4 mb-8">
          <Button asChild className="w-full bg-blue-900 hover:bg-blue-950">
            <Link href="/blog">
              <FileText className="h-4 w-4 mr-2" />
              Browse All Articles
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Link>
          </Button>
        </div>

        {/* Help Section */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
            Looking for Technical Information?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Our engineering blog covers automation tutorials, troubleshooting
            guides, and technical insights from industry experts.
          </p>

          <div className="space-y-2">
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/contact">
                <Mail className="h-3 w-3 mr-2" />
                Request Technical Article
              </Link>
            </Button>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="text-left">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
            Popular Article Categories:
          </h4>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="secondary"
              asChild
              className="cursor-pointer hover:bg-blue-100"
            >
              <Link href="/blog?category=plc-programming">PLC Programming</Link>
            </Badge>
            <Badge
              variant="secondary"
              asChild
              className="cursor-pointer hover:bg-blue-100"
            >
              <Link href="/blog?category=hmi-development">HMI Development</Link>
            </Badge>
            <Badge
              variant="secondary"
              asChild
              className="cursor-pointer hover:bg-blue-100"
            >
              <Link href="/blog?category=troubleshooting">Troubleshooting</Link>
            </Badge>
            <Badge
              variant="secondary"
              asChild
              className="cursor-pointer hover:bg-blue-100"
            >
              <Link href="/blog?category=automation-tips">Automation Tips</Link>
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <Link
              href="/blog?tag=beginner"
              className="block text-blue-600 hover:text-blue-700 hover:underline"
            >
              • Beginner-Friendly Tutorials
            </Link>
            <Link
              href="/blog?tag=advanced"
              className="block text-blue-600 hover:text-blue-700 hover:underline"
            >
              • Advanced Technical Guides
            </Link>
            <Link
              href="/blog?tag=safety"
              className="block text-blue-600 hover:text-blue-700 hover:underline"
            >
              • Safety & Compliance Articles
            </Link>
            <Link
              href="/blog?tag=industry-insights"
              className="block text-blue-600 hover:text-blue-700 hover:underline"
            >
              • Industry Insights & Trends
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-6 p-3 bg-gray-50 rounded border text-sm text-gray-600">
          <Search className="h-4 w-4 inline mr-1" />
          Try searching for specific topics like "PLC troubleshooting" or "HMI
          design"
        </div>
      </div>
    </div>
  );
}
