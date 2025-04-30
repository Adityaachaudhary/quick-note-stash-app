
import React, { useState, useEffect } from 'react';
import { getNotes } from '@/utils/storage';
import NoteCard, { Note } from './NoteCard';
import { Calendar } from "lucide-react";

interface NotesListProps {
  refreshTrigger: number;
}

const NotesList: React.FC<NotesListProps> = ({ refreshTrigger }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Why useEffect to sync storage → state:
  // useEffect is the perfect hook to handle side effects like fetching data
  // from localStorage. It ensures we load notes when the component mounts and
  // when the refreshTrigger changes, keeping the UI in sync with storage.
  useEffect(() => {
    const loadNotes = () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const loadedNotes = getNotes();
        setNotes(loadedNotes);
      } catch (err) {
        // Why display error banner:
        // Clear error messaging helps users understand when something goes wrong
        // with data loading, rather than showing an empty state that might be confusing
        setError(err instanceof Error ? err.message : 'Failed to load notes');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotes();
  }, [refreshTrigger]);
  
  if (isLoading) {
    return (
      <div className="w-full p-12 flex justify-center">
        <div className="animate-pulse text-center space-y-2">
          <div className="h-6 w-24 bg-muted rounded mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading your notes...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full p-6 bg-destructive/10 text-destructive rounded-md shadow-sm">
        <p className="text-center font-medium">{error}</p>
      </div>
    );
  }
  
  if (notes.length === 0) {
    return (
      <div className="w-full p-12 text-center bg-muted/20 rounded-lg shadow-sm">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">No notes yet</h3>
        <p className="text-muted-foreground">Create your first note to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-xl font-medium mb-6 text-center">Your Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
