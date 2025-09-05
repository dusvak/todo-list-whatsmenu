import React from 'react';
import { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
    <textarea
      rows={3}
      className={`
        w-full p-3 border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-white
        resize-none
        ${className}
      `}
      {...props}
    />
  );
  }
);

Textarea.displayName = 'Textarea';
