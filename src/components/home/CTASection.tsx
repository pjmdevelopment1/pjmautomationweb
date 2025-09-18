import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, FileText, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/contants";

// VARIANT 1: BLUE GRADIENT (Matches your blue-900/950 theme)
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your Automation System?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Get competitive pricing and expert technical support for all your
            industrial automation needs. Our engineering team is ready to help
            you succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/quote"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FileText className="h-5 w-5 mr-2" />
              <span>Request Quote</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>

            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Users className="h-5 w-5 mr-2" />
              <span>Contact Our Engineers</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-5xl mx-auto">
            <h3 className="text-white font-semibold mb-4">
              Direct Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <a
                href={`tel:${SITE_CONFIG.company.phone}`}
                className="group flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone className="h-5 w-5 text-blue-200 group-hover:rotate-12 transition-transform" />
                <div className="text-left">
                  <p className="text-xs text-blue-200">Call Us</p>
                  <p className="font-semibold text-sm">
                    {SITE_CONFIG.company.phone}
                  </p>
                  <p className="font-semibold text-sm">
                    085210067755 (WhatsApp)
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.company.email}`}
                className="group flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-200 group-hover:rotate-12 transition-transform" />
                <div className="text-left">
                  <p className="text-xs text-blue-200">Email Us</p>
                  <p className="font-semibold text-sm">
                    {SITE_CONFIG.company.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center justify-center gap-3 p-3">
                <MapPin className="h-7 w-7 text-blue-200" />
                <div className="text-left">
                  <p className="text-xs text-blue-200">Location</p>
                  <p className="font-semibold text-xs">
                    {SITE_CONFIG.company.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-blue-100 text-sm mt-6">
            Prefer WhatsApp? Chat with us directly via the floating button →
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
