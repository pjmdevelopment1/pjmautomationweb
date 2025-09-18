/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/home/HeroSection.tsx - PJM AUTOMATION HERO
// Clean & Simple Design - Proper Indentation

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Code,
  Cpu,
  Monitor,
  Package,
  Settings,
  Target,
  Users,
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

      {/* Content Container - Moved Down Slightly */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            Complete Industrial
            <br />
            Automation Solutions
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 max-w-3xl mx-auto leading-relaxed">
            Search by product type, brand, application, or technical needs
          </p>

          <p className="text-sm md:text-base text-gray-300 mb-10">
            Expert consultation & competitive pricing available
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Package className="h-5 w-5 mr-2" />
              Browse Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Users className="h-5 w-5 mr-2" />
              Ask Our Team
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          {/* Popular Products Section */}
          <div className="mt-20">
            <h3 className="text-lg md:text-xl font-semibold mb-8 text-gray-300">
              Popular Products & Services
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {/* PLC */}
              <Link
                href="/products?category=plc"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Settings className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-medium text-white">PLC</h4>
              </Link>

              {/* VFD */}
              <Link
                href="/products?category=vfd"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Zap className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-medium text-white">VFD</h4>
              </Link>

              {/* HMI */}
              <Link
                href="/products?category=hmi"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Monitor className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-medium text-white">HMI</h4>
              </Link>

              {/* Sensors */}
              <Link
                href="/products?category=sensors"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Target className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-medium text-white">Sensors</h4>
              </Link>

              {/* Programming */}
              <Link
                href="/services"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Code className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-medium text-white">Programming</h4>
              </Link>

              {/* IoT Solutions */}
              <Link
                href="/services"
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-5 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-blue-400 mb-3 flex justify-center">
                  <Cpu className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-medium text-white">
                  IoT Solutions
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* NO SCROLL INDICATOR - REMOVED */}
    </section>
  );
};

export default HeroSection;
