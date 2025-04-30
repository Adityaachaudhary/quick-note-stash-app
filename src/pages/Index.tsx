
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import AddNote from '@/components/AddNote';
import NotesList from '@/components/NotesList';

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
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Quick Note Stash</h1>
          <p className="text-muted-foreground">
            A simple place to jot down and keep track of your notes
          </p>
        </header>

        <Navigation activeView={activeView} onViewChange={setActiveView} />

        <main className="py-4">
          {activeView === 'add' ? (
            <AddNote onNoteAdded={handleNoteAdded} />
          ) : (
            <NotesList refreshTrigger={refreshTrigger} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
