import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'active:scale-95 w-full inline-flex items-center justify-center rounded-3xl text-black text-md font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none sm:w-auto sm:min-w-[164px]',
  {
    variants: {
      variant: {
        default: 'bg-yellow-300 hover:bg-yellow-200',
        cancel: 'bg-gray-100 hover:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        black: 'bg-black text-white hover:bg-[#191919]',
        outline: 'border border-[#373f51] hover:bg-[#f5f6f9]',
      },
      size: {
        sm: 'h-9 px-6 text-sm sm:min-w-min',
        lg: 'h-14 px-16',
        default: 'h-12 py-2 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
