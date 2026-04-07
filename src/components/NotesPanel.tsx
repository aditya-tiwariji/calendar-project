'use client';

import { useState, useEffect } from 'react';
import { format, isSameDay, isBefore } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface NotesPanelProps {
  startDate: Date | null;
  endDate: Date | null;
}

export default function NotesPanel({ startDate, endDate }: NotesPanelProps) {
  const [noteText, setNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('calendarNotes');
    if (stored) {
      try {
        setSavedNotes(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse notes');
      }
    }
  }, []);

  const getDateKey = () => {
    if (!startDate) return null;
    if (!endDate || isSameDay(startDate, endDate)) {
      return format(startDate, 'yyyy-MM-dd');
    }
    const d1 = isBefore(startDate, endDate) ? startDate : endDate;
    const d2 = isBefore(startDate, endDate) ? endDate : startDate;
    return `${format(d1, 'yyyy-MM-dd')}_${format(d2, 'yyyy-MM-dd')}`;
  };

  const getDisplayTitle = () => {
    if (!startDate) return 'Select a date...';
    if (!endDate || isSameDay(startDate, endDate)) {
      return format(startDate, 'PP'); 
    }
    const d1 = isBefore(startDate, endDate) ? startDate : endDate;
    const d2 = isBefore(startDate, endDate) ? endDate : startDate;
    return `${format(d1, 'MMM d')} - ${format(d2, 'MMM d, yyyy')}`;
  };

  const dateKey = getDateKey();
  
  useEffect(() => {
    if (dateKey && savedNotes[dateKey]) {
      setNoteText(savedNotes[dateKey]);
    } else {
      setNoteText('');
    }
    // Reset save msg dynamically when date switches
    setShowSavedMsg(false);
  }, [dateKey, savedNotes]);

  const handleSave = () => {
    if (!dateKey) return;
    const updatedNotes = { ...savedNotes };
    if (!noteText.trim()) {
      delete updatedNotes[dateKey];
    } else {
      updatedNotes[dateKey] = noteText.trim();
    }
    setSavedNotes(updatedNotes);
    localStorage.setItem('calendarNotes', JSON.stringify(updatedNotes));
    
    // Trigger Save Confirmation
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2000);
  };

  if (!isClient) return null; 

  return (
    <motion.div 
      key={dateKey || 'empty'}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full bg-orange-50/90 dark:bg-amber-900/20 rounded-2xl p-6 sm:p-8 shadow-xl border border-orange-200 dark:border-orange-800/50 min-h-[400px] flex flex-col relative overflow-hidden"
    >
      <h3 className="font-bold text-2xl tracking-tight text-orange-900 dark:text-orange-400 mb-2 border-b border-orange-200 dark:border-orange-800/50 pb-3">
        Notes
      </h3>
      
      <p className="text-sm font-semibold text-orange-700/80 dark:text-orange-300/80 mb-6 uppercase tracking-wider">
        {getDisplayTitle()}
      </p>

      {startDate ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col flex-1 gap-4"
        >
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="What needs to be remembered?"
            className="flex-1 w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl border border-orange-200 dark:border-orange-800/50 p-5 focus:ring-4 focus:ring-orange-500/20 outline-none resize-none shadow-inner text-gray-800 dark:text-gray-100 transition-all font-medium leading-relaxed"
          />
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              {showSavedMsg ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  Saved ✔
                </>
              ) : 'Save Note'}
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-slate-500 italic text-center px-4">
          <div className="w-16 h-16 mb-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-orange-300 dark:text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          Select a date or range on the calendar to begin typing.
        </div>
      )}
    </motion.div>
  );
}
