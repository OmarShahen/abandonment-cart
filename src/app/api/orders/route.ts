import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { sessionId, customerEmail, customerName, total, items } = await request.json()

    // Debug logging
    console.log('Order creation request:', { sessionId, customerEmail, customerName, total, items })

    // Get the store ID (assuming we have one store)
    const store = await prisma.store.findFirst()
    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      )
    }

    // Validate that all products exist
    const productIds = items.map((item: { productId: string; quantity: number; price: number }) => item.productId)
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true }
    })
    
    const existingProductIds = existingProducts.map(p => p.id)
    const missingProductIds = productIds.filter((id: string) => !existingProductIds.includes(id))
    
    if (missingProductIds.length > 0) {
      console.error('Missing products:', missingProductIds)
      return NextResponse.json(
        { error: 'Some products no longer exist', missingProducts: missingProductIds },
        { status: 400 }
      )
    }

    // Create the order with items
    const order = await prisma.order.create({
      data: {
        sessionId,
        customerEmail,
        customerName,
        total,
        storeId: store.id,
        status: 'completed',
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 