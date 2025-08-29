import { prisma } from "@/lib/db";
import { handleApiError } from "@/lib/error-handler";
import { validateCoupon } from "@/lib/validation/coupon";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = validateCoupon.parse(body);

    const { storeId, sessionId, code } = data;

    const now = new Date();

    const coupon = await prisma.coupon.findFirst({
      where: {
        storeId,
        sessionId,
        code,
        isRedeemed: false,
        expiresAt: { gte: now },
      },
    });

    if (!coupon) {
      throw new Error(`Invalid or expired coupon`);
    }

    return NextResponse.json(
      { message: "Coupon applied successfully", coupon },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    return handleApiError(error);
  }
}
