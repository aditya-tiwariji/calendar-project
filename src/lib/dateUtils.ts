import { format, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export function getDaysInMonthGrid(date: Date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: startDate,
    end: endDate
  });
}

export function generateDateKey(start: Date, end: Date | null) {
  if (!end || isSameDay(start, end)) {
    return format(start, 'yyyy-MM-dd');
  }
  
  const d1 = isBefore(start, end) ? start : end;
  const d2 = isAfter(end, start) ? end : start;
  return `${format(d1, 'yyyy-MM-dd')}_${format(d2, 'yyyy-MM-dd')}`;
}
