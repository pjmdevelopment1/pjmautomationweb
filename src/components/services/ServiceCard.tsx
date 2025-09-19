import Link from "next/link";
import Image from "next/image";
import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Get the first image from the images array
  const primaryImage =
    service.images && service.images.length > 0 ? service.images[0] : null;

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      {/* Card with Full Height and Flex Layout */}
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white h-full flex flex-col">
        {/* Image Section - Fixed Height */}
        {primaryImage && (
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <Image
              src={primaryImage}
              alt={service.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {service.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-900 text-white">Featured</Badge>
              </div>
            )}
          </div>
        )}

        {/* Content Section - Flexible Height */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title - Fixed Space */}
          <div className="mb-3">
            <h3 className="text-xl font-semibold group-hover:text-blue-900 transition-colors leading-tight">
              {service.name}
            </h3>
          </div>

          {/* Description - Fixed Space */}
          <div className="mb-4">
            <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm">
              {service.shortDescription}
            </p>
          </div>

          {/* Features Section - Flexible Space */}
          <div className="flex-1 mb-4">
            {service.features && service.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{service.features.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Learn More Button - Always at Bottom */}
          <div className="mt-auto">
            <div className="flex items-center text-blue-900 font-medium group-hover:gap-2 transition-all">
              Learn More
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
