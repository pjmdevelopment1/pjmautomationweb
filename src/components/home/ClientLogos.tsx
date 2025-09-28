// src/components/home/ClientLogos.tsx
const ClientLogos = () => {
  // For now, using industry types as placeholders
  // Replace with actual client logos when available
  const industries = [
    "Manufacturing",
    "Pharmaceutical",
    "Food & Beverage",
    "Automotive",
    "Chemical",
    "Packaging",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Industries
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Serving various industrial sectors across Indonesia with quality
            automation solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="h-16 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-gray-400">
                  {industry.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{industry}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Join{" "}
            <span className="font-semibold text-teal-600">100+ companies</span>{" "}
            that trust Prestasi Jaya Maju for their automation needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
