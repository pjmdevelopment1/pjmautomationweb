/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
// src/components/home/WhyChooseUs.tsx - REDESIGNED CLEAN & CUSTOMER-FOCUSED
import {
  CheckCircle,
  Clock,
  Headphones,
  Award,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

const WhyChooseUs = () => {
  // Core value propositions - simplified & focused
  const benefits = [
    {
      icon: Clock,
      title: "8+ Years Engineering Experience",
      description:
        "Proven expertise in industrial automation with deep technical knowledge",
      stats: "Since 2016",
      color: "blue-900",
    },
    {
      icon: Headphones,
      title: "Complete Technical Support",
      description:
        "From parameter setting to commissioning - full engineering services included",
      stats: "24/7 Support",
      color: "blue-900",
    },
    {
      icon: CheckCircle,
      title: "Trusted Quality Products",
      description:
        "Genuine automation parts from leading global manufacturers with warranty",
      stats: "100% Authentic",
      color: "blue-900",
    },
  ];

  // Customer logos - 12 companies
  const customerLogos = [
    // Row 1 - Top 6
    { name: "Hilon", logo: "/images/customers/PT. Hilon Indonesia.png" },
    { name: "DIC", logo: "/images/customers/PT. DIC.png" },
    { name: "Sasa", logo: "/images/customers/PT. Sasa.png" },
    { name: "Mesin Isuzu", logo: "/images/customers/PT. Mesin Isuzu.png" },
    { name: "Hankook", logo: "/images/customers/PT. Hankook.png" },
    { name: "Indonesia Power", logo: "/images/customers/Indonesia Power.png" },

    // Row 2 - Bottom 6s
    { name: "Pricol", logo: "/images/customers/PT. Pricol.png" },
    { name: "Toro", logo: "/images/customers/PT. Toro.png" },
    { name: "Kasakata", logo: "/images/customers/PT. Kasakata.png" },
    { name: "Indofood", logo: "/images/customers/PT. Indofood.png" },
    { name: "Idsmed", logo: "/images/customers/PT. Idsmed.png" },
    { name: "Index Indo", logo: "/images/customers/PT. Index Indo Garmen.png" },
  ];

  // Key metrics - more business focused
  const metrics = [
    { number: "120+", label: "Active Customers", icon: Users },
    { number: "8+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Customer Retention", icon: TrendingUp },
    { number: "24/7", label: "Technical Support", icon: Headphones },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header - Clean */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why Choose PJM Automation?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for complete industrial automation solutions
            with proven track record
          </p>
        </div>

        {/* Key Metrics - Prominent Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100"
              >
                <Icon className="h-8 w-8 text-blue-900 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.number}
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Core Benefits - Simplified */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <span className="text-sm font-medium text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                    {benefit.stats}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Our Customers Section - 12 Company Logos */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Trusted by Leading Companies
            </h3>
            <p className="text-gray-600">
              PJM Automation serves major industrial companies across Indonesia
            </p>
          </div>

          {/* Customer Logos - 6 atas 6 bawah */}
          <div className="space-y-6">
            {/* Row 1 - Top 6 */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {customerLogos.slice(0, 6).map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center justify-center p-4 rounded-lg hover: transition-colors group"
                >
                  <img
                    src={customer.logo}
                    alt={`${customer.name} Logo`}
                    className="max-w-full max-h-12 object-contain filter transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>

            {/* Row 2 - Bottom 6 */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {customerLogos.slice(6, 12).map((customer, index) => (
                <div
                  key={customer.name}
                  className="flex items-center justify-center p-4 rounded-lg hover: transition-colors group"
                >
                  <img
                    src={customer.logo}
                    alt={`${customer.name} Logo`}
                    className="max-w-full max-h-12 object-contain filter transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Simple tagline */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              And many more leading companies trust PJM Automation for their
              industrial needs
            </p>
          </div>
        </div>

        {/* CTA Section - Clear Action */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Ready to Experience the PJM Automation Difference?
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 justify-center bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-950 transition-colors"
            >
              Get Technical Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 border justify-center border-blue-900 text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Browse Our Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
