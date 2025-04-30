import React from 'react';
import { Button } from "@/components/ui/button";

type View = 'add' | 'view';

interface NavigationProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  // Why this nav approach for simplicity:
  // Using simple tab buttons provides clear UI affordance while keeping
  // the app in a single view. This approach avoids more complex routing
  // while still giving users a clear way to navigate between functions.
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button
          variant={activeView === 'add' ? 'default' : 'outline'}
          onClick={() => onViewChange('add')}
          className={`rounded-r-none`}
        >
          Add Note
        </Button>
        <Button
          variant={activeView === 'view' ? 'default' : 'outline'}
          onClick={() => onViewChange('view')}
          className={`rounded-l-none`}
        >
          View Notes
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
