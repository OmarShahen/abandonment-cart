'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useCart } from '@/lib/store'
import { Product } from '@/lib/types'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    if (product.stock === 0) return
    
    setIsAdding(true)
    
    // Add the specified quantity to cart
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      setIsAdding(false)
    }, 300)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-slate-700 font-medium">Quantity:</span>
        <div className="flex items-center border border-slate-300 rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 font-medium text-slate-900 min-w-[60px] text-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm text-slate-500">
          {product.stock} available
        </span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding}
        className="w-full flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>
          {isAdding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : `Add ${quantity} to Cart`}
        </span>
      </button>
    </div>
  )
} 