import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
