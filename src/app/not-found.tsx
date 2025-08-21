import Link from 'next/link'
import Layout from '@/components/Layout'
import { Home, Search, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center py-16">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-slate-200 mb-4">404</div>
          <ShoppingBag className="h-24 w-24 text-slate-300 mx-auto" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
          It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Go to Homepage</span>
            </button>
          </Link>
          
          <div className="text-slate-500">
            <p className="mb-4">Or try one of these helpful links:</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/" className="text-blue-600 hover:underline flex items-center space-x-1">
                <Search className="h-4 w-4" />
                <span>Browse Products</span>
              </Link>
              <Link href="/cart" className="text-blue-600 hover:underline flex items-center space-x-1">
                <ShoppingBag className="h-4 w-4" />
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            🚀 Demo Store Notice
          </h3>
          <p className="text-slate-600 text-sm">
            This is a demonstration e-commerce store showcasing modern web development 
            with Next.js, TypeScript, and Tailwind CSS. Start exploring our products!
          </p>
        </div>
      </div>
    </Layout>
  )
} 