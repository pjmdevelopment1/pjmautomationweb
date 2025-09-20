export interface Service {
  [x: string]: any;
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  images: string[];
  features?: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}