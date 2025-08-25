"use client";

import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import ExitIntentPopup from "./ExitIntentPopup";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { getTotalItems, getTotalPrice, setOpen } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ExitIntentPopup />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-slate-800 hover:text-blue-600 transition-colors"
            >
              <Store className="h-8 w-8" />
              <span className="text-xl font-bold">Navona Store</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/cart"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cart
              </Link>
            </nav>

            {/* Cart Button */}
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">
                {formatPrice(totalPrice)}
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Store className="h-6 w-6" />
            <span className="text-lg font-semibold">Navona Demo Store</span>
          </div>
          <p className="text-slate-400">
            A modern e-commerce demo store built with Next.js and TypeScript
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Complete shopping experience with beautiful, responsive design
          </p>
        </div>
      </footer>
    </div>
  );
}
