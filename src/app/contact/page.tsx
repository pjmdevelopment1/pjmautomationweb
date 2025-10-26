/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/contact/page.tsx - COMPLETE CONTACT PAGE
import { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Shield,
  FileText,
  ArrowRight,
  Package,
  Headphones,
} from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { SITE_CONFIG } from "@/lib/contants";
import { generateLocalBusinessSchema } from "@/lib/schema";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/url";

export const metadata: Metadata = {
  title: "Contact Engineering Team - Technical Support | Prestasi Jaya Maju",
  description:
    "Hubungi tim engineering PJM untuk technical support, parameter setting, commissioning automation. Konsultasi gratis tersedia Jakarta, Surabaya, Bandung.",
  keywords: [
    "contact automation engineer",
    "technical support jakarta",
    "parameter setting service",
    "automation consultation indonesia",
    "plc troubleshooting support",
    "commissioning service bandung",
  ],
  openGraph: {
    title: "Contact Our Engineering Team | Prestasi Jaya Maju",
    description: "Get professional technical support for your automation needs",
    url: "/contact",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our engineers",
      value: SITE_CONFIG.company.phone,
      action: `tel:${SITE_CONFIG.company.phone}`,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send detailed technical questions",
      value: SITE_CONFIG.company.email,
      action: `mailto:${SITE_CONFIG.company.email}`,
      color: "text-blue-900",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Quick response via WhatsApp",
      value: "Iqbal - 085210067755",
      action:
        "https://api.whatsapp.com/send/?phone=6285210067755&text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const services = [
    {
      title: "Programming & Parameter Setting",
      description: "Inverter configuration, PLC programming, HMI setup",
      icon: "⚙️",
    },
    {
      title: "Commissioning",
      description: "System testing, startup, and validation",
      icon: "🔧",
    },
    {
      title: "Troubleshooting",
      description: "Problem diagnosis and resolution",
      icon: "🔍",
    },
    {
      title: "Training",
      description: "Operator and maintenance training",
      icon: "📚",
    },
  ];

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema()),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-20 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Our Engineering Team
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get professional technical support for your automation needs. Free
              consultation, parameter setting, and commissioning services
              available.
            </p>
            <div className="flex items-center justify-center gap-4 text-blue-100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>8+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach our engineering team. Choose what's most
              convenient for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  target={
                    method.action.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    method.action.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group relative bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div
                    className={`w-16 h-16 ${method.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className={`font-semibold ${method.color}`}>
                    {method.value}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>

            {/* Company Info */}
            <div className="space-y-8">
              {/* Services */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Engineering Services
                </h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>08:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>08:00 - 13:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Emergency only</span>
                  </div>
                  <hr className="border-blue-200 my-3" />
                  <p className="text-blue-700">
                    <strong>Emergency Support:</strong> Available 24/7 for
                    critical automation issues
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-900" />
                  Service Areas
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div>Jakarta</div>
                  <div>Bekasi</div>
                  <div>Cikarang</div>
                  <div>Surabaya</div>
                  <div>Bandung</div>
                  <div>Tangerang</div>
                  <div>Karawang</div>
                  <div>Bali</div>
                  <div>Balikpapan</div>
                  <div>Makassar</div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  On-site services available. Remote support nationwide.
                </p>
              </div>
            </div>
          </div>
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
