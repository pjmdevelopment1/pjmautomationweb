/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/app/about/page.tsx - ENHANCED SEO-OPTIMIZED ABOUT PAGE
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Users,
  Clock,
  Target,
  CheckCircle,
  Settings,
  Wrench,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  MessageSquare,
  Shield,
  Lightbulb,
  TrendingUp,
  Star,
  Handshake,
  BookOpen,
  Zap,
  Eye,
  Heart,
  Rocket,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCanonicalUrl } from "@/lib/url";
import { SITE_CONFIG } from "@/lib/contants";

// SEO Metadata with comprehensive keywords
export const metadata: Metadata = {
  title:
    "Tentang Mederi Karya Indonesia - 8+ Tahun Expertise Automation Engineering",
  description:
    "Engineering Services Company terpercaya untuk industrial automation Indonesia. 8+ tahun pengalaman engineering, technical support, parameter setting, commissioning, konsultasi teknis PLC HMI Inverter.",
  keywords: [
    "tentang mederi karya indonesia",
    "automation company indonesia",
    "engineering services bekasi",
    "industrial automation supplier",
    "plc programming services",
    "technical support automation",
    "parameter setting inverter",
    "commissioning automation",
    "konsultasi teknis automation",
    "automation engineering jakarta",
    "automation parts supplier",
    "one stop solution automation",
  ],
  openGraph: {
    title:
      "Tentang Mederi Karya Indonesia - Engineering Excellence in Automation",
    description:
      "8+ tahun pengalaman engineering dalam industrial automation. Partner terpercaya untuk solusi automation Indonesia.",
    url: "/about",
    type: "website",
    siteName: "Mederi Karya Indonesia",
    locale: "id_ID",
  },
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured Data Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mederi Karya Indonesia",
  alternateName: "MKI",
  url: "https://mederikarya.com",
  logo: "https://mederikarya.com/logo.png",
  description:
    "Engineering Services Company untuk industrial automation dengan 8+ tahun pengalaman",
  foundingDate: "2016",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bekasi",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+6285210067755",
    contactType: "customer service",
    areaServed: "ID",
    availableLanguage: ["Indonesian", "English"],
  },
  sameAs: ["https://wa.me/6285210067755"],
};

