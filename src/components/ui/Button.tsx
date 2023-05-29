import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, FC } from 'react';

export const buttonVariants = cva(
  'active:scale-95 w-full inline-flex items-center justify-center rounded-3xl text-black text-md font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none sm:w-auto sm:min-w-[164px]',
  {
    variants: {
      variant: {
        default: 'bg-yellow-300 hover:bg-yellow-200',
        cancel: 'bg-gray-100 hover:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        black: 'bg-black text-white hover:bg-[#191919]',
      },
      size: {
        default: 'h-12 py-2 px-8',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-14 px-16',
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

export const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
};
