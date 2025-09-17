// src/components/home/HeroSection.tsx - PJM AUTOMATION HERO
// Clean & Simple Design - Proper Indentation

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    <section className="relative min-h-[600px] lg:min-h-[700px] bg-gray-900 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        {/* Fallback background color */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/industrial-automation-bg.jpg"
            alt="Industrial Automation Factory Background"
            fill
            priority
            quality={85}
            className="object-cover object-center"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Ss2eZtVvk+YeaUqfPDfTcn0OiPyVmzzNqt8nzDzSlT54b6bk+h0R+Ss2eZtVvk+YeaUqfPDfTcn0OiPyVmzzNqt8nzDzSlT54b6bk+h0R+Ss2eZtVvk+YeaUqfPDfTcn0OiPyVmzzNqt8nzDzSlT54b6bk+h0R+Ss2eZtVvk+YeaUqfPDfTcn0OiPyVmzzNqt8nzDzSlT54b6bk+h0R+Ss2eZtVvk+YeaUqfPDfTcn0OiPyVmzzNqt8nzD//2Q=="
          />
        </div>

        {/* Dark overlay for clean white text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto  py-16 lg:py-24">
        {/* Single Column Layout - Clean & Spacious */}
        <div className="max-w-4xl">
          {/* Main Headlines - Compact Size */}
          <div className="mb-8 mt-8">
            <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Complete Industrial
              <br />
              Automation Solutions
            </h1>

            <p className="text-md lg:text-lg text-gray-200 leading-relaxed max-w-xl mb-8">
              Search by product type, brand, application, or technical needs
            </p>
          </div>

          {/* CTA Buttons - Two Buttons */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary Button - Browse Products (Blue) */}
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Browse Products</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />

                {/* Clean shine animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>

              {/* Secondary Button - Ask Our Team (White Blur like MKI) */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-6 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Ask Our Team</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>

            <p className="text-sm text-gray-300 mt-3 ml-2">
              Expert consultation & competitive pricing available
            </p>
          </div>

          {/* Popular Products & Services - Compact Grid */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Popular Products & Services
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
              {POPULAR_TOPICS.map((topic, index) => (
                <Link
                  key={index}
                  href={topic.href}
                  className="bg-gray-800/80 hover:bg-blue-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-center text-sm font-medium transition-all duration-200 border border-gray-700/50 hover:border-blue-400/50"
                >
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