export default function AboutPage() {
  // Achievement stats with icons
  const achievements = [
    {
      number: "8+",
      label: "Tahun Pengalaman",
      icon: Clock,
      color: "bg-blue-900",
    },
    {
      number: "500+",
      label: "Produk Tersedia",
      icon: Settings,
      color: "bg-blue-800",
    },
    {
      number: "100+",
      label: "Customer Puas",
      icon: Users,
      color: "bg-blue-900",
    },
    {
      number: "24/7",
      label: "Technical Support",
      icon: Wrench,
      color: "bg-blue-800",
    },
  ];

  // Our services with detailed descriptions
  const services = [
    {
      icon: Settings,
      title: "Parameter Setting",
      description:
        "Konfigurasi expert untuk inverter, PLC, dan HMI untuk performa optimal sistem automation Anda",
      features: ["Inverter Configuration", "PLC Programming", "HMI Setup"],
    },
    {
      icon: Wrench,
      title: "Commissioning",
      description:
        "Testing sistem lengkap, startup, dan validasi untuk memastikan sistem berjalan sempurna",
      features: ["System Testing", "Startup Support", "Performance Validation"],
    },
    {
      icon: GraduationCap,
      title: "Technical Training",
      description:
        "Pelatihan operator dan maintenance untuk tim teknis customer agar dapat mengoperasikan sistem dengan optimal",
      features: [
        "Operator Training",
        "Maintenance Guide",
        "Technical Documentation",
      ],
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description:
        "Testing dan dokumentasi lengkap untuk semua instalasi automation yang kami tangani",
      features: [
        "Quality Testing",
        "Complete Documentation",
        "Performance Report",
      ],
    },
  ];

  // Company values with engaging descriptions
  const values = [
    {
      icon: Wrench,
      title: "Engineering Excellence",
      iconColor: "bg-blue-900",
      description:
        "Kami percaya bahwa keunggulan engineering adalah fondasi dari setiap solusi yang berhasil. Setiap project kami tangani dengan detail, presisi, dan standar kualitas tertinggi.",
    },
    {
      icon: Target,
      title: "Customer Success First",
      iconColor: "bg-blue-800",
      description:
        "Kesuksesan customer adalah prioritas utama kami. Kami tidak hanya menjual produk, tetapi memastikan customer mendapatkan hasil optimal dari setiap investasi automation mereka.",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      iconColor: "bg-blue-900",
      description:
        "Industri automation terus berkembang pesat. Kami berkomitmen untuk selalu update dengan teknologi terbaru agar dapat memberikan solusi yang paling efektif dan efisien.",
    },
    {
      icon: Handshake,
      title: "Reliable Partnership",
      iconColor: "bg-blue-800",
      description:
        "Kepercayaan adalah aset paling berharga dalam bisnis. Kami membangun reputasi melalui konsistensi dalam kualitas, ketepatan waktu, dan komunikasi yang transparan.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Adaptability",
      iconColor: "bg-blue-900",
      description:
        "Setiap challenge customer adalah opportunity untuk berinovasi. Kami selalu mencari cara terbaik untuk menyelesaikan masalah teknis dengan pendekatan yang kreatif dan adaptif.",
    },
  ];

  // Mission points
  const missions = [
    {
      icon: Award,
      title: "Memberikan Solusi Teknis Terbaik",
      description:
        "Menyediakan produk automation berkualitas tinggi yang didukung dengan layanan engineering profesional untuk memastikan implementasi yang optimal dan hasil yang maksimal.",
    },
    {
      icon: Handshake,
      title: "Membangun Partnership Jangka Panjang",
      description:
        "Mengembangkan hubungan kemitraan yang saling menguntungkan dengan customer melalui konsistensi kualitas, komunikasi yang jujur, dan komitmen pada customer success.",
    },
    {
      icon: TrendingUp,
      title: "Mengembangkan Expertise Berkelanjutan",
      description:
        "Terus meningkatkan kapabilitas engineering dan mengikuti perkembangan teknologi automation terkini untuk memberikan solusi yang selalu relevant dan cutting-edge.",
    },
    {
      icon: Star,
      title: "Mendukung Pertumbuhan Industri Indonesia",
      description:
        "Berkontribusi pada kemajuan sektor manufaktur Indonesia dengan menyediakan akses mudah ke teknologi automation modern dan knowledge transfer melalui training dan konsultasi.",
    },
  ];

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* EXISTING HERO SECTION - TIDAK DIUBAH */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-20 mt-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Engineering Excellence in
              <span className="block text-blue-200">Industrial Automation</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Mederi Karya Indonesia delivers comprehensive industrial
              automation solutions combining quality products, engineering
              expertise, and dedicated technical support to help manufacturing
              companies achieve operational excellence.
            </p>

            {/* Enhanced CTA Buttons - TIDAK DIUBAH */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {/* Primary Button - Get Technical Consultation */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Users className="h-5 w-5 mr-2" />
                <span>Get Technical Consultation</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </div>
              </Link>

              {/* Secondary Button - Our Services */}
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Settings className="h-5 w-5 mr-2" />
                <span>Our Services</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW CONTENT SECTIONS */}

      {/* Tentang Kami Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Description */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Tentang Kami
              </h2>
              <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  <strong className="text-blue-900">
                    PT. Mederi Karya Indonesia (MKI)
                  </strong>{" "}
                  adalah Engineering Services Company yang menghadirkan solusi
                  lengkap untuk kebutuhan industrial automation Anda. Didukung
                  oleh lebih dari 8 tahun pengalaman engineering di industri
                  otomasi.
                </p>
                <p>
                  Sebagai <strong>one stop solution provider</strong>, kami
                  tidak hanya menyediakan komponen automation berkualitas tinggi
                  seperti PLC, HMI, Inverter, Servo, Sensor, dan Power Meter,
                  tetapi juga memberikan nilai tambah melalui layanan
                  engineering komprehensif yang mencakup technical support,
                  parameter setting, commissioning, dan konsultasi teknis.
                </p>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {achievements.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Visi Perusahaan
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-900 p-4 rounded-full">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed italic">
                "Menjadi partner terpercaya dalam transformasi industrial
                automation di Indonesia, menghadirkan solusi engineering yang
                inovatif dan berkelanjutan untuk meningkatkan produktivitas dan
                efisiensi industri nasional."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-16">
              Misi Perusahaan
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {missions.map((mission, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900 p-3 rounded-lg group-hover:bg-blue-700 transition-colors">
                      <mission.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {index + 1}. {mission.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {mission.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Perusahaan */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-16">
              Nilai-Nilai Perusahaan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="text-center mb-6">
                    <div
                      className={`${value.iconColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-16">
              Layanan Engineering Kami
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-blue-900 p-3 rounded-lg group-hover:bg-blue-700 transition-colors">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Komitmen Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Komitmen Kami
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <blockquote className="text-xl lg:text-2xl leading-relaxed italic">
                "Kami tidak hanya menyediakan produk automation, tetapi menjadi
                partner engineering yang mendampingi kesuksesan bisnis Anda.
                Setiap project adalah kesempatan untuk membuktikan bahwa
                kombinasi produk berkualitas dan expertise engineering yang
                tepat dapat menghasilkan solusi yang melebihi ekspektasi."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* EXISTING ENHANCED CTA SECTION - TIDAK DIUBAH */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-950 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Work Together?
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Let's discuss your automation needs and how our engineering
                  expertise can help your business succeed.
                </p>

                {/* Contact Information */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-blue-100">
                    <MapPin className="w-5 h-5" />
                    <span>{SITE_CONFIG.company.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-100">
                    <Phone className="w-5 h-5" />
                    <a
                      href="tel:+6285210067755"
                      className="hover:text-white transition-colors"
                    >
                      {SITE_CONFIG.company.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-blue-100">
                    <Phone className="w-5 h-5" />
                    <a
                      href="https://wa.me/6285210067755?text=Halo Mederi Karya, saya membutuhkan informasi mengenai produk / technical support"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Iqbal - 085210067755
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-blue-100">
                    <Mail className="w-5 h-5" />
                    <a
                      href="mailto:iqbalya25@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      {SITE_CONFIG.company.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Enhanced Buttons Section */}
              <div className="space-y-4">
                {/* Primary Button - Get Free Consultation */}
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Users className="h-5 w-5 mr-2" />
                  <span>Get Engineering Consultation</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>
                </Link>

                {/* Secondary Button - WhatsApp */}
                <a
                  href="https://wa.me/6285210067755?text=Halo Mederi Karya, saya tertarik untuk berdiskusi tentang kebutuhan automation perusahaan kami."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span>WhatsApp - Iqbal (Sales Engineer)</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </a>

                {/* Additional Help Text */}
                <p className="text-center text-blue-100 text-sm">
                  Or WhatsApp us for immediate assistance
                </p>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-8 mt-8 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">Response within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">8+ Years Experience</span>
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
