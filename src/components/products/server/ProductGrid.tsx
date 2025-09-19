/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// src/components/products/server/ProductGrid.tsx - FIXED VERSION
// 📊 PURE SERVER COMPONENT - 4-Column Grid Layout
// ✅ No client state - URL-based state management
// ✅ Server-side pagination - SEO friendly
// ✅ NO EVENT HANDLERS - Pure server component
// ✅ 4-column responsive grid - UPDATED LAYOUT
// ✅ VIEW TOGGLE REMOVED - Grid only

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productStyles, getGridClasses } from "../shared/ProductStyles";
import type { ProductGridServerProps, ViewMode } from "../shared/ProductTypes";
import ProductCardServer from "./ProductCard";

export default function ProductGridServer({
  products,
  currentPage,
  totalPages,
  totalProducts,
  baseUrl,
  searchParams,
  viewMode = "grid",
  enablePagination = true,
  itemsPerPage = 12,
  className = "",
}: ProductGridServerProps) {
  // 🔧 URL GENERATION HELPERS
  const generateUrl = (params: Record<string, string | number | undefined>) => {
    const urlParams = new URLSearchParams();

    // Preserve existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page" && key !== "sort") {
        urlParams.set(key, value);
      }
    });

    // Add new params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        urlParams.set(key, String(value));
      }
    });

    const queryString = urlParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const getPaginationUrl = (page: number) => {
    if (page < 1 || page > totalPages) return baseUrl;
    return generateUrl({ page: page === 1 ? undefined : page });
  };

  // 📄 PAGINATION LOGIC
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // 🔍 SORT OPTIONS
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "name", label: "Name A-Z" },
    { value: "brand", label: "Brand A-Z" },
    { value: "category", label: "Category" },
  ];

  const currentSort = searchParams.sort || "newest";
  const currentView = "grid"; // Fixed to grid view

  // 🚫 NO PRODUCTS STATE
  if (products.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6 text-6xl">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms.
          </p>
          <div className="space-y-3">
            <Button asChild>
              <Link href="/products">View All Products</Link>
            </Button>
            <p className="text-sm text-gray-500">
              Or{" "}
              <Link
                href="/contact"
                className="text-blue-900 hover:text-blue-950"
              >
                contact us
              </Link>{" "}
              for custom product sourcing
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 🎨 GRID CLASSES - 4-COLUMN LAYOUT
  const gridClasses = `${getGridClasses(currentView)} ${className}`;

  return (
    <div>
      {/* 🛠️ TOOLBAR */}
      <div className={productStyles.toolbar.container}>
        {/* Results Info */}
        <div className={productStyles.toolbar.info}>
          Showing{" "}
          <span className={productStyles.toolbar.infoHighlight}>
            {products.length}
          </span>{" "}
          of{" "}
          <span className={productStyles.toolbar.infoHighlight}>
            {totalProducts}
          </span>{" "}
          products
          {currentPage > 1 && (
            <span className="ml-2 text-gray-500">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>

        {/* Controls */}
        <div className={productStyles.toolbar.controls}>
          {/* Sort Dropdown - PURE FORM (NO EVENT HANDLERS) */}
          <div className={productStyles.toolbar.sortGroup}>
            <label className={productStyles.toolbar.sortLabel}>Sort by:</label>
            <form method="GET" action={baseUrl} className="inline">
              {/* Preserve search params as hidden inputs */}
              {Object.entries(searchParams).map(([key, value]) => {
                if (key !== "sort" && value) {
                  return (
                    <input key={key} type="hidden" name={key} value={value} />
                  );
                }
                return null;
              })}

              <select
                name="sort"
                defaultValue={currentSort}
                className={productStyles.toolbar.sortSelect}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-blue-900 text-white rounded text-sm hover:bg-blue-950"
              >
                Apply
              </button>
            </form>
          </div>

          {/* VIEW MODE TOGGLE SECTION REMOVED */}
          {/* This section has been completely removed */}
        </div>
      </div>

      {/* 📊 PRODUCT GRID - 4-COLUMN LAYOUT */}
      <div className={gridClasses}>
        {products.map((product, index) => (
          <ProductCardServer
            key={product.id}
            product={product}
            viewMode={currentView}
            preloadImage={index < 4} // Preload first 4 images for better LCP
          />
        ))}
      </div>

      {/* 📄 PAGINATION */}
      {enablePagination && totalPages > 1 && (
        <div className={productStyles.pagination.container}>
          {/* Page Info */}
          <div className={productStyles.pagination.info}>
            Page {currentPage} of {totalPages}
          </div>

          {/* Pagination Controls */}
          <div className={productStyles.pagination.controls}>
            {/* Previous Button */}
            {currentPage > 1 ? (
              <Link
                href={getPaginationUrl(currentPage - 1)}
                className={`${productStyles.pagination.button} ${productStyles.pagination.buttonInactive}`}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Link>
            ) : (
              <span
                className={`${productStyles.pagination.button} ${productStyles.pagination.buttonDisabled}`}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </span>
            )}

            {/* Page Numbers */}
            <div className={productStyles.pagination.pageNumbers}>
              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {page === "..." ? (
                    <span className={productStyles.pagination.ellipsis}>
                      ...
                    </span>
                  ) : (
                    <Link
                      href={getPaginationUrl(page as number)}
                      className={`${productStyles.pagination.button} ${
                        currentPage === page
                          ? productStyles.pagination.buttonActive
                          : productStyles.pagination.buttonInactive
                      }`}
                    >
                      {page}
                    </Link>
                  )}
                </span>
              ))}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
              <Link
                href={getPaginationUrl(currentPage + 1)}
                className={`${productStyles.pagination.button} ${productStyles.pagination.buttonInactive}`}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            ) : (
              <span
                className={`${productStyles.pagination.button} ${productStyles.pagination.buttonDisabled}`}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            )}
          </div>
        </div>
      )}

      {/* 📱 MOBILE PAGINATION (Load More Button) */}
      {enablePagination && totalPages > 1 && currentPage < totalPages && (
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href={getPaginationUrl(currentPage + 1)}>
              Load More Products
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
