export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image: string
  stock: number
  category: string | null
  storeId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  sessionId: string
  customerEmail: string | null
  customerName: string | null
  total: number
  status: string
  storeId: string
  createdAt: Date
  updatedAt: Date
} 