
// Storage utility for managing notes in localStorage
// Why localStorage + key naming: Using localStorage for simplicity and persistence
// without requiring any backend setup. The key prefix "note-stash-" helps avoid
// collisions with other localStorage items that might be used by the application.

const NOTES_KEY = 'note-stash-notes';

// Type definition for Note
/**
 * @typedef {Object} Note
 * @property {string} id - Unique identifier for the note
 * @property {string} title - Title of the note
 * @property {string} content - Content of the note
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * Get all notes from localStorage
 * @returns {Note[]} Array of notes or empty array if none found
 */
export const getNotes = () => {
  try {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error("Failed to get notes from localStorage:", error);
    throw new Error("Failed to load notes. Please try again.");
  }
};

/**
 * Save all notes to localStorage
 * @param {Note[]} notes - Array of notes to save
 */
export const saveNotes = (notes) => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to save notes to localStorage:", error);
    throw new Error("Failed to save notes. You may have exceeded storage quota.");
  }
};

/**
 * Add a new note to localStorage
 * @param {Omit<Note, 'id' | 'createdAt' | 'updatedAt'>} note - Note data without id and timestamps
 * @returns {Note} The newly created note with id and timestamps
 */
export const addNote = ({ title, content }) => {
  const notes = getNotes();
  const newNote = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const updatedNotes = [newNote, ...notes];
  saveNotes(updatedNotes);
  
  return newNote;
};

/**
 * Delete a note from localStorage
 * @param {string} id - ID of the note to delete
 * @returns {boolean} True if deletion was successful
 */
export const deleteNote = (id) => {
  const notes = getNotes();
  const updatedNotes = notes.filter(note => note.id !== id);
  
  if (updatedNotes.length === notes.length) {
    return false; // Note with given ID not found
  }
  
  saveNotes(updatedNotes);
  return true;
};

/**
 * Update an existing note
 * @param {string} id - ID of the note to update
 * @param {Partial<Pick<Note, 'title' | 'content'>>} updates - Fields to update
 * @returns {Note | null} Updated note or null if not found
 */
export const updateNote = (id, { title, content }) => {
  const notes = getNotes();
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex === -1) {
    return null; // Note not found
  }
  
  const updatedNote = {
    ...notes[noteIndex],
    ...(title !== undefined && { title }),
    ...(content !== undefined && { content }),
    updatedAt: new Date().toISOString()
  };
  
  notes[noteIndex] = updatedNote;
  saveNotes(notes);
  
  return updatedNote;
};
