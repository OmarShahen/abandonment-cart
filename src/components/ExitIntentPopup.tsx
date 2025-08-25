"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/store";

export default function ExitIntentPopup() {
  const cartItems = useCart((state) => state.items);
  const [showPopup, setShowPopup] = useState(false);
  const [lastTrigger, setLastTrigger] = useState(0); // for cooldown
  const COOLDOWN = 10000; // 10 seconds
  const IDLE_TIME = 15000; // 15 seconds idle for mobile

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    // Desktop: exit-intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        cartItems.length > 0 &&
        Date.now() - lastTrigger > COOLDOWN &&
        !showPopup
      ) {
        setShowPopup(true);
        setLastTrigger(Date.now());
      }
    };

    // Mobile: idle detection
    const handleUserActivity = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (
          cartItems.length > 0 &&
          Date.now() - lastTrigger > COOLDOWN &&
          !showPopup
        ) {
          setShowPopup(true);
          setLastTrigger(Date.now());
        }
      }, IDLE_TIME);
    };

    // Mobile: scroll up detection
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const delta = lastScroll - window.scrollY;
      if (
        delta > 50 && // fast upward scroll
        cartItems.length > 0 &&
        Date.now() - lastTrigger > COOLDOWN &&
        !showPopup
      ) {
        setShowPopup(true);
        setLastTrigger(Date.now());
      }
      lastScroll = window.scrollY;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);

    handleUserActivity(); // start idle timer

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      clearTimeout(idleTimer);
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
