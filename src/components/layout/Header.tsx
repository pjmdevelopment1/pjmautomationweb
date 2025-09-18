/* eslint-disable @typescript-eslint/no-unused-vars */
// Header Component - Refined Simple Design
// File: src/components/layout/Header.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    hasDropdown: true,
    dropdownItems: [
      { name: "All Products", href: "/products", icon: Package },
      { name: "PLC Systems", href: "/products?category=plc", icon: Settings },
      { name: "HMI Displays", href: "/products?category=hmi", icon: Settings },
      { name: "VFD Drives", href: "/products?category=vfd", icon: Settings },
      { name: "Sensors", href: "/products?category=sensors", icon: Settings },
    ],
  },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Fix hydration - only run after mount
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo Section - Original Size */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
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
            <nav className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center px-5 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[100px] justify-center ${
                      pathname === item.href ? "text-blue-600 bg-blue-50" : ""
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-3 max-h-[70vh] overflow-y-auto">
                        {item.dropdownItems?.map((dropItem, index) => (
                          <Link
                            key={dropItem.name}
                            href={dropItem.href}
                            className="flex items-center px-6 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <dropItem.icon className="h-4 w-4 mr-3 text-blue-500" />
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Get Quote Button - Simple */}
            <div className="flex items-center gap-4">
              <Link
                href="/quote"
                className="hidden lg:inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Get Quote
              </Link>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // After mount - full functionality
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/60"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/60"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo Section - Original Style with Better Positioning */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
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

          {/* Desktop Navigation - Uniform Sizing */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center px-5 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[100px] justify-center ${
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Products Dropdown - Blue Theme */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-3 max-h-[70vh] overflow-y-auto">
                      {/* View All Products Link */}
                      <Link
                        href="/products"
                        className="flex items-center justify-between px-6 py-3 text-slate-900 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-100"
                      >
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-3 text-blue-500" />
                          View All Products
                        </div>
                        <span className="text-blue-500">→</span>
                      </Link>

                      {/* Category Links */}
                      {item.dropdownItems?.slice(1).map((dropItem, index) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="flex items-center px-6 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <dropItem.icon className="h-4 w-4 mr-3 text-blue-500" />
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions - Better Alignment */}
          <div className="flex items-center gap-4">
            {/* Get Quote Button - Simple Blue */}
            <Link
              href="/quote"
              className="hidden lg:inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Get Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-200 shadow-lg rounded-b-xl">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-3 text-base font-medium rounded-lg transition-colors min-w-[120px] ${
                    pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Quote Button */}
              <Link
                href="/quote"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center mt-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
