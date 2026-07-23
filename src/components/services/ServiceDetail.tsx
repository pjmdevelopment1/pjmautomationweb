/* eslint-disable @typescript-eslint/no-unused-vars */
import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SITE_CONFIG } from "@/lib/contants";

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Service Header - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Side - Image */}
          <div className="lg:col-span-1">
            {service.images && service.images.length > 0 && (
              <div className="relative h-96 lg:h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={
                    service.images[0].startsWith("//")
                      ? `https:${service.images[0]}`
                      : service.images[0]
                  }
                  alt={service.name}
                  fill
                  className="object-cover"
                  priority
                />
                {service.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-900 text-white">Featured</Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Service Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Breadcrumb Tags */}
            <div className="flex items-center gap-2 text-sm">
              <Link href="/services" className="text-blue-900 hover:underline">
                Services
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{service.name}</span>
            </div>

            {/* Service Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {service.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            {/* Services Included */}
            {service.features && service.features.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold mb-4 text-blue-950">
                  Services Included:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-blue-900 flex-shrink-0" />
                      <span className="text-sm text-blue-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Service Description - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg p-4 lg:p-8 overflow-hidden">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Service Details
              </h2>
              <div className="prose prose-lg max-w-none service-description break-words overflow-hidden">
                {typeof service.description === "string" ? (
                  <div className="text-gray-700 leading-relaxed">
                    {service.description.split("\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="mb-4 text-justify leading-relaxed break-words overflow-wrap-anywhere"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : service.description &&
                  typeof service.description === "object" ? (
                  <div className="text-gray-700">
                    {documentToReactComponents(service.description)}
                  </div>
                ) : (
                  <div className="text-gray-700">
                    <p>No description available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Get Started Today
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Settings className="w-4 h-4 text-blue-900" />
                  <span>Engineering technical consultation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-blue-900" />
                  <span>Flexible scheduling available</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Settings className="w-4 h-4 text-blue-900" />
                  <span>Comprehensive support included</span>
                </div>

                {/* Functional Buttons Section */}
                <div className="pt-4 border-t space-y-3">
                  {/* WhatsApp Button - Contact Our Team */}
                  <a
                    href="https://wa.me/6285210067755?text=Halo PJMOtomasi, saya membutuhkan konsultasi untuk layanan automation. Mohon informasi lebih lanjut."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-900 hover:bg-blue-950 text-white px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 group"
                  >
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Contact Our Team
                  </a>

                  {/* Contact Page Button - Schedule Consultation */}
                  <Link
                    href="/contact"
                    className="w-full bg-white border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Schedule Consultation
                  </Link>
                </div>

                {/* Contact Information Section */}
                <div className="pt-4 border-t space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-3">
                    Direct Contact Information
                  </h4>

                  {/* Phone */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Phone
                      </p>
                      <a
                        href="tel:+6285210067755"
                        className="text-sm font-medium text-gray-900 hover:text-blue-900 transition-colors"
                      >
                        021-38810132
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-blue-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Email
                      </p>
                      <a
                        href={`mailto:${SITE_CONFIG.company.email}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-900 transition-colors break-all"
                      >
                        {SITE_CONFIG.company.email}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        WhatsApp 1
                      </p>
                      <a
                        href="https://api.whatsapp.com/send/?phone=6285210067755&text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-900 hover:text-blue-900 transition-colors"
                      >
                        Iqbal - 085210067755
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        WhatsApp 2
                      </p>
                      <a
                        href="https://api.whatsapp.com/send/?phone=6281112003634&text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-900 hover:text-blue-900 transition-colors"
                      >
                        Tegar - 081112003634
                      </a>
                    </div>
                  </div>

                  <br />
                  <a
                    href="https://maps.app.goo.gl/YJ238fdpCgSw1FzW7"
                    className="font-medium text-gray-900 mb-3"
                  >
                    Address :
                    <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-900 transition-colors">
                      <MapPin className="h-6 w-6" />
                      <span>{SITE_CONFIG.company.address}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {service.images && service.images.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More Action From This Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {service.images.map((image, index) => (
              <div key={index} className="group relative">
                <div className="relative h-72 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={`${service.name} - Action ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {index + 1} / {service.images.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full CTA Section - Products Page Style */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Custom Engineering Solutions?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Our experienced engineers provide tailored automation solutions
              for your specific industrial requirements. Get engineering
              consultation today.
            </p>

            {/* Enhanced Single Button with proper spacing */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-10"
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Get Engineering Consultation</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
            </Link>

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
                  href="https://wa.me/6285210067755?text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation"
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
    </>
  );
}
