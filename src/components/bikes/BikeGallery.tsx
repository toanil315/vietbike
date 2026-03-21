'use client';

import { useState } from 'react';
import { Share2, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function BikeGallery({ images, name }: { images: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-white border border-outline-variant/10 shadow-sm relative group"
      >
        <Image 
          src={images[activeImage]} 
          alt={name} 
          width={1200}
          height={800}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-secondary hover:text-primary transition-colors shadow-lg">
            <Share2 size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-secondary hover:text-primary transition-colors shadow-lg">
            <Heart size={20} />
          </button>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => (
          <button 
            key={i} 
            onClick={() => setActiveImage(i)}
            className={cn(
              "aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all",
              activeImage === i ? "border-primary shadow-md" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={img} alt={`${name} ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer"  width={800} height={600}/>
          </button>
        ))}
      </div>
    </div>
  );
}
