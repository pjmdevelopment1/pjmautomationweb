/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/home/ServicesHighlight.tsx
// 🎯 REDESIGNED ENGINEERING SERVICES SECTION
// Updated dengan blue-900/950 theme dan modern design pattern

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Settings,
  Wrench,
  PlayCircle,
  GraduationCap,
  CheckCircle,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Service } from "@/types/service";

interface ServicesHighlightProps {
  services: Service[];
}

const ServicesHighlight = ({ services }: ServicesHighlightProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgb(30, 58, 138) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgb(30, 58, 138) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px, 40px 40px",
          }}
        />
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-r from-blue-900/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-gradient-to-l from-blue-900/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          {/* Main Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Engineering
            <span className="text-blue-900"> Services</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete technical support from initial setup to ongoing
            maintenance. Our expert team ensures your automation systems run at
            peak performance.
          </p>
        </div>

        {/* Modern Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.slice(0, 4).map((service, index) => {
            // Alternating design pattern for visual interest
            const isEven = index % 2 === 0;

            return (
              <div key={service.slug} className="group h-full">
                {/* Modern Card with Glass Effect */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-2xl hover:border-blue-900/20 transition-all duration-500 transform hover:-translate-y-2 hover:bg-white">
                  {/* Image Section with Overlay */}
                  <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-50 to-gray-50 flex-shrink-0">
                    {service.images && service.images.length > 0 ? (
                      <>
                        <Image
                          src={
                            service.images[0].startsWith("//")
                              ? `https:${service.images[0]}`
                              : service.images[0]
                          }
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="p-4 bg-blue-900/10 rounded-full">
                          <Settings className="h-12 w-12 text-blue-900" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section - Enhanced */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Service Title */}
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300 leading-tight">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Features Preview */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-50 text-blue-900 px-2 py-1 rounded-full border border-blue-100"
                            >
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 2 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +{service.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Enhanced CTA */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="group/link inline-flex items-center gap-2 text-blue-900 hover:text-blue-950 font-semibold transition-all duration-300 mt-auto"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Modern Bottom Accent */}
                  <div className="h-1 bg-gradient-to-r from-blue-900 to-blue-950 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
