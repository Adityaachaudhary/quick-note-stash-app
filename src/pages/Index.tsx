
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import AddNote from '@/components/AddNote';
import NotesList from '@/components/NotesList';
import { Toaster } from "sonner";

const Index = () => {
  const [activeView, setActiveView] = useState<'add' | 'view'>('add');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNoteAdded = () => {
    // Increment trigger to refresh the notes list
    setRefreshTrigger(prev => prev + 1);
    // Switch to the view notes tab
    setActiveView('view');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-primary">Quick Note Stash</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            A simple place to jot down and keep track of your thoughts and ideas
          </p>
        </header>

        <Navigation activeView={activeView} onViewChange={setActiveView} />

        <main className="py-6">
          <div className="transition-all duration-300 ease-in-out">
            {activeView === 'add' ? (
              <AddNote onNoteAdded={handleNoteAdded} />
            ) : (
              <NotesList refreshTrigger={refreshTrigger} />
            )}
          </div>
        </main>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
