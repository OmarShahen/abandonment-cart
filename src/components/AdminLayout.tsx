"use client";

import { ArrowLeft, Store } from "lucide-react";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Store</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center gap-2">
                <Store className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-gray-900">
                  Admin Dashboard
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Store Owner
                </div>
                <div className="text-xs text-gray-500">
                  Navona Demo Store
                </div>
              </div>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SO</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              NavonaAI Admin Dashboard - Manage your store&apos;s abandonment prevention
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}