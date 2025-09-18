/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/components/home/CategoryShowcase.tsx - REDESIGNED CLEAN VERSION
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Cpu,
  Zap,
  Monitor,
  Gauge,
  Radar,
  Power,
  CircuitBoard,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/contants";

interface CategoryShowcaseProps {
  categories: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
}

const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  // Category images mapping - SAME AS ORIGINAL
  const categoryImages: Record<string, string> = {
    plc: "/images/plc3.jpeg",
    inverter: "/images/inverter2.jpeg",
    hmi: "/images/hmi2.jpeg",
    "power-meter": "/images/power-meter.jpg",
    "power-supply": "/images/power-supply.jpg",
    servo: "/images/servo.jpg",
    sensor: "/images/sensors.jpg",
    breaker: "/images/breaker.jpg",
    accesories: "/images/accessories.jpg",
  };

  // Category icons mapping - SAME AS ORIGINAL
  const categoryIcons: Record<string, any> = {
    plc: Cpu,
    inverter: Zap,
    hmi: Monitor,
    "power-meter": Gauge,
    "power-supply": Power,
    servo: Zap,
    sensor: Radar,
    breaker: CircuitBoard,
    accesories: Settings,
  };

  // Top categories to highlight - SAME AS ORIGINAL
  const topCategories = PRODUCT_CATEGORIES.slice(0, 4).map((cat) => cat.slug);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Clean & Consistent */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Industrial Automation Solutions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Complete range of automation parts with engineering support. PLC,
            HMI, Inverter, Servo, Power Meter, Sensors, we have everything for
            your industrial needs.
          </p>
        </div>

        {/* Main Categories Grid - Clean Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topCategories.map((categorySlug, index) => {
            const category = PRODUCT_CATEGORIES.find(
              (cat) => cat.slug === categorySlug
            );
            if (!category) return null;

            const categoryData = categories.find(
              (cat) => cat.slug === category.slug
            );
            const productCount = categoryData?.count || 0;
            const categoryImage =
              categoryImages[category.slug] || "/images/default-category.png";
            const CategoryIcon = categoryIcons[category.slug] || Cpu;

            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Image Section - Clean & Simple */}
                <div className="h-48 relative overflow-hidden bg-gray-50">
                  <Image
                    src={categoryImage}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <CategoryIcon className="h-5 w-5 text-blue-900" />
                    </div>
                  </div>
                </div>

                {/* Content Section - Clean Typography */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-950 transition-colors">
                    {category.name.split("(")[0].trim()}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">
                      Browse Products
                    </span>
                    <ArrowRight className="h-4 w-4 text-blue-900 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secondary Categories - Minimalist Grid */}
        {PRODUCT_CATEGORIES.length > 4 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              More Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {PRODUCT_CATEGORIES.slice(4).map((category) => {
                const categoryData = categories.find(
                  (cat) => cat.slug === category.slug
                );
                const productCount = categoryData?.count || 0;
                const CategoryIcon = categoryIcons[category.slug] || Cpu;

                return (
                  <Link
                    key={category.slug}
                    href={`/products?category=${category.slug}`}
                    className="group p-6 text-center hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-950 transition-colors">
                      <CategoryIcon className="h-6 w-6 text-blue-900 group-hover:text-white transition-colors" />
                    </div>

                    {/* Title */}
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-950 transition-colors line-clamp-2">
                      {category.name.split("(")[0].trim()}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Section - Clean & Simple */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We can source any automation
            part you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border justify-center border-blue-900 text-blue-900 font-medium rounded-lg hover:bg-blue-950 hover:text-white transition-colors"
            >
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 justify-center bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-950 transition-colors"
            >
              Request Custom Part
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
