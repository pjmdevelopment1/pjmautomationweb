/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/services/[slug]/page.tsx - FIXED FOR NEXT.JS 15 COMPATIBILITY
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/contentful";
import ServiceDetail from "@/components/services/ServiceDetail";
import Breadcrumb from "@/components/common/Breadcrumb";
import { generateServiceSchema } from "@/lib/schema";
import { getCanonicalUrl } from "@/lib/url";

// ✅ FIXED: Updated interface to make params a Promise
interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// ✅ FIXED: Await params before accessing properties
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params; // 🔧 Await params first
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Prestasi Jaya Maju",
      description: "The requested service could not be found.",
    };
  }

  const title = service.seoTitle;
  const description = service.seoDescription;

  return {
    title,
    description,
    keywords: [
      service.name.toLowerCase(),
      "automation service indonesia",
      "engineering consultation",
      "technical support",
      "parameter setting",
      "commissioning service",
      "jakarta automation",
    ],
    openGraph: {
      title,
      description,
      url: `/services/${service.slug}`,
      type: "website",
      images:
        service.images && service.images.length > 0 // 🟢 Changed condition
          ? [
              {
                url: service.images[0].startsWith("//") // 🟢 Use first image
                  ? `https:${service.images[0]}`
                  : service.images[0],
                width: 1200,
                height: 630,
                alt: service.name,
              },
            ]
          : [],
    },
    alternates: {
      canonical: getCanonicalUrl(`/services/${service.slug}`),
    },
  };
}

// ✅ FIXED: Await params in main component function
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params; // 🔧 Await params first
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="min-h-screen mt-20">
        {/* <div className="container mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              { name: "Home", url: "/" },
              { name: "Services", url: "/services" },
              { name: service.name, url: `/services/${service.slug}` },
            ]}
          />
        </div> */}
        <ServiceDetail service={service} />
      </div>
    </>
  );
}
