"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useUIStore } from "@/store/uiStore";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

export default function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts);
  const removeToast = useUIStore((state) => state.removeToast);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} className="text-emerald-500" />;
      case "error":
        return <AlertCircle size={20} className="text-red-500" />;
      case "warning":
        return <AlertTriangle size={20} className="text-amber-500" />;
      case "info":
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200/30",
          text: "text-emerald-900",
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200/30",
          text: "text-red-900",
        };
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200/30",
          text: "text-amber-900",
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200/30",
          text: "text-blue-900",
        };
    }
  };

  return (
    <div className="fixed bottom-6 right-6 max-w-md z-50 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const styles = getStyles(toast.type);

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className={`${styles.bg} ${styles.border} ${styles.text} border rounded-2xl p-4 mb-3 flex items-start gap-3 shadow-lg backdrop-blur pointer-events-auto`}
            >
              <div className="shrink-0 mt-0.5">{getIcon(toast.type)}</div>

              <p className="flex-1 text-sm font-medium leading-relaxed">
                {toast.message}
              </p>

              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-current hover:opacity-70 transition-opacity"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
