"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";

export default function ExitIntentPopup() {
  const cartItems = useCart((state) => state.items);
  const [showPopup, setShowPopup] = useState(false);
  const [lastTrigger, setLastTrigger] = useState(0);
  const COOLDOWN = 10000; // 10s cooldown
  const IDLE_TIME = 15000; // 15s idle = abandon on mobile

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let lastScroll = window.scrollY;

    const hasShownThisSession =
      typeof window !== "undefined" &&
      sessionStorage.getItem("abandonment_popup_shown") === "true";

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
        triggerPopup();
      }
    };

    // ---- Mobile: idle detection ----
    const handleUserActivity = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        triggerPopup();
      }, IDLE_TIME);
    };

    // ---- Mobile: scroll-up detection ----
    const handleScroll = () => {
      const delta = lastScroll - window.scrollY;
      if (delta > 50) {
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

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-2">🎁 Wait! Get a Discount!</h2>
        <p className="mb-4">Apply this coupon at checkout to save 10%.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
