'use client';

import { motion } from 'framer-motion';

interface DayCellProps {
  date: number;
  isToday?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isInRange?: boolean;
  isWeekend?: boolean;
  onClick?: () => void;
}

export default function DayCell({ date, isToday, isStart, isEnd, isInRange, isWeekend, onClick }: DayCellProps) {
  const isBoundary = isStart || isEnd;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 0.96 }}
      whileTap={{ scale: 0.9 }}
      className={`
        relative w-full h-16 sm:h-24 p-1 sm:p-2 
        border-r border-b border-gray-100 dark:border-slate-700/50 
        cursor-pointer transition-colors duration-200 focus:outline-none 
        flex flex-col items-center justify-center sm:items-start sm:justify-start
        ${isBoundary 
          ? 'bg-blue-100 dark:bg-blue-800' // Strong highlight for exact start/end
          : isInRange 
            ? 'bg-blue-50/70 dark:bg-blue-900/30' // Soft background for middle range
            : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700'}
      `}
    >
      {/* Focus ring for accessibility */}
      <span className="absolute inset-1 rounded-lg opacity-0 focus-visible:opacity-100 ring-2 ring-blue-500 pointer-events-none" />
      
      <span className={`
        text-sm sm:text-base font-medium z-10 w-8 h-8 
        flex items-center justify-center rounded-full transition-all duration-300
        ${isBoundary 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110' 
          : isToday 
            ? 'bg-orange-500 text-white dark:text-white shadow-md ring-2 ring-orange-200 ring-offset-2 dark:ring-offset-slate-800' 
            : isWeekend && !isInRange ? 'text-rose-500 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}
      `}>
        {date}
      </span>
    </motion.button>
  );
}
