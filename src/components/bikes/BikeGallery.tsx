"use client";

import { useState, useEffect } from "react";
import { Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function BikeGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Set hydrated flag after component mounts
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Handle navigation with keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") previousImage();
    if (e.key === "ArrowRight") nextImage();
  };

  const previousImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video rounded-[2.5rem] bg-surface-container/20 flex items-center justify-center">
        <span className="text-secondary text-sm">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Gallery Image */}
      <motion.div
        initial={isHydrated ? { opacity: 0, scale: 0.95 } : false}
        animate={{ opacity: 1, scale: 1 }}
        className="aspect-video rounded-[2.5rem] overflow-hidden bg-white border border-outline-variant/10 shadow-sm relative group"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        suppressHydrationWarning
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={isHydrated ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
            suppressHydrationWarning
          >
            <img
              src={images[activeImage]}
              alt={`${name} - Image ${activeImage + 1}`}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-secondary hover:text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-secondary hover:text-primary hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-secondary hover:text-primary transition-colors shadow-lg"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: name,
                  text: `Check out this ${name} on VietBike!`,
                  url: window.location.href,
                });
              }
            }}
            aria-label="Share"
          >
            <Share2 size={20} />
          </button>
          <button
            className={cn(
              "w-12 h-12 rounded-full backdrop-blur flex items-center justify-center transition-all shadow-lg",
              isFavorite
                ? "bg-red-500/90 text-white"
                : "bg-white/90 text-secondary hover:text-primary",
            )}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full text-white text-xs font-semibold">
            {activeImage + 1} / {images.length}
          </div>
        )}
      </motion.div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={cn(
                "group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-105",
                activeImage === i
                  ? "border-primary shadow-md ring-2 ring-primary/30"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              <img
                src={img}
                alt={`${name} - Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                width={200}
                height={200}
              />
              {activeImage === i && (
                <div className="absolute inset-0 ring-2 ring-primary rounded-2xl" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
