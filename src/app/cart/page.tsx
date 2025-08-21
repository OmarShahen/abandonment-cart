'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus, X, ShoppingBag, Trash2 } from 'lucide-react'
import Layout from '@/components/Layout'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCart()
  const [mounted, setMounted] = useState(false)
  
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-64 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue shopping
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
        </div>
        
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear cart</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        // Empty Cart
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-slate-600 mb-4">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. 
            Start shopping to fill it up!
          </p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        // Cart Items
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">
                          {item.product.name}
                        </h3>
                      </Link>
                      {item.product.category && (
                        <p className="text-sm text-slate-500 mt-1">
                          {item.product.category}
                        </p>
                      )}
                      <p className="text-lg font-semibold text-slate-900 mt-2">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-slate-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-slate-100 transition-colors rounded-l-lg"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 font-medium text-slate-900 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors mt-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tax</span>
                  <span className="font-medium">{formatPrice(totalPrice * 0.08)}</span>
                </div>
                <hr className="border-slate-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice * 1.08)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4">
                  Proceed to Checkout
                </button>
              </Link>

              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
} 