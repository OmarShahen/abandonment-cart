import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check if store already exists (for PostgreSQL deployments)
  let store = await prisma.store.findUnique({
    where: { id: 'store_navona_demo' }
  })

  if (!store) {
    // Create a default store
    store = await prisma.store.create({
      data: {
        id: 'store_navona_demo',
        name: 'Navona Demo Store',
        description: 'A modern demo e-commerce store with complete shopping functionality',
      },
    })
    console.log('Created store:', store.name)
  } else {
    console.log('Store already exists:', store.name)
  }

  // Check if products already exist
  const existingProducts = await prisma.product.count({
    where: { storeId: store.id }
  })

  if (existingProducts > 0) {
    console.log(`${existingProducts} products already exist, skipping seed`)
    return
  }

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        stock: 50,
        category: 'Electronics',
        storeId: store.id,
        isAcceptCoupon: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Minimalist Watch',
        description: 'Elegant minimalist watch with leather strap, perfect for any occasion.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        stock: 25,
        category: 'Accessories',
        storeId: store.id,
        isAcceptCoupon: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans, medium roast, sourced from sustainable farms.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&q=80',
        stock: 100,
        category: 'Food & Beverages',
        storeId: store.id,
        isAcceptCoupon: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Yoga Mat',
        description: 'Professional-grade yoga mat with superior grip and cushioning.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80',
        stock: 75,
        category: 'Fitness',
        storeId: store.id,
        isAcceptCoupon: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Laptop Backpack',
        description: 'Water-resistant laptop backpack with multiple compartments and USB charging port.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
        stock: 40,
        category: 'Bags',
        storeId: store.id,
        isAcceptCoupon: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Home Speaker',
        description: 'Voice-controlled smart speaker with high-quality audio and smart home integration.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80',
        stock: 30,
        category: 'Electronics',
        storeId: store.id,
        isAcceptCoupon: true,
      },
    }),
  ])

  console.log(`Created ${products.length} products`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 