import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return generateSessionId();

  let sessionId = localStorage.getItem("navona_session_id");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("navona_session_id", sessionId);
  }
  return sessionId;
}

export function applyDiscount(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}

export function generateCouponCode(
  prefix: string = "",
  length: number = 10
): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O, 0, I, l
  const bytes = crypto.randomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }

  return prefix ? `${prefix}-${result}` : result;
}

export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}
