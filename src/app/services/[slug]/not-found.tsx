/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/services/[slug]/not-found.tsx
import Link from "next/link";
import {
  Settings,
  ArrowLeft,
  Search,
  Phone,
  Mail,
  Wrench,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/contants";

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 mt-20">
      <div className="max-w-md mx-auto text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Settings className="h-12 w-12 text-blue-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Service Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the automation service you're looking for. It
          may have been updated, moved, or the link might be incorrect.
        </p>

        {/* Actions */}
        <div className="space-y-4 mb-8">
          <Button asChild className="w-full bg-blue-900 hover:bg-blue-950">
            <Link href="/services">
              <Wrench className="h-4 w-4 mr-2" />
              Browse All Services
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Homepage
            </Link>
          </Button>
        </div>

        {/* Help Section */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-900" />
            Need Custom Engineering Support?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Our engineering team provides specialized automation services,
            technical consultation, and custom project solutions.
          </p>

          <div className="space-y-2">
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/contact">
                <Mail className="h-3 w-3 mr-2" />
                Contact Engineering Team
              </Link>
            </Button>

            <div className="text-xs text-gray-500 space-y-1">
              <a
                href="https://wa.me/6285210067755?text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-center">
                  <Phone className="h-3 w-3 mr-1" />
                  Whatsapp - 085210067755 (Iqbal)
                </div>
              </a>
              <div className="flex items-center justify-center">
                <Mail className="h-3 w-3 mr-1" />
                sales@pjmotomasi.co.id
              </div>
            </div>
          </div>
        </div>

        {/* Common Services */}
        <div className="mt-6 text-left">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Popular Automation Services:
          </h4>
          <div className="space-y-2 text-sm">
            <Link
              href="/services#plc-programming"
              className="block text-blue-900 hover:text-blue-700 hover:underline"
            >
              • PLC Programming & Configuration
            </Link>
            <Link
              href="/services#hmi-development"
              className="block text-blue-900 hover:text-blue-700 hover:underline"
            >
              • HMI Development & Design
            </Link>
            <Link
              href="/services#system-integration"
              className="block text-blue-900 hover:text-blue-700 hover:underline"
            >
              • System Integration & Commissioning
            </Link>
            <Link
              href="/services#technical-support"
              className="block text-blue-900 hover:text-blue-700 hover:underline"
            >
              • Technical Support & Maintenance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
