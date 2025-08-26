"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import api from "@/lib/api";
import { getSessionId } from "@/lib/utils";
import Loader from "./Loader";
import { Coupon } from "@/lib/types";

const COOLDOWN = 10000; // 10s cooldown
const IDLE_TIME = 15000; // 15s idle = abandon on mobile

export default function ExitIntentPopup() {
  const cartItems = useCart((state) => state.items);
  const [showPopup, setShowPopup] = useState(false);
  const [lastTrigger, setLastTrigger] = useState(0);
  const [triggerType, setTriggerType] = useState("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let lastScroll = window.scrollY;

    // const hasShownThisSession =
    //   typeof window !== "undefined" &&
    //   sessionStorage.getItem("abandonment_popup_shown") === "true";

    const hasShownThisSession = false;

    const triggerPopup = () => {
      if (
        cartItems.length > 0 &&
        Date.now() - lastTrigger > COOLDOWN &&
        !showPopup &&
        !hasShownThisSession
      ) {
        setShowPopup(true);
        setLastTrigger(Date.now());
        sessionStorage.setItem("abandonment_popup_shown", "true");
      }
    };

    // ---- Desktop: exit intent ----
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setTriggerType("CURSOR_LEAVE");
        triggerPopup();
      }
    };

    // ---- Mobile: idle detection ----
    const handleUserActivity = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setTriggerType("IDLE");
        triggerPopup();
      }, IDLE_TIME);
    };

    // ---- Mobile: scroll-up detection ----
    const handleScroll = () => {
      const delta = lastScroll - window.scrollY;
      if (delta > 50) {
        setTriggerType("SCROLLUP_FAST");
        triggerPopup();
      }
      lastScroll = window.scrollY;
    };

    // Detect device type
    const isMobile =
      typeof navigator !== "undefined" &&
      /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("touchstart", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);
      handleUserActivity();
    } else {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("touchstart", handleUserActivity);
        window.removeEventListener("keydown", handleUserActivity);
        clearTimeout(idleTimer);
      } else {
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [cartItems, lastTrigger, showPopup]);

  useEffect(() => {
    const createAbandonmentEvent = async () => {
      try {
        setIsLoading(true);

        const items = cartItems.map((cartItem) => ({
          id: cartItem.product.id,
          name: cartItem.product.name,
          price: cartItem.product.price,
          quantity: cartItem.quantity,
        }));

        const eventData = {
          storeId: "store_navona_demo",
          sessionId: getSessionId(),
          triggerType,
          items,
        };
        const response = await api.post(`/abandonment-events`, eventData);
        setCoupon(response.data.coupon);
      } catch (error: any) {
        console.error(error);
        setShowPopup(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (showPopup) createAbandonmentEvent();
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative text-center mx-4 md:mx-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPopup(false)}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 Special Offer Just for You!
            </h2>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Get{" "}
                  <span className="font-semibold text-blue-600">
                    {coupon?.discountPercent}% OFF
                  </span>
                  on your next order.
                </p>

                {/* Coupon Box */}
                <div className="bg-gray-100 border-2 border-dashed border-blue-500 rounded-xl py-3 px-4 mb-4">
                  <p className="text-lg font-mono font-bold tracking-wide text-blue-700">
                    {coupon?.code}
                  </p>
                  <small className="text-gray-500">
                    Use this code at checkout
                  </small>
                </div>

                {/* CTA Button */}
                <div className="flex items-center">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
                  >
                    Apply Coupon
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
