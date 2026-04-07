import { useState } from 'react';
import { addMonths, subMonths, isBefore } from 'date-fns';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const selectDate = (date: Date) => {
    if (!selectionStart) {
      setSelectionStart(date);
      setSelectionEnd(null);
    } else if (selectionStart && !selectionEnd) {
      if (isBefore(date, selectionStart)) {
        setSelectionEnd(selectionStart);
        setSelectionStart(date);
      } else {
        setSelectionEnd(date);
      }
    } else {
      setSelectionStart(date);
      setSelectionEnd(null);
    }
  };

  const clearSelection = () => {
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  return {
    currentDate,
    nextMonth,
    prevMonth,
    selectionStart,
    selectionEnd,
    selectDate,
    clearSelection,
  };
}
