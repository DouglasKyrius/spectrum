'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const Root = DialogPrimitive.Root;

const Trigger = DialogPrimitive.Trigger;
const Close = DialogPrimitive.Close;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-all duration-100 animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in-75',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-[100] grid w-full gap-4 rounded-t-2xl border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-75 data-[state=open]:slide-in-from-bottom-10 sm:min-w-[512px] sm:p-12 sm:rounded-2xl sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0',
        className
      )}
      {...props}
    >
      {children}
      <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
Content.displayName = DialogPrimitive.Content.displayName;

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center', className)}
    {...props}
  />
);
Header.displayName = 'DialogHeader';

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col sm:justify-end items-center gap-y-4',
      className
    )}
    {...props}
  />
);
Footer.displayName = 'DialogFooter';

const Icon = React.forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, src, alt, ...props }, ref) => (
  <Image
    className={cn('m-auto', className)}
    ref={ref}
    src={src}
    width={72}
    height={72}
    alt={alt}
    {...props}
  />
));
Icon.displayName = 'Icon';

const Title = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-4xl font-bold tracking-tight max-w-md m-auto pb-2 lg:pb-4',
      className
    )}
    {...props}
  />
));
Title.displayName = DialogPrimitive.Title.displayName;

const Description = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-gray-500 m-auto', className)}
    {...props}
  />
));
Description.displayName = DialogPrimitive.Description.displayName;

export const Dialog = {
  Root,
  Trigger,
  Content,
  Header,
  Icon,
  Footer,
  Title,
  Close,
  Description,
};
