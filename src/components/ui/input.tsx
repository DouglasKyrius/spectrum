import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, disabled, id, ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-md border border-input px-4 py-1 hover:border-[#9ba2b0] focus-within:border-[#222834] hover:focus-within:border-[#222834] transition-colors',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          className
        )}
      >
        {label ? (
          <label
            className={cn(
              'text-[#677084] text-xs',
              disabled ? 'cursor-not-allowed' : ''
            )}
            htmlFor={id}
          >
            {label}
          </label>
        ) : null}
        <input
          type={type}
          className="flex h-8 w-full bg-transparent text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id={id}
          ref={ref}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };