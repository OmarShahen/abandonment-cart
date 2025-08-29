"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  MousePointer2, 
  Clock, 
  Smartphone,
  BarChart3,
  Users,
  ShoppingCart,
  CheckCircle
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import AdminTabs from "@/components/admin/AdminTabs";
import MetricCard from "@/components/admin/MetricCard";
import InfoCard from "@/components/admin/InfoCard";
import ProgressBar from "@/components/admin/ProgressBar";
import Loader from "@/components/Loader";

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

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/abandonment-events");
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      const data = await response.json();
      const events = data.abandonmentEvents;

      const totalEvents = events.length;
      const acceptedCoupons = events.filter((e: { isAccepted: boolean }) => e.isAccepted).length;
      const completedCheckouts = events.filter((e: { isCheckoutCompleted: boolean }) => e.isCheckoutCompleted).length;
      
      const triggerBreakdown = events.reduce((acc: Record<string, number>, event: { triggerEvent: string }) => {
        acc[event.triggerEvent] = (acc[event.triggerEvent] || 0) + 1;
        return acc;
      }, { CURSOR_LEAVE: 0, IDLE: 0, SCROLLUP_FAST: 0 });

      const conversionRate = totalEvents > 0 ? (completedCheckouts / totalEvents) * 100 : 0;
      const acceptanceRate = totalEvents > 0 ? (acceptedCoupons / totalEvents) * 100 : 0;

      setAnalytics({
        totalEvents,
        acceptedCoupons,
        completedCheckouts,
        triggerBreakdown,
        conversionRate,
        acceptanceRate
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'CURSOR_LEAVE': return MousePointer2;
      case 'IDLE': return Clock;
      case 'SCROLLUP_FAST': return Smartphone;
      default: return BarChart3;
    }
  };

  const getTriggerLabel = (trigger: string) => {
    switch (trigger) {
      case 'CURSOR_LEAVE': return 'Mouse Exit';
      case 'IDLE': return 'Idle Timeout';
      case 'SCROLLUP_FAST': return 'Fast Scroll Up';
      default: return trigger;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Navigation Tabs */}
        <AdminTabs />
        
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Abandonment Prevention Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Track the performance of your abandonment prevention campaigns
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader />
            </div>
          ) : !analytics ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Data</h3>
              <p className="text-gray-500">Failed to load analytics data</p>
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Events"
                  value={analytics.totalEvents}
                  icon={Users}
                  color="blue"
                />
                <MetricCard
                  title="Coupons Accepted"
                  value={analytics.acceptedCoupons}
                  icon={CheckCircle}
                  color="green"
                />
                <MetricCard
                  title="Completed Orders"
                  value={analytics.completedCheckouts}
                  icon={ShoppingCart}
                  color="purple"
                />
                <MetricCard
                  title="Conversion Rate"
                  value={`${analytics.conversionRate.toFixed(1)}%`}
                  icon={TrendingUp}
                  color={analytics.conversionRate >= 10 ? "green" : "yellow"}
                />
              </div>

              {/* Conversion Rates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <ProgressBar
                      label="Coupon Acceptance Rate"
                      percentage={analytics.acceptanceRate}
                      value={`${analytics.acceptanceRate.toFixed(1)}%`}
                      color="blue"
                    />
                    <ProgressBar
                      label="Checkout Completion Rate"
                      percentage={analytics.conversionRate}
                      value={`${analytics.conversionRate.toFixed(1)}%`}
                      color="green"
                    />

                    <div className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {analytics.acceptedCoupons}
                          </div>
                          <div className="text-xs text-gray-500">Interested Users</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {analytics.totalEvents - analytics.acceptedCoupons}
                          </div>
                          <div className="text-xs text-gray-500">Dismissed Popups</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trigger Breakdown */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Trigger Breakdown</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.triggerBreakdown).map(([trigger, count]) => {
                      const percentage = analytics.totalEvents > 0 ? (count / analytics.totalEvents) * 100 : 0;
                      
                      return (
                        <div key={trigger} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-100 rounded-full p-2 mr-3">
                              {React.createElement(getTriggerIcon(trigger), { className: "h-4 w-4 text-gray-600" })}
                            </div>
                            <span className="text-sm text-gray-900">
                              {getTriggerLabel(trigger)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="bg-gray-200 rounded-full h-2 w-16 mr-3">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                              {count} ({percentage.toFixed(0)}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {analytics.totalEvents === 0 && (
                    <div className="text-center py-8">
                      <BarChart3 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No abandonment events yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Insights */}
              <InfoCard
                title="Performance Insights"
                icon={TrendingUp}
                color="indigo"
              >
                <div className="space-y-1">
                  {analytics.totalEvents === 0 ? (
                    <p>No abandonment events recorded yet. Users need to add items to cart to trigger abandonment prevention.</p>
                  ) : (
                    <>
                      <p>• <strong>{analytics.acceptanceRate.toFixed(1)}%</strong> of users who see the abandonment popup accept the coupon offer</p>
                      <p>• <strong>{analytics.conversionRate.toFixed(1)}%</strong> of abandonment events result in completed purchases</p>
                      <p>• Most common trigger: <strong>{getTriggerLabel(Object.entries(analytics.triggerBreakdown).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A')}</strong></p>
                      {analytics.conversionRate < 5 && (
                        <p>• Consider improving your coupon offer or popup timing to increase conversion rates</p>
                      )}
                    </>
                  )}
                </div>
              </InfoCard>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}