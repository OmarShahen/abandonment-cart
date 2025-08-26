"use client";

import { Loader2 } from "lucide-react"; // modern spinner icon
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="w-10 h-10 text-blue-600" />
      </motion.div>
      <span className="ml-3 text-lg font-medium text-gray-600">Loading...</span>
    </div>
  );
}
