"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, BarChart3 } from "lucide-react";

export default function AdminTabs() {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/admin/products",
      label: "Product Settings",
      icon: Package,
      description: "Manage coupon eligibility",
      isActive: pathname === "/admin/products"
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "View performance metrics",
      isActive: pathname === "/admin/analytics"
    }
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  tab.isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <div>
                <div>{tab.label}</div>
                <div className="text-xs font-normal opacity-75">
                  {tab.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}