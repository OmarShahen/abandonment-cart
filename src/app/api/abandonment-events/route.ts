import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { addHours, generateCouponCode } from "@/lib/utils";
import { addAbandonmentEventSchema } from "@/lib/validation/abandonment-event";
import { handleApiError } from "@/lib/error-handler";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const abandonmentEvents = await prisma.abandonmentEvent.findMany();

    return NextResponse.json(
      { accepted: true, abandonmentEvents },
      { status: 200 }
    );
  } catch (error: any) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = addAbandonmentEventSchema.parse(body);

    const { storeId, sessionId, triggerType, items } = data;

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      throw new Error("Store not found");
    }

    const itemsIDs = items.map((item) => item.id);
    const existingItems = await prisma.product.findMany({
      where: { id: { in: itemsIDs } },
      select: { id: true },
    });
    const existingIds = new Set(existingItems.map((item) => item.id));
    const invalidIds = itemsIDs.filter((itemId) => !existingIds.has(itemId));
    if (invalidIds.length > 0) {
      throw new Error(`Invalid item IDs: ${invalidIds.join(", ")}`);
    }

    const result = await prisma.$transaction(async (tx) => {
      const couponData: Prisma.CouponCreateInput = {
        sessionId,
        code: generateCouponCode("SALE", 5),
        expiresAt: addHours(new Date(), 24),
        isRedeemed: false,
        discountPercent: 10,
        store: {
          connect: { id: storeId },
        },
      };

      const newCoupon = await tx.coupon.create({ data: couponData });

      const newAbandonmentEventData: Prisma.AbandonmentEventCreateInput = {
        store: { connect: { id: storeId } },
        coupon: { connect: { id: newCoupon.id } },
        sessionId,
        isAccepted: false,
        isCheckoutCompleted: false,
        triggerEvent: triggerType,
      };

      const newAbandonmentEvent = await tx.abandonmentEvent.create({
        data: newAbandonmentEventData,
      });

      const newAbandonmentCartItemsData = items.map((item) => ({
        abandonmentEventId: newAbandonmentEvent.id,
        productId: item.id,
        productName: item.name,
        productPrice: item.price,
        productQuantity: item.quantity,
      }));

      const newAbandonmentCartItems =
        await tx.abandonmentCartItem.createManyAndReturn({
          data: newAbandonmentCartItemsData,
        });

      return {
        coupon: newCoupon,
        abandonmentEvent: newAbandonmentEvent,
        abandonmentCartItems: newAbandonmentCartItems,
      };
    });

    return NextResponse.json(
      { accepted: true, message: "Event Created Successfully!", ...result },
      { status: 200 }
    );
  } catch (error: any) {
    return handleApiError(error);
  }
}
