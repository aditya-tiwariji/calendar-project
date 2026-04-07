'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-64 sm:h-80 bg-slate-900 rounded-t-2xl overflow-hidden shadow-inner group">
      {/* Hero Image Background with Fallback Safety */}
      <div className="absolute inset-0 w-full h-full bg-slate-800 flex items-center justify-center">
        {!imageError ? (
          <Image
            src="/calendar.jpg"
            alt="Calendar hero"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
            onError={() => setImageError(true)}
            className="opacity-70 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
          />
        ) : (
          <div className="flex flex-col items-center justify-center opacity-40 text-slate-400 pointer-events-none pb-8">
             {/* Subdued fallback state when image strictly fails */}
             <ImageIcon className="w-16 h-16 mb-2" />
             <span className="text-sm font-medium tracking-wide border border-slate-500/50 px-4 py-1 rounded-full uppercase">Cover Not Found</span>
          </div>
        )}
      </div>
      
      {/* Hanging rings effect at top */}
      <div className="absolute -top-4 left-0 w-full flex justify-around px-4 sm:px-8 z-20 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-4 h-10 sm:w-5 sm:h-12 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-500 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.8)] border border-gray-600/50 relative">
            <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-white/20 rounded-full" />
          </div>
        ))}
      </div>

      {/* Improved gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent pointer-events-none" />

      {/* Navigation & Title */}
      <div className="absolute bottom-0 w-full p-4 sm:p-8 flex items-end justify-between z-10 text-white">
        <div className="flex flex-col">
          <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            {format(currentDate, 'MMMM')}
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-medium opacity-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-orange-200 mt-1">
            {format(currentDate, 'yyyy')}
          </span>
        </div>
        
        <div className="flex gap-2 sm:gap-3 relative z-20">
          <button 
            onClick={onPrevMonth} 
            className="p-2 sm:p-3 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full transition-all active:scale-95 group/btn shadow-lg outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer border border-white/10" 
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover/btn:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onNextMonth} 
            className="p-2 sm:p-3 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full transition-all active:scale-95 group/btn shadow-lg outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer border border-white/10" 
            aria-label="Next Month"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
