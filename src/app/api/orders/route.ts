import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { orderCreationSchema } from "@/lib/validation/order";
import { handleApiError } from "@/lib/error-handler";
import { applyDiscount } from "@/lib/utils";
import { Coupon } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const data = orderCreationSchema.parse(body);

    const { sessionId, customerEmail, customerName, items, couponId } = data;

    // Debug logging
    console.log("Order creation request:", {
      sessionId,
      customerEmail,
      customerName,
      items,
      couponId,
    });

    // Get the store ID (assuming we have one store)
    const store = await prisma.store.findFirst();
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    // Validate that all products exist and get their prices
    const productIds = items.map(
      (item: { productId: string; quantity: number }) => item.productId
    );
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    const existingProductIds = existingProducts.map((p) => p.id);
    const missingProductIds = productIds.filter(
      (id: string) => !existingProductIds.includes(id)
    );

    if (missingProductIds.length > 0) {
      console.error("Missing products:", missingProductIds);
      return NextResponse.json(
        {
          error: "Some products no longer exist",
          missingProducts: missingProductIds,
        },
        { status: 400 }
      );
    }

    // Calculate total from product prices
    const productPriceMap = new Map(
      existingProducts.map((p) => [p.id, p.price])
    );
    const total = items.reduce((sum, item) => {
      const productPrice = productPriceMap.get(item.productId);
      return sum + (productPrice || 0) * item.quantity;
    }, 0);

    let coupon: Coupon | null;
    if (couponId) {
      const now = new Date();
      coupon = await prisma.coupon.findFirst({
        where: {
          id: couponId,
          isRedeemed: false,
          expiresAt: { gte: now },
        },
      });

      if (!coupon) {
        throw new Error(`Coupon is invalid or expired`);
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const ORDER_TOTAL = Number(
        applyDiscount(total, coupon?.discountPercent || 0).toFixed(2)
      );

      const orderData = {
        sessionId,
        customerEmail,
        customerName,
        total: ORDER_TOTAL,
        storeId: store.id,
        status: "completed",
        items: {
          create: items.map(
            (item: { productId: string; quantity: number }) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: productPriceMap.get(item.productId)!,
            })
          ),
        },
      };

      // Create the order with items
      const order = await tx.order.create({
        data: orderData,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update abandonment event if coupon was used
      let updatedAbandonmentEvent = null;
      let updatedCoupon = null;
      if (coupon) {
        updatedAbandonmentEvent = await tx.abandonmentEvent.updateMany({
          where: {
            couponId: coupon.id,
          },
          data: {
            isCheckoutCompleted: true,
            isAccepted: true,
          },
        });

        // Mark coupon as redeemed
        updatedCoupon = await tx.coupon.update({
          where: { id: coupon.id },
          data: { isRedeemed: true },
        });
      }

      return {
        order,
        coupon: updatedCoupon,
        abandonmentEvent: updatedAbandonmentEvent,
      };
    });

    return NextResponse.json(
      { message: "Order created successfully!", ...result },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
