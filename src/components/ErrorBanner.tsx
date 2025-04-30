
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onDismiss }) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <span>{message}</span>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-xs underline hover:no-underline"
          >
            Dismiss
          </button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorBanner;
