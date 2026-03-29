"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-12 relative z-20">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-outline-variant/10 flex flex-wrap items-center gap-8">
        <div className="flex-1 min-w-50 space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Location
          </label>
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-primary" />
            <select className="bg-transparent font-bold text-on-surface focus:outline-none w-full appearance-none cursor-pointer">
              <option>Ho Chi Minh City</option>
              <option>Hanoi</option>
              <option>Da Nang</option>
              <option>Da Lat</option>
            </select>
          </div>
        </div>
        <div className="w-px h-12 bg-outline-variant/20 hidden md:block"></div>
        <div className="flex-1 min-w-50 space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Pickup Date
          </label>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-primary" />
            <input
              type="date"
              className="bg-transparent font-bold text-on-surface focus:outline-none w-full cursor-pointer"
            />
          </div>
        </div>
        <div className="w-px h-12 bg-outline-variant/20 hidden md:block"></div>
        <div className="flex-1 min-w-50 space-y-2">
          <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
            Search
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="bg-transparent font-bold text-on-surface focus:outline-none w-full"
              placeholder="Search by bike name"
              readOnly
            />
          </div>
        </div>
        <Link
          href="/bikes"
          className="bg-on-surface text-white px-10 py-5 rounded-2xl font-bold hover:bg-on-surface/90 transition-all shadow-lg"
        >
          Search
        </Link>
      </div>
    </div>
  );
}
