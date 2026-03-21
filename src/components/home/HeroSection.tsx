'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-on-surface">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/vietnam-road-trip/1920/1080"
          alt="Vietnam Road"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface via-on-surface/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Premium Bike Rentals in Vietnam
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]"
          >
            Ride Your <br />
            <span className="text-primary italic">Adventure.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-xl mb-12 leading-relaxed"
          >
            Curated fleet of premium motorbikes for the discerning traveler.
            Explore Vietnam's hidden gems with style and reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/bikes"
              className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group"
            >
              Explore Fleet{" "}
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Play size={14} fill="currentColor" />
              </div>
              How it works
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-12 right-12 hidden lg:flex gap-12 text-white">
        <div>
          <p className="text-4xl font-bold mb-1">500+</p>
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
            Happy Riders
          </p>
        </div>
        <div className="w-px h-12 bg-white/20"></div>
        <div>
          <p className="text-4xl font-bold mb-1">12</p>
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
            Cities Covered
          </p>
        </div>
        <div className="w-px h-12 bg-white/20"></div>
        <div>
          <p className="text-4xl font-bold mb-1">4.9</p>
          <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
            Average Rating
          </p>
        </div>
      </div>
    </section>
  );
}
