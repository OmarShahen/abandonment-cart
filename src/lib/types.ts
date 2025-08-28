import { TriggerEvent } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  stock: number;
  category: string | null;
  storeId: string;
  isAcceptCoupon: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  sessionId: string;
  customerEmail: string | null;
  customerName: string | null;
  total: number;
  status: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  id: string;
  storeId: string;
  sessionId: string;
  code: string;
  discountPercent: number;
  isRedeemed: boolean;
  expiresAt: Date;
  createdAt: Date;
}

export interface AbandonmentEvent {
  id: string;
  storeId: string;
  sessionId: string;
  couponId: string;
  isAccepted: boolean;
  isCheckoutCompleted: boolean;
  triggerEvent: TriggerEvent;
  createdAt: Date;
}
