import React from 'react';
import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
    <input
      className={`
        w-full p-3 border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:bg-gray-700 dark:border-gray-600 dark:text-white
        ${className} // Aplicamos a className recebida aqui
      `}
      {...props}
    />
  );
  }
);

Input.displayName = 'Input';
