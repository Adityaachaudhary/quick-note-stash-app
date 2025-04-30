
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

// Define the Note type
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  // Format the date to a human-readable format
  const formattedDate = formatDistanceToNow(
    new Date(note.updatedAt),
    { addSuffix: true }
  );

  // Create a snippet of content (first 100 characters)
  const contentSnippet = note.content.length > 100 
    ? `${note.content.substring(0, 100)}...` 
    : note.content;

  return (
    <Card className="bg-note hover:bg-note-hover border-note-border transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{note.title}</CardTitle>
        <CardDescription className="text-xs">
          Updated {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm whitespace-pre-line">
          {contentSnippet}
        </p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
