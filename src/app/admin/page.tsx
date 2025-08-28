"use client";

import Link from "next/link";
import { Settings, Package, BarChart3, ArrowRight } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminPage() {
  const adminSections = [
    {
      id: "products",
      title: "Product Settings",
      description: "Manage which products accept discount coupons for abandonment prevention",
      icon: Package,
      href: "/admin/products",
      color: "blue"
    },
    {
      id: "analytics",
      title: "Analytics Dashboard", 
      description: "View abandonment prevention statistics and performance metrics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "green"
    }
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Store Administration
            </h1>
          </div>
          <p className="text-gray-600">
            Manage your store's abandonment prevention settings and view analytics
          </p>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={section.href}
                className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`
                        p-2 rounded-lg
                        ${section.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'}
                      `}>
                        <Icon className={`
                          h-6 w-6
                          ${section.color === 'blue' ? 'text-blue-600' : 'text-green-600'}
                        `} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors ml-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Abandonment Prevention System
          </h3>
          <p className="text-blue-700 text-sm">
            Your intelligent system automatically detects when customers are about to leave 
            and presents targeted discount offers to recover potential lost sales. 
            Configure product eligibility and monitor performance through the admin panels above.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}