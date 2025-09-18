/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/home/HeroSection.tsx - PJM AUTOMATION HERO
// Clean & Simple Design - Proper Indentation

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Cable,
  ChevronDown,
  CircuitBoard,
  Code,
  Cpu,
  Monitor,
  Package,
  Settings,
  Target,
  Users,
  Vault,
  Zap,
} from "lucide-react";

// Popular topics/categories
const POPULAR_TOPICS = [
  { name: "PLC", href: "/products?category=plc" },
  { name: "VFD", href: "/products?category=vfd" },
  { name: "HMI", href: "/products?category=hmi" },
  { name: "Sensors", href: "/products?category=sensors" },
  { name: "Programming", href: "/services/programming" },
  { name: "IoT Solutions", href: "/services/iot-solutions" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/industrial-automation-bg.jpg" // Your current hero background
          alt="Industrial Automation Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Content Container - Add margin top, fix PLC size */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white mt-12 pt-32 md:pt-24 lg:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-tight mb-4 md:mb-6">
            Complete Industrial
            <br />
            <span className="text-blue-400">Automation Solutions</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed">
            Search by product type, brand, application, or technical needs
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-8 md:mb-10">
            Expert consultation & competitive pricing available
          </p>

          {/* CTA Buttons - Same width based on longest text */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 w-full max-w-md sm:max-w-none mx-auto">
            <Link
              href="/products"
              className="w-full sm:w-64 inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Package className="h-5 w-5 mr-2" />
              Browse Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-64 inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Users className="h-5 w-5 mr-2" />
              Ask Our Team
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          {/* Popular Products Section */}
          <div className="mt-8 mb-4">
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-gray-300">
              Popular Products & Services
            </h3>

            {/* Cards dengan ukuran konsisten semua */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {/* PLC - Fixed size sama dengan yang lain */}
              <Link
                href="/products?category=plc"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <CircuitBoard className="h-7 w-7" />
                </div>
                <h4 className="text-xs xs:text-xs sm:text-sm font-medium text-white">
                  PLC
                </h4>
              </Link>

              {/* VFD */}
              <Link
                href="/products?category=vfd"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Vault className="h-7 w-7" />
                </div>
                <h4 className="text-xs xs:text-xs sm:text-sm font-medium text-white">
                  VSD
                </h4>
              </Link>

              {/* HMI */}
              <Link
                href="/products?category=hmi"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Monitor className="h-7 w-7" />
                </div>
                <h4 className="text-xs xs:text-xs sm:text-sm font-medium text-white">
                  HMI
                </h4>
              </Link>

              {/* Sensors */}
              <Link
                href="/products?category=sensors"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Cable className="h-7 w-7" />
                </div>
                <h4 className="text-xs xs:text-xs sm:text-sm font-medium text-white">
                  Install
                </h4>
              </Link>

              {/* Programming - Text lebih kecil untuk mobile */}
              <Link
                href="/services"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Code className="h-7 w-7" />
                </div>
                <h4 className="text-xs xs:text-xs sm:text-sm font-medium text-white leading-tight">
                  Program
                </h4>
              </Link>

              {/* IoT Solutions - Text lebih kecil untuk mobile */}
              <Link
                href="/services"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Cpu className="h-7 w-7" />
                </div>
                <h4 className="text-xs xs:text-xs sm:text-sm font-medium text-white leading-tight">
                  IoT
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
