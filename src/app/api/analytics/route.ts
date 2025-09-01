import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/error-handler";

interface AnalyticsData {
  totalEvents: number;
  acceptedCoupons: number;
  completedCheckouts: number;
  triggerBreakdown: {
    CURSOR_LEAVE: number;
    IDLE: number;
    SCROLLUP_FAST: number;
  };
  conversionRate: number;
  acceptanceRate: number;
}

export async function GET() {
  try {
    // Use database aggregation for efficient counting
    const [
      totalEvents,
      acceptedCoupons,
      completedCheckouts,
      triggerBreakdown
    ] = await Promise.all([
      // Total events count
      prisma.abandonmentEvent.count(),
      
      // Accepted coupons count
      prisma.abandonmentEvent.count({
        where: { isAccepted: true }
      }),
      
      // Completed checkouts count
      prisma.abandonmentEvent.count({
        where: { isCheckoutCompleted: true }
      }),
      
      // Trigger breakdown using groupBy
      prisma.abandonmentEvent.groupBy({
        by: ['triggerEvent'],
        _count: {
          triggerEvent: true
        }
      })
    ]);

    // Transform trigger breakdown to expected format
    const triggerCounts = {
      CURSOR_LEAVE: 0,
      IDLE: 0,
      SCROLLUP_FAST: 0
    };
    
    triggerBreakdown.forEach(item => {
      if (item.triggerEvent in triggerCounts) {
        triggerCounts[item.triggerEvent as keyof typeof triggerCounts] = item._count.triggerEvent;
      }
    });

    const conversionRate = totalEvents > 0 ? (completedCheckouts / totalEvents) * 100 : 0;
    const acceptanceRate = totalEvents > 0 ? (acceptedCoupons / totalEvents) * 100 : 0;

    const analytics: AnalyticsData = {
      totalEvents,
      acceptedCoupons,
      completedCheckouts,
      triggerBreakdown: triggerCounts,
      conversionRate,
      acceptanceRate
    };

    return NextResponse.json(
      { success: true, analytics },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}