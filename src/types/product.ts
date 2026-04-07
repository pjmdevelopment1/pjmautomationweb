/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/types/product.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  model: string;
  description: string | any;
  specification: ProductSpecification[];
  images: string[];
  datasheet?: string;
  price?: number;
  priceNote?: string;
  showPrice: boolean; // Default to false if not set
  inStock: boolean; // Default to false if not set
  feature: boolean; // Default to false if not set
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
  unit?: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image?: string;
  productCount: number;
}

export interface QuoteRequest {
  id?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  product: QuoteProduct[];
  message?: string;
  urgency: "low" | "medium" | "high";
  status?: "pending" | "quoted" | "closed";
  createdAt?: string;
}

export interface QuoteProduct {
  productId: string;
  productName: string;
  quantity: number;
  specifications?: string;
}
