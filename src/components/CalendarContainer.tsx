'use client';

import { useState } from 'react';
import { addMonths, subMonths, isBefore } from 'date-fns';
import { motion } from 'framer-motion';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';

export default function CalendarContainer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } 
    else if (startDate && !endDate) {
      if (isBefore(date, startDate)) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto w-full items-stretch"
    >
      <div className="flex-1 w-full flex flex-col relative z-20 shadow-2xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
        <CalendarHeader 
          currentDate={currentDate} 
          onPrevMonth={handlePrevMonth} 
          onNextMonth={handleNextMonth} 
        />
        <CalendarGrid 
          currentDate={currentDate} 
          startDate={startDate} 
          endDate={endDate} 
          onSelectDate={handleDateClick} 
        />
      </div>
      
      <div className="w-full lg:w-96 flex-shrink-0 relative z-10 lg:translate-x-0">
        <NotesPanel 
          startDate={startDate} 
          endDate={endDate} 
        />
      </div>
    </motion.div>
  );
}
