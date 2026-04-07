import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isBefore,
  isAfter,
  isWithinInterval,
  format,
  isSameDay
} from 'date-fns';

export function getDaysInMonthGrid(date: Date): Date[] {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
}

export function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  
  const actualStart = isBefore(start, end) ? start : end;
  const actualEnd = isBefore(start, end) ? end : start;
  
  return isWithinInterval(date, { start: actualStart, end: actualEnd });
}

export function generateDateKey(start: Date, end: Date | null) {
  if (!end || isSameDay(start, end)) {
    return format(start, 'yyyy-MM-dd');
  }
  
  const d1 = isBefore(start, end) ? start : end;
  const d2 = isAfter(end, start) ? end : start;
  return `${format(d1, 'yyyy-MM-dd')}_${format(d2, 'yyyy-MM-dd')}`;
}
