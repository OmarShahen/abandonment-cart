"use client";

import { useState, useEffect } from "react";
import { Package, DollarSign, Check, X, Save, RefreshCw } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import AdminTabs from "@/components/admin/AdminTabs";
import StatsCard from "@/components/admin/StatsCard";
import AdminTable from "@/components/admin/AdminTable";
import InfoCard from "@/components/admin/InfoCard";
import api from "@/lib/api";
import { Product } from "@/lib/types";
import Loader from "@/components/Loader";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [changes, setChanges] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (productId: string, currentValue: boolean) => {
    const newValue = !currentValue;
    setChanges((prev) => ({
      ...prev,
      [productId]: newValue,
    }));

    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isAcceptCoupon: newValue }
          : product
      )
    );
  };

  const saveChanges = async (productId: string) => {
    try {
      setSaving(productId);
      const newValue = changes[productId];

      await api.put(`/products/${productId}`, {
        isAcceptCoupon: newValue,
      });

      setChanges((prev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [productId]: removed, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.error("Failed to save changes:", error);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, isAcceptCoupon: !changes[productId] }
            : product
        )
      );
    } finally {
      setSaving(null);
    }
  };

  const saveAllChanges = async () => {
    const changeIds = Object.keys(changes);
    for (const productId of changeIds) {
      await saveChanges(productId);
    }
  };

  const hasUnsavedChanges = Object.keys(changes).length > 0;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Navigation Tabs */}
        <AdminTabs />
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Product Coupon Settings
              </h1>
              <p className="text-gray-600 mt-1">
                Select which products can accept discount coupons for
                abandonment prevention
              </p>
            </div>

            {hasUnsavedChanges && (
              <button
                onClick={saveAllChanges}
                disabled={saving !== null}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Save All Changes ({Object.keys(changes).length})
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                  title="Coupon Eligible"
                  value={products?.filter((p) => p.isAcceptCoupon).length || 0}
                  icon={Check}
                  color="green"
                />
                <StatsCard
                  title="Coupon Ineligible" 
                  value={products?.filter((p) => !p.isAcceptCoupon).length || 0}
                  icon={X}
                  color="red"
                />
                <StatsCard
                  title="Total Products"
                  value={products?.length || 0}
                  icon={Package}
                  color="blue"
                />
              </div>

              {/* Products Table */}
              <AdminTable
                title="Product Settings"
                columns={[
                  { key: "product", header: "Product" },
                  { key: "price", header: "Price" },
                  { key: "category", header: "Category" },
                  { key: "stock", header: "Stock" },
                  { key: "coupons", header: "Accept Coupons" },
                  { key: "actions", header: "Actions" }
                ]}
                data={products}
                loading={loading}
                emptyMessage="No products found"
                renderRow={(product) => (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        {product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {product.category || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm ${
                          product.stock > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          handleToggle(product.id, product.isAcceptCoupon)
                        }
                        className={`
                          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                          ${
                            product.isAcceptCoupon
                              ? "bg-green-600"
                              : "bg-gray-200"
                          }
                          ${
                            changes[product.id] !== undefined
                              ? "ring-2 ring-blue-500 ring-offset-2"
                              : ""
                          }
                        `}
                      >
                        <span
                          className={`
                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                            ${
                              product.isAcceptCoupon
                                ? "translate-x-6"
                                : "translate-x-1"
                            }
                          `}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {changes[product.id] !== undefined && (
                        <button
                          onClick={() => saveChanges(product.id)}
                          disabled={saving === product.id}
                          className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                        >
                          {saving === product.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            "Save"
                          )}
                        </button>
                      )}
                    </td>
                  </>
                )}
              />

              {/* Help Text */}
              <InfoCard
                title="How Coupon Eligibility Works"
                icon={Package}
                color="blue"
              >
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Products with coupons <strong>enabled</strong> can
                    trigger abandonment prevention popups
                  </li>
                  <li>
                    Products with coupons <strong>disabled</strong> won&apos;t
                    show discount offers (good for thin-margin items)
                  </li>
                  <li>
                    Abandonment prevention only activates when cart
                    contains at least one coupon-eligible product
                  </li>
                  <li>
                    Changes are saved individually or you can save all
                    changes at once
                  </li>
                </ul>
              </InfoCard>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
