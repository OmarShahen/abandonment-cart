import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId()
  
  let sessionId = localStorage.getItem('navona_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem('navona_session_id', sessionId)
  }
  return sessionId
} 