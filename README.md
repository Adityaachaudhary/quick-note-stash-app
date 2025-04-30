
# Quick Note Stash

A simple note-taking application built with React that allows users to create and view notes with client-side persistence.

## Setup & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at http://localhost:8080

## Design Decisions

### Storage Strategy
- **Why localStorage + key naming**: Using localStorage provides a simple persistence mechanism without requiring a backend server. The key prefix "note-stash-notes" prevents collisions with other potential localStorage items used by the application.

### Component Design
- **Why separate component files**: Components are separated into individual files following the single responsibility principle. This makes the codebase more maintainable and easier to understand.
- **AddNote component**: Uses controlled inputs with useState for form management, providing tight control over validation and submission flow.
- **NotesList component**: Uses useEffect to sync storage with component state, ensuring data is always fresh when the component mounts or when new notes are added.

### State Management
- **Why local component state**: For this small application, React's built-in useState is sufficient. More complex applications might benefit from context or Redux, but they would add unnecessary complexity here.
- **Parent-child communication**: We use prop passing for communication between components, with callback functions for events like note creation.

### Styling
- **Why Tailwind CSS**: Tailwind provides utility classes that make it fast to style components without leaving the JSX or writing custom CSS files, resulting in more productive development.
- **Card components**: Using shadcn/ui components provides a consistent UI with less boilerplate code, while still allowing customization.

### Navigation
- **Why tab-style navigation**: Simple tab navigation keeps the UI focused on a single task at a time while avoiding more complex routing mechanisms, which would be overkill for a two-view application.

### Error & Loading States
- **Error handling**: Errors during storage operations are caught and displayed in user-friendly messages.
- **Loading indicators**: Loading states provide feedback during operations, even though localStorage operations are typically fast.

## Future Enhancements

- Note editing functionality
- Note deletion
- Search/filter capabilities
- Categories or tags for organizing notes
- Rich text formatting options

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- localStorage for persistence
