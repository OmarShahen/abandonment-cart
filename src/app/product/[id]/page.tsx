import { notFound } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@/lib/db'
import Layout from '@/components/Layout'
import CartSidebar from '@/components/CartSidebar'
import AddToCartButton from './AddToCartButton'
import { formatPrice } from '@/lib/utils'
import { Star, Shield, Truck, RotateCcw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id }
    })
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.stock < 10 && product.stock > 0 && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Only {product.stock} left
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          {product.category && (
            <span className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wide">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <h1 className="text-4xl font-bold text-slate-900">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-slate-600">(128 reviews)</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-600">{product.stock} in stock</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-slate-900">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-slate-600">2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-slate-600">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-slate-600">30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-slate-600">Premium Quality</span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <AddToCartButton product={product} />
            
            <p className="text-sm text-slate-500">
              Free delivery on orders over $50. Order within the next 2 hours for same-day delivery.
            </p>
          </div>

          {/* Stock Status */}
          <div className="p-4 bg-slate-50 rounded-xl">
            {product.stock > 10 ? (
              <p className="text-green-600 font-medium">✓ In Stock - Ready to ship</p>
            ) : product.stock > 0 ? (
              <p className="text-orange-600 font-medium">⚠ Low Stock - Only {product.stock} left</p>
            ) : (
              <p className="text-red-600 font-medium">✗ Out of Stock</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Product Details */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Product Details</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-slate-600">SKU:</dt>
              <dd className="text-slate-900 font-medium">{product.id.slice(-8).toUpperCase()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Category:</dt>
              <dd className="text-slate-900 font-medium">{product.category || 'General'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Availability:</dt>
              <dd className="text-slate-900 font-medium">
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Weight:</dt>
              <dd className="text-slate-900 font-medium">1.2 kg</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Shipping & Returns</h3>
          <div className="space-y-3 text-slate-600">
            <p>• Free standard shipping on orders over $50</p>
            <p>• Express shipping available for $9.99</p>
            <p>• 30-day return policy</p>
            <p>• Returns must be in original packaging</p>
            <p>• Refunds processed within 5-7 business days</p>
          </div>
        </div>
      </div>

      <CartSidebar />
    </Layout>
  )
} 