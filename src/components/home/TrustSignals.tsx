/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/components/home/TrustSignals.tsx - CLEAN & PROFESSIONAL DESIGN
import { BRANDS, TRUST_SIGNALS } from "@/lib/contants";
import {
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  Headphones,
  Settings,
  Wrench,
  Cog,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

const TrustSignals = () => {
  const iconMap = {
    Shield,
    Award,
    Truck,
    Users,
    Headphones,
    Clock,
    Settings,
    Wrench,
    Cog,
    MapPin,
  };

  const brandLogos = BRANDS.slice(0, 6).map((brand: any) => ({
    name: brand,
  }));

  const services = [
    {
      icon: Settings,
      title: "Parameter Setting",
      desc: "Inverter & PLC configuration",
    },
    {
      icon: Headphones,
      title: "Technical Support",
      desc: "24/7 engineering consultation",
    },
    {
      icon: Wrench,
      title: "Commissioning",
      desc: "Installation & testing services",
    },
    {
      icon: Cog,
      title: "Training",
      desc: "Operator & maintenance training",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Kenapa Pilih PT. Prestasi Jaya Maju?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Engineering excellence dan customer satisfaction adalah prioritas
            utama kami dalam menyediakan solusi industrial automation
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TRUST_SIGNALS.map(
            (
              point: {
                icon: string;
                title:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                description:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              },
              index: Key | null | undefined
            ) => {
              const IconComponent =
                iconMap[point.icon as keyof typeof iconMap] || Shield;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Engineering Services
            </h3>
            <p className="text-gray-600">
              Comprehensive technical support for your automation needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="p-3 bg-teal-100 rounded-lg w-fit mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Partners */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Trusted Brand Partners
            </h3>
            <p className="text-gray-600">
              Kami bekerja sama dengan brand-brand terpercaya dunia
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandLogos.map(
              (
                brand: {
                  name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactPortal
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                },
                index: Key | null | undefined
              ) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:shadow-sm transition-shadow"
                >
                  <span className="text-gray-700 font-medium text-sm">
                    {brand.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">8+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Products Available</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">15+</div>
            <div className="text-sm text-gray-600">Brand Partners</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="text-3xl font-bold text-slate-600 mb-2">100+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-teal-600 text-white p-10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Ready untuk Engineering Excellence?
            </h3>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Dapatkan automation parts berkualitas dengan technical support
              terbaik. Tim engineering kami siap membantu project Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-50 font-medium"
                asChild
              >
                <Link href="/contact">Konsultasi Gratis</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-600 font-medium"
                asChild
              >
                <Link href="/products">Lihat Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
