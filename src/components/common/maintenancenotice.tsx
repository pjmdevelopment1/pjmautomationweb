// src/components/common/MaintenanceNotice.tsx
// 🔧 MAINTENANCE NOTICE - Manual toggle via MAINTENANCE_MODE in contants.ts
// Pure server component - zero JS, zero Contentful calls

import Link from "next/link";
import {
  Wrench,
  MessageSquare,
  Mail,
  CheckCircle,
  Monitor,
  Zap,
  ArrowRight,
} from "lucide-react";
import { BRANDS } from "@/lib/contants";

export default function MaintenanceNotice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4 py-24 mt-20">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white px-6 sm:px-10 py-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Website Sedang Dalam Proses Maintenance &amp; Pemeliharaan
          </h1>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-10 py-8 space-y-6">
          <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
            <p>Pelanggan yang terhormat,</p>
            <p>
              Mohon maaf atas ketidaknyamanannya. Saat ini website{" "}
              <strong>PJM Otomasi (PT. Prestasi Jaya Maju)</strong> sedang dalam
              proses maintenance hingga awal November 2026.
            </p>
            <p className="font-semibold text-gray-900">
              Kami tetap beroperasi dan siap melayani Anda.
            </p>
            <p>
              Jika Anda sedang mencari part industrial automation seperti{" "}
              <strong>PLC, Inverter/VSD, HMI, Servo</strong>, dan komponen
              lainnya — atau ingin berkonsultasi untuk project engineering
              seperti{" "}
              <strong>
                Programming PLC, Programming HMI, Instalasi Inverter/VSD, Servo,
                dan IoT Project
              </strong>{" "}
              — tim kami siap membantu Anda secara langsung:
            </p>
          </div>

          {/* Contact CTA */}
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="https://wa.me/6285210067755?text=Halo%20PJM%20Otomasi%2C%20saya%20ingin%20bertanya%20mengenai%20produk%20automation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-4 transition-colors"
            >
              <MessageSquare className="h-6 w-6 flex-shrink-0" />
              <div>
                <div className="text-xs opacity-90">WhatsApp</div>
                <div className="font-semibold">0852-1006-7755 (Iqbal)</div>
              </div>
            </a>
            <a
              href="mailto:sales@pjmotomasi.co.id"
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-4 transition-colors"
            >
              <Mail className="h-6 w-6 flex-shrink-0" />
              <div>
                <div className="text-xs opacity-90">Email</div>
                <div className="font-semibold">sales@pjmotomasi.co.id</div>
              </div>
            </a>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Atau klik ikon WhatsApp di pojok kanan bawah layar Anda
          </p>

          {/* IoT Demo Links */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <p className="font-semibold text-gray-900 mb-3">
              Kami juga memiliki demo project untuk IoT — silakan klik link di
              bawah ini:
            </p>
            <div className="space-y-2">
              <Link
                href="/demo-mc-monitoring"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium transition-colors"
              >
                <Monitor className="h-4 w-4 flex-shrink-0" />
                <span>Demo Machine Monitoring Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo-energy-monitoring"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium transition-colors"
              >
                <Zap className="h-4 w-4 flex-shrink-0" />
                <span>Demo Energy Monitoring Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Brands */}
          <div>
            <p className="font-semibold text-gray-900 mb-3">
              Kami mensupport produk dari berbagai brand ternama:
            </p>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <span
                  key={brand}
                  className="inline-block bg-gray-100 text-gray-700 text-xs sm:text-sm px-3 py-1 rounded-full border border-gray-200"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Closing CTA */}
          <div className="border-t border-gray-200 pt-5 text-center">
            <p className="text-gray-800 font-medium flex items-center justify-center gap-2 flex-wrap">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>
                Hubungi kami sekarang — respon cepat, harga kompetitif,
                konsultasi teknis gratis.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
