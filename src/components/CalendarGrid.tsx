import { isSameMonth, getDate, isSameDay, isWeekend } from 'date-fns';
import { getDaysInMonthGrid, isDateInRange } from '@/utils/dateUtils';
import DayCell from './DayCell';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({ currentDate, startDate, endDate, onSelectDate }: CalendarGridProps) {
  const days = getDaysInMonthGrid(currentDate);

  return (
    <div className="bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-b-2xl shadow-xl border border-t-0 border-gray-200 dark:border-slate-700 relative z-10 w-full mb-8 lg:mb-0">
      <div className="grid grid-cols-7 w-full border-t border-l border-gray-100 dark:border-slate-700/50 bg-gray-50 dark:bg-slate-800 rounded-tl-lg overflow-hidden">
        
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-3 text-center text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider border-r border-b border-gray-100 dark:border-slate-700/50">
            {w}
          </div>
        ))}
        
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          const isStart = startDate ? isSameDay(day, startDate) : false;
          const isEnd = endDate ? isSameDay(day, endDate) : false;
          const inRange = isDateInRange(day, startDate, endDate);
          const isWknd = isWeekend(day);
          
          return (
            <div key={day.toString()} className={isCurrentMonth ? "" : "opacity-40 grayscale pointer-events-none"}>
              <DayCell 
                date={getDate(day)} 
                isToday={isSameDay(day, new Date())} 
                isStart={isStart}
                isEnd={isEnd}
                isInRange={inRange && !isStart && !isEnd}
                isWeekend={isWknd}
                onClick={() => onSelectDate(day)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
