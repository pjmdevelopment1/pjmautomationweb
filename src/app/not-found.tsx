/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/not-found.tsx - Global 404 page
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Search,
  Home,
  Package,
  Settings,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/contants";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with company branding */}
      <div className="pt-40 pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            {/* 404 Visual */}
            <div className="relative mb-8">
              <div className="text-8xl font-bold text-gray-200 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let
              us help you find what you need.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Homepage
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Explore Our Automation Solutions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Products Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Products</h3>
              <p className="text-sm text-gray-600 mb-4">
                Browse our extensive catalog of automation parts, PLCs, HMIs,
                and industrial components.
              </p>
              <div className="space-y-2">
                <Link
                  href="/products"
                  className="flex items-center text-sm text-teal-600 hover:text-teal-700"
                >
                  All Products <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                <Link
                  href="/products?category=plc"
                  className="flex items-center text-sm text-teal-600 hover:text-teal-700"
                >
                  PLC Systems <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                <Link
                  href="/products?category=hmi"
                  className="flex items-center text-sm text-teal-600 hover:text-teal-700"
                >
                  HMI Displays <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
              <p className="text-sm text-gray-600 mb-4">
                Professional engineering services, technical support, and custom
                automation solutions.
              </p>
              <div className="space-y-2">
                <Link
                  href="/services"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  All Services <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                <Link
                  href="/services#plc-programming"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  PLC Programming <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                <Link
                  href="/services#system-integration"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                >
                  System Integration <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>

            {/* Technical Blog Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Technical Blog
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Expert insights, tutorials, and troubleshooting guides from our
                engineering team.
              </p>
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                >
                  All Articles <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                <Link
                  href="/blog?category=tutorials"
                  className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                >
                  Tutorials <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                <Link
                  href="/blog?category=troubleshooting"
                  className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                >
                  Troubleshooting <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
            <h3 className="font-semibold text-gray-900 mb-4">
              Still can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6">
              Our technical team is here to help you find the right automation
              solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-teal-600" />
                +6285210067755
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-teal-600" />
                sales@pjmotomasi.co.id
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-teal-600" />
                Jakarta, Indonesia
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
