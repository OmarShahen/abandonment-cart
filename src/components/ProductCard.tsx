'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-blue-200 transform hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          {product.category && (
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-slate-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Rating (Mock) */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-slate-500 text-sm ml-2">(128 reviews)</span>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
} 