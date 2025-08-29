"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard, User, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/lib/store";
import { applyDiscount, formatPrice, getSessionId } from "@/lib/utils";
import clsx from "clsx";
import api from "@/lib/api";
import { Coupon } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();

  const searchParam = useSearchParams();
  const couponCode = searchParam.get("coupon") || "";

  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();

  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [checkCouponMessage, setCheckCouponMessage] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [coupon, setCoupon] = useState<Coupon>();

  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const totalPrice = applyDiscount(getTotalPrice(), discountPercent);
  const totalItems = getTotalItems();
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + tax;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0 && !orderCompleted) {
      router.push("/cart");
    }
  }, [mounted, items.length, router, orderCompleted]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order in database
      const orderData = {
        sessionId: getSessionId(),
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        couponId: coupon?.id,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Set order completed flag to prevent empty cart redirect
        setOrderCompleted(true);
        // Clear cart and redirect to thank you page
        clearCart();
        router.push(`/thank-you?orderId=${responseData.order.id}`);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      setIsCouponLoading(true);

      const checkCouponData = {
        storeId: "store_navona_demo",
        sessionId: getSessionId(),
        code: couponCode,
      };
      const response = await api.post(`/coupons/validate`, checkCouponData);
      const { coupon, message } = response.data;
      setIsCouponValid(true);
      setCheckCouponMessage(message);
      setDiscountPercent(coupon.discountPercent);
      setCoupon(coupon);
    } catch (error: unknown) {
      console.error(error);
      setIsCouponValid(false);
      const apiError = error as { response?: { data?: { error?: string } } };
      setCheckCouponMessage(apiError?.response?.data?.error || 'Invalid coupon');
    } finally {
      setIsCouponLoading(false);
    }
  };

  if (!mounted) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-64 mb-8"></div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to cart
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        <p className="text-slate-600 mt-2">Complete your order securely</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Shipping Address
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Payment Information
                </h3>
                <Lock className="h-4 w-4 text-green-600" />
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Card number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Expiry date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="nameOnCard"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Name on card
                  </label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    required
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-3"
            >
              <Lock className="h-5 w-5" />
              <span>
                {isProcessing
                  ? "Processing..."
                  : `Place Order • ${formatPrice(finalTotal)}`}
              </span>
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-6 border-t border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">
                Have a promo code?
              </h4>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={couponCode}
                />
                <button
                  onClick={handleApplyCoupon}
                  className={clsx(
                    "cursor-pointer px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors",
                    couponCode && "!bg-blue-600 !text-white"
                  )}
                >
                  {isCouponLoading ? "Applying..." : "Apply"}
                </button>
              </div>
              {checkCouponMessage && (
                <p
                  className={clsx(
                    "text-xs mt-1 font-[500]",
                    isCouponValid ? "text-green-500" : "text-red-500"
                  )}
                >
                  {checkCouponMessage}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-2">
                Discount will be applied before payment processing
              </p>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Secure Checkout</h4>
            </div>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• SSL encrypted payment processing</li>
              <li>• PCI compliant secure checkout</li>
              <li>• 30-day money back guarantee</li>
              <li>• Your data is protected and secure</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
