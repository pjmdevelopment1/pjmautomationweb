/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/quote/page.tsx - FIXED FOR NEXT.JS 15 COMPATIBILITY
import { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "@/components/forms/QuoteForm";
import { PRODUCT_CATEGORIES, SITE_CONFIG } from "@/lib/contants";
import { getCanonicalUrl } from "@/lib/url";

export const metadata: Metadata = {
  title:
    "Request Quote - Automation Parts + Technical Support | Prestasi Jaya Maju",
  description:
    "Request competitive quotes for PLC, HMI, Inverter, Safety Relay with technical support. Fast response, expert consultation, parameter setting service included.",
  keywords: [
    "quote automation parts indonesia",
    "harga plc mitsubishi",
    "quote hmi proface",
    "penawaran inverter schneider",
    "request quote automation jakarta",
    "technical support included",
  ],
  openGraph: {
    title: "Request Quote for Automation Parts | PJM",
    description: "Get competitive pricing with technical support included",
    url: "/quote",
    type: "website",
  },
  alternates: {
    canonical: getCanonicalUrl("/quote"),
  },
};

interface QuotePageProps {
  searchParams: Promise<{
    product?: string;
  }>;
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const params = await searchParams;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Request Quote
              <span className="block text-blue-200 text-2xl lg:text-3xl font-normal mt-2">
                Get Competitive Pricing + Technical Support
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional automation parts with comprehensive technical
              support. Parameter setting, commissioning, and consultation
              included.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">⚡</div>
                <div className="text-sm">Fast Response</div>
                <div className="text-xs text-blue-200">Within 2 hours</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">🔧</div>
                <div className="text-sm">Technical Support</div>
                <div className="text-xs text-blue-200">
                  Parameter setting included
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">💰</div>
                <div className="text-sm">Competitive Pricing</div>
                <div className="text-xs text-blue-200">Best market rates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tell Us About Your Requirements
                </h2>
                <Suspense fallback={<QuoteFormSkeleton />}>
                  <QuoteFormWrapper prefilledProduct={params.product} />
                </Suspense>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* What's Included */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  What's Included:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Competitive Pricing
                      </div>
                      <div className="text-sm text-gray-600">
                        Best market rates with quality assurance
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Technical Consultation
                      </div>
                      <div className="text-sm text-gray-600">
                        Free engineering consultation included
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Parameter Setting
                      </div>
                      <div className="text-sm text-gray-600">
                        Configuration assistance available
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Documentation
                      </div>
                      <div className="text-sm text-gray-600">
                        Technical specs and manuals provided
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Warranty Support
                      </div>
                      <div className="text-sm text-gray-600">
                        Manufacturer warranty + service guarantee
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Popular Categories */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Popular Categories:
                </h3>
                <div className="space-y-3">
                  {PRODUCT_CATEGORIES.slice(0, 5).map((category) => (
                    <div
                      key={category.slug}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {category.description.substring(0, 80)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 mb-4">
                  Need Immediate Help?
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+6285210067755"
                    className="flex items-center gap-3 text-blue-900 hover:text-blue-950 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm">📞</span>
                    </div>
                    <div>
                      <div className="font-medium">Call Direct</div>
                      <div className="text-sm">{SITE_CONFIG.company.phone}</div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/6285210067755?text=Hi, I need a quote for automation parts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-900 hover:text-blue-950 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm">💬</span>
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm">Quick response</div>
                    </div>
                  </a>
                  <div className="pt-3 border-t border-blue-200">
                    <div className="text-xs text-blue-900">
                      <strong>Business Hours:</strong>
                      <br />
                      Mon-Fri: 08:00-17:00 WIB
                      <br />
                      Sat: 08:00-13:00 WIB
                      <br />
                      Emergency: 24/7 available
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              {/* <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
                <blockquote className="text-gray-600 text-sm mb-3">
                  "Fast quote response and excellent technical support. The
                  parameter setting service saved us weeks of commissioning
                  time."
                </blockquote>
                <cite className="text-xs text-gray-500">
                  - Manufacturing Manager, PT. Example Company
                </cite>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How quickly will I receive a quote?
                </h3>
                <p className="text-gray-600">
                  We typically respond within 2 hours during business hours. For
                  urgent requests, contact us directly via WhatsApp for
                  immediate assistance.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is technical support really included?
                </h3>
                <p className="text-gray-600">
                  Yes! Basic technical consultation, parameter setting guidance,
                  and configuration assistance are included with every purchase.
                  Advanced commissioning services are available separately.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What if I need products not listed on your website?
                </h3>
                <p className="text-gray-600">
                  We can source almost any automation part. Just describe your
                  requirements in the quote form, and we'll find the right
                  solution for you.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do you provide installation services?
                </h3>
                <p className="text-gray-600">
                  We offer commissioning and installation support services. This
                  can be discussed during the quote process based on your
                  specific needs and location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Request Quote for Automation Parts",
            description:
              "Get competitive quotes for industrial automation parts with technical support included",
            url: "/quote",
            mainEntity: {
              "@type": "Service",
              name: "Automation Parts Quote Service",
              provider: {
                "@type": "Organization",
                name: "Prestasi Jaya Maju",
              },
              offers: {
                "@type": "Offer",
                description:
                  "Competitive pricing for automation parts with technical support",
                includedInDataCatalog: {
                  "@type": "DataCatalog",
                  name: "Industrial Automation Parts",
                },
              },
            },
          }),
        }}
      />
    </>
  );
}

// Wrapper component to handle the prefilled product
function QuoteFormWrapper({ prefilledProduct }: { prefilledProduct?: string }) {
  return <QuoteForm />;
}

// Loading skeleton for better UX
function QuoteFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}
