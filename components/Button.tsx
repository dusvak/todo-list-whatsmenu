import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'font-semibold text-white rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75',
  
  variants: {
    variant: {
      primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    size: {
      md: 'text-sm py-2 px-4',
      sm: 'text-xs py-1 px-2',
    },
    fullWidth: {
      true: 'w-full',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  fullWidth,
  ...props
}) => {
  return (
    <button className={button({ variant, size, fullWidth, className })} {...props} />
  );
};
