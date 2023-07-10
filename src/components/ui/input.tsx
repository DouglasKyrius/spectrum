import { ElementType, InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  icon?: JSX.Element;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, className, type, disabled, id, hasError, icon: Icon, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          'rounded-md border border-input px-4 py-1 hover:border-[#9ba2b0] focus-within:border-[#222834] hover:focus-within:border-[#222834] transition-colors',
          disabled ? 'cursor-not-allowed opacity-50' : '',
          hasError ? 'border-red-500' : ''
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
        <div className="flex gap-x-1 items-center">
          {Icon || null}
          <input
            type={type}
            className={cn(
              'flex h-8 w-full bg-transparent text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            id={id}
            ref={ref}
            disabled={disabled}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
