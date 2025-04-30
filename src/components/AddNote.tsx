
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addNote } from "@/utils/storage";
import { toast } from 'sonner';
import { Save } from "lucide-react";

interface AddNoteProps {
  onNoteAdded: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Why I chose useState + this submit handler:
  // Using useState for form inputs provides a simple way to track changes
  // and manage the controlled inputs. The submit handler centralizes the
  // validation, save operation, and feedback in one place.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) {
      toast.error('Please enter a title for your note');
      return;
    }
    
    try {
      // Why show spinner here:
      // Even though localStorage operations are typically fast,
      // showing a saving indicator provides immediate feedback to the user
      // and prepares the UI pattern for potential future server operations
      setIsSaving(true);
      
      // Add the note to storage
      addNote({ title: title.trim(), content: content.trim() });
      
      // Notify parent component that a note was added
      onNoteAdded();
      
      // Reset form and show success message
      setTitle('');
      setContent('');
      toast.success('Note saved successfully');
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to save note');
      }
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-muted shadow-lg animate-fade-in">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-center text-primary">Create a New Note</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your note title here..."
              disabled={isSaving}
              className="focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              rows={8}
              disabled={isSaving}
              className="resize-y min-h-[150px] focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="animate-pulse mr-2">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Note
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNote;
