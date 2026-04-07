import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  dateKey: string;
  text: string;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('calendar_notes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse notes from local storage', e);
      }
    }
  }, []);

  const addNote = (dateKey: string, text: string) => {
    if (!text.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      dateKey,
      text: text.trim()
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem('calendar_notes', JSON.stringify(newNotes));
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    localStorage.setItem('calendar_notes', JSON.stringify(newNotes));
  };

  return { notes, addNote, deleteNote };
}
