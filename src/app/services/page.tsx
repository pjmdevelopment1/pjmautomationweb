/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Metadata } from "next";
import { getServices } from "@/lib/contentful";
import ServiceCard from "@/components/services/ServiceCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { SITE_CONFIG, TARGET_KEYWORDS } from "@/lib/contants";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import { getCanonicalUrl } from "@/lib/url";
import { MAINTENANCE_MODE } from "@/lib/contants";
import MaintenanceNotice from "@/components/common/maintenancenotice";

interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

//export const dynamic = "force-dynamic";

export const revalidate = 10800;

export const metadata: Metadata = {
  title: "Engineering Services + Technical Support | Prestasi Jaya Maju",
  description:
    "Professional automation services: Parameter setting, commissioning, technical training, troubleshooting. Expert engineering support for industrial automation Jakarta, Surabaya.",
  keywords: [
    ...TARGET_KEYWORDS.primary,
    "automation services indonesia",
    "parameter setting inverter",
    "programming hmi",
    "programming hmi proface",
    "instalasi panel baru",
    "instalasi panel PLC",
    "instalasi panel Inverter",
    "instalasi panel HMI",
    "commissioning plc hmi",
    "programming plc",
    "programming hmi",
    "engineering consultation jakarta",
    "troubleshooting support",
    "industrial automation service",
  ],
  openGraph: {
    title: "Engineering Services + Technical Support | Prestasi Jaya Maju",
    description:
      "Professional automation services with expert technical support for industrial applications.",
    url: "/services",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl("/services"),
  },
};

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  if (MAINTENANCE_MODE) {
    return <MaintenanceNotice />;
  }
  const params = await searchParams;
  const { search } = params;

  const services = await getServices();

  let filteredServices = services;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredServices = filteredServices.filter((service) => {
      // Primary match: Title (most important)
      if (service.name.toLowerCase().includes(searchLower)) return true;

      // Secondary match: Features (if exists and specific)
      if (
        service.features &&
        service.features.some((feature: string) =>
          feature.toLowerCase().includes(searchLower),
        )
      )
        return true;

      // Skip description search to avoid false positives
      return false;
    });
  }

  const featuredServices = filteredServices.filter(
    (service) => service.featured,
  );
  const regularServices = filteredServices.filter(
    (service) => !service.featured,
  );

  return (
    <div className="mt-20">
      {/* Header Section - blue Background like Products page */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-8 mt-20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
            ]}
            className="mb-8 [&_a]:text-blue-200 [&_a:hover]:text-white [&_span]:text-white"
          />

          <div className="max-w-4xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Engineering Services
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              + Technical Support & Consultation
            </p>
            <p className="text-lg text-blue-200 max-w-2xl">
              Professional automation services with expert technical support.
              From parameter setting to complete commissioning, we ensure your
              systems perform optimally.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Services Search Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="h-5 w-5 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Search Services</h3>
                <p className="text-sm text-gray-600">
                  Find engineering services and technical support
                </p>
              </div>
            </div>
          </div>

          {search && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-900" />
                  <span className="text-sm font-medium text-blue-900">
                    Active Search:
                  </span>
                  <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-200">
                    Search: "{search}"
                  </span>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 border bg-white border-blue-200 text-blue-900 hover:bg-blue-50 hover:border-blue-300 text-sm px-3 py-1 rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Link>
              </div>
            </div>
          )}

          {/* Search Form */}
          <form method="GET" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="search"
                defaultValue={search || ""}
                placeholder="Search by service name, type, or description..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-950 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap sm:w-auto w-full"
              >
                <Search className="h-5 w-5 mr-2 inline" />
                Search Services
              </button>
            </div>

            {/* WhatsApp CTA */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Tidak mau repot mencari? Langsung hubungi tim kami
              <a
                href="https://api.whatsapp.com/send/?phone=6285210067755&text=Halo%20PJM%20Otomasi,%20saya%20membutuhkan%20bantuan%20untuk%20mencari%20produk%20automation"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-950 hover:text-blue-950 transition-colors"
              >
                {" "}
                (WhatsApp +6285210067755)
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-8">
        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 pb-8 text-center">
              Featured Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* No Services Found */}
      {filteredServices.length === 0 && (
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6 text-6xl">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No services found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse all our services.
              </p>
              <div className="space-y-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  View All Services
                </Link>
                <p className="text-sm text-gray-500">
                  Or{" "}
                  <Link
                    href="/contact"
                    className="text-blue-900 hover:text-blue-950"
                  >
                    contact us
                  </Link>{" "}
                  for custom engineering consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced CTA Section - Products Page Style */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Custom Engineering Solutions?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Our experienced engineers provide tailored automation solutions
              for your specific industrial requirements. Get expert consultation
              today.
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
                  href="https://api.whatsapp.com/send/?phone=6285210067755&text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation"
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
                      Iqbal - 085210067755 <br />
                      Tegar - 081112003634
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
    </div>
  );
}
