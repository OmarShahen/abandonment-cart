import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import Layout from '@/components/Layout'

function ThankYouContent() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      {/* Success Icon */}
      <div className="mb-8">
        <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
      </div>

      {/* Thank You Message */}
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        Thank You for Your Order!
      </h1>
      <p className="text-xl text-slate-600 mb-8">
        Your order has been successfully placed and is being processed.
      </p>

      {/* Order Details */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">What happens next?</h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Order Confirmation</h3>
              <p className="text-slate-600 text-sm">
                You&apos;ll receive an email confirmation with your order details shortly.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Processing & Shipping</h3>
              <p className="text-slate-600 text-sm">
                Your order will be processed within 1-2 business days and shipped via standard delivery.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Delivery</h3>
              <p className="text-slate-600 text-sm">
                Your package will arrive within 3-5 business days with free standard shipping.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <Link href="/">
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
        
        <p className="text-slate-500 text-sm">
          Need help? Contact our customer support at{' '}
          <a href="mailto:support@navonastore.com" className="text-blue-600 hover:underline">
            support@navonastore.com
          </a>
        </p>
      </div>

      {/* Demo Note */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          🚀 Demo Store Notice
        </h3>
        <p className="text-slate-600 text-sm">
          This is a demonstration e-commerce store built with modern web technologies. 
          No actual payment was processed and no real products will be shipped.
        </p>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="animate-pulse">
            <div className="h-24 w-24 bg-slate-200 rounded-full mx-auto mb-8"></div>
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      }>
        <ThankYouContent />
      </Suspense>
    </Layout>
  )
} 