import { prisma } from '@/lib/db'
import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import CartSidebar from '@/components/CartSidebar'
import { Sparkles, Shield, Truck } from 'lucide-react'

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Navona Store
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Discover amazing products in our beautiful, modern e-commerce store. 
          Experience seamless shopping with our responsive design and smooth checkout.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <span>Quality Products</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-purple-500" />
            <span>Fast Delivery</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
          <div className="text-slate-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-4">
              <Sparkles className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No products found</h3>
            <p className="text-slate-500">Please check back later or run the database seed script.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Demo Info Section */}
      <section className="mt-16 py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl">
        <div className="text-center px-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            🚀 This is a Demo Store
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            This store demonstrates modern e-commerce functionality built with Next.js, 
            TypeScript, and Tailwind CSS. Features include product catalog, shopping cart, 
            checkout process, and order management with beautiful responsive design.
          </p>
        </div>
      </section>

      <CartSidebar />
    </Layout>
  )
}
