// Brand Showcase Component - Clean & Professional with Links
// File: src/components/home/BrandShowcase.tsx

import Image from "next/image";
import Link from "next/link";

const brands = [
  // Row 1 - Top 6
  {
    name: "Allen Bradley",
    logo: "/images/brands/allen-bradley.png",
    link: "/products?brand=allen-bradley",
  },
  {
    name: "Delta",
    logo: "/images/brands/delta.png",
    link: "/products?brand=delta",
  },
  {
    name: "Fuji Electric",
    logo: "/images/brands/fuji electric.png",
    link: "/products?brand=fuji",
  },
  {
    name: "Keyence",
    logo: "/images/brands/keyence.png",
    link: "/products?brand=keyence",
  },
  {
    name: "Mitsubishi",
    logo: "/images/brands/mitsubishi.png",
    link: "/products?brand=mitsubishi",
  },
  {
    name: "Omron",
    logo: "/images/brands/omron.png",
    link: "/products?brand=omron",
  },

  // Row 2 - Bottom 6
  {
    name: "Panasonic",
    logo: "/images/brands/panasonic.png",
    link: "/products?brand=panasonic",
  },
  {
    name: "Proface",
    logo: "/images/brands/proface.png",
    link: "/products?brand=proface",
  },
  {
    name: "Schneider",
    logo: "/images/brands/schneider.png",
    link: "/products?brand=schneider",
  },
  {
    name: "Weintek",
    logo: "/images/brands/weintek.png",
    link: "/products?brand=weintek",
  },
  { name: "ABB", logo: "/images/brands/abb.png", link: "/products?brand=abb" },
  {
    name: "Siemens",
    logo: "/images/brands/siemens.png",
    link: "/products?brand=siemens",
  },
];

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted Partners & Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with leading automation brands to deliver reliable
            industrial solutions
          </p>
        </div>

        {/* Brand Grid - Clean Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Row 1 - Top 6 Brands */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-8">
            {brands.slice(0, 6).map((brand, index) => (
              <Link
                key={brand.name}
                href={brand.link}
                className="group flex items-center justify-center p-6 transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative w-full h-16 transition-all duration-300">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    fill
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Row 2 - Bottom 6 Brands */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {brands.slice(6, 12).map((brand, index) => (
              <Link
                key={brand.name}
                href={brand.link}
                className="group flex items-center justify-center p-6 transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${(index + 6) * 100}ms`,
                }}
              >
                <div className="relative w-full h-16 transition-all duration-300">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} Logo`}
                    fill
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            And many more trusted automation brands
          </p>
        </div>
      </div>
    </section>
  );
}
