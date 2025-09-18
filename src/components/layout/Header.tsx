/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/layout/Header.tsx - ORIGINAL MKI WITH MINIMAL CHANGES
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ChevronDown,
  ChevronRight,
  Home,
  Package,
  Briefcase,
  Info,
  BookOpen,
  MessageSquare,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { PRODUCT_CATEGORIES } from "@/lib/contants";
import Image from "next/image";

const Header = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", hasDropdown: true, icon: Package },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "About", href: "/about", icon: Info },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo - POSITIONED BETTER LEFT */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none -ml-2"
          >
            <div className="relative w-40 h-9 lg:w-60 lg:h-14 pointer-events-none select-none">
              <Image
                src="/images/pjmlogo.png"
                alt="PJM Logo"
                fill
                className="object-contain"
                priority
                draggable={false}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Products Dropdown - ORIGINAL STYLE */}
                {item.name === "Products" && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-3 max-h-[70vh] overflow-y-auto">
                      {/* View All Products Link */}
                      <Link
                        href="/products"
                        className="flex items-center justify-between px-6 py-3 text-slate-900 font-medium hover:bg-blue-50 hover:text-blue-900 transition-colors border-b border-slate-100"
                      >
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-3 text-blue-900" />
                          View All Products
                        </div>
                        <ChevronRight className="h-4 w-4 text-blue-900" />
                      </Link>

                      {/* Category Links */}
                      {PRODUCT_CATEGORIES.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/products?category=${category.slug}`}
                          className="flex items-center px-6 py-3 text-slate-700 hover:text-blue-900 hover:bg-blue-50 transition-colors"
                        >
                          <span className="w-2 h-2 bg-blue-900 rounded-full mr-4 flex-shrink-0" />
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Get Quote Button - SIMPLE BLUE */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden lg:inline-flex bg-blue-900 hover:bg-blue-950 text-white shadow-lg transition-all"
            >
              <Link href="/quote">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Get Quote
              </Link>
            </Button>

            {/* Mobile Menu - Sheet Drawer ORIGINAL */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] sm:w-[380px] p-0"
                >
                  <SheetHeader className="px-6 py-4 border-b">
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">
                            PJM Automation
                          </p>
                          <p className="text-xs text-slate-500">
                            Industrial Automation
                          </p>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile Navigation Content - ORIGINAL DRAWER */}
                  <div className="flex flex-col h-full">
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.name} className="mb-2">
                            {item.hasDropdown ? (
                              <div>
                                {/* Products Accordion */}
                                <button
                                  onClick={() =>
                                    setIsProductsOpen(!isProductsOpen)
                                  }
                                  className="w-full flex items-center justify-between py-3 px-4 text-left font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <Icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                  </div>
                                  <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                      isProductsOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                {/* Products Submenu - ORIGINAL */}
                                {isProductsOpen && (
                                  <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-1">
                                    <SheetClose asChild>
                                      <Link
                                        href="/products"
                                        className="flex items-center gap-3 py-2 px-4 text-sm text-blue-900 hover:bg-blue-50 rounded-lg font-medium"
                                      >
                                        <Package className="h-4 w-4" />
                                        All Products
                                      </Link>
                                    </SheetClose>
                                    <div className="h-px bg-slate-100 my-2" />
                                    {PRODUCT_CATEGORIES.map((category) => (
                                      <SheetClose asChild key={category.slug}>
                                        <Link
                                          href={`/products?category=${category.slug}`}
                                          className="block py-2 px-4 text-sm text-slate-600 hover:text-blue-900 hover:bg-slate-50 rounded-lg transition-colors pl-12"
                                        >
                                          {category.name}
                                        </Link>
                                      </SheetClose>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-3 py-3 px-4 font-medium text-slate-700 hover:text-blue-900 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                  <Icon className="h-5 w-5" />
                                  <span>{item.name}</span>
                                </Link>
                              </SheetClose>
                            )}
                          </div>
                        );
                      })}
                    </nav>

                    {/* Mobile Actions - ORIGINAL STYLE */}
                    <div className="border-t p-4 space-y-3">
                      <SheetClose asChild>
                        <Button
                          asChild
                          size="lg"
                          className="w-full bg-blue-900 hover:bg-blue-950"
                        >
                          <Link href="/quote">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Get Quote
                          </Link>
                        </Button>
                      </SheetClose>

                      <div className="text-center">
                        <p className="text-xs text-slate-500">
                          Need help? Contact our team
                        </p>
                        <SheetClose asChild>
                          <Link
                            href="/contact"
                            className="text-xs text-blue-900 hover:underline"
                          >
                            Contact Support →
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
