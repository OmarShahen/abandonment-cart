'use client'

import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function CartSidebar() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <ShoppingBag className="h-16 w-16 mb-4 text-slate-300" />
              <p className="text-lg mb-2">Your cart is empty</p>
              <p className="text-sm text-center">Add some products to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-slate-50 rounded-xl p-4">
                  {/* Product Image */}
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-medium text-slate-900 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link href="/cart" onClick={() => setOpen(false)}>
                <button className="w-full bg-slate-200 text-slate-900 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors">
                  View Cart
                </button>
              </Link>
              <Link href="/checkout" onClick={() => setOpen(false)}>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 