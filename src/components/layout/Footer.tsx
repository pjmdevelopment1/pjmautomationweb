// src/components/layout/Footer.tsx - ENHANCED DESIGN
// 🎯 Modern, professional footer dengan better organization dan visual hierarchy

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Clock,
  Shield,
  Award,
  Zap,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/contants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const serviceLinks = [
    { href: "/services/parameter-setting", label: "Parameter Setting" },
    { href: "/services/commissioning", label: "Commissioning" },
    { href: "/services/consultation", label: "Engineering Consultation" },
    { href: "/services/training", label: "Technical Training" },
  ];

  const trustBadges = [
    { icon: Clock, text: "24/7 Support" },
    { icon: Shield, text: "8+ Years Experience" },
    { icon: Award, text: "Certified Engineers" },
    { icon: Zap, text: "Fast Response" },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgb(148, 163, 184) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgb(148, 163, 184) 0.5px, transparent 0.5px)
            `,
            backgroundSize: "50px 50px, 25px 25px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="font-bold text-xl text-white mb-3">
                  PT. Prestasi Jaya Maju
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Complete industrial automation supplier with 8+ years
                  engineering experience. We provide quality automation parts
                  with expert technical support.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-gray-400"
                  >
                    <badge.icon className="h-4 w-4 text-blue-400" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="h-3 w-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4">Our Services</h4>
              <nav className="space-y-3">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="h-3 w-3 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-4">
                Contact Information
              </h4>
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${SITE_CONFIG.company.phone}`}
                  className="group flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Phone className="h-5 w-5 mt-0.5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Call Us</p>
                    <p className="font-medium">{SITE_CONFIG.company.phone}</p>
                    <p className="text-sm">085210067755 (WhatsApp)</p>
                    <p className="text-sm">085717278739 (WhatsApp)</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${SITE_CONFIG.company.email}`}
                  className="group flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Mail className="h-5 w-5 mt-0.5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email Us</p>
                    <p className="font-medium text-sm">
                      {SITE_CONFIG.company.email}
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="h-5 w-5 mt-0.5 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="text-sm leading-relaxed">
                      {SITE_CONFIG.company.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="border-t border-slate-800">
          <div className="py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h4 className="font-semibold text-white mb-1">
                  Ready to Get Started?
                </h4>
                <p className="text-sm text-gray-400">
                  Get competitive pricing for your automation needs
                </p>
              </div>
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="text-center md:text-left">
              <p>
                &copy; {currentYear} PT. Prestasi Jaya Maju (PJM Automation).
                All rights reserved.
              </p>
              <p className="text-xs mt-1">
                Professional Industrial Automation Supplier & Engineering
                Services
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online Support Available</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
