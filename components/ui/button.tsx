import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        /* Navy solid — primary action */
        default:
          'bg-[#2F4156] text-white hover:bg-[#2F4156]/90 shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-[#C8D9E6] bg-white text-[#2F4156] hover:bg-[#C8D9E6]/20',
        secondary:
          'bg-[#C8D9E6]/30 text-[#2F4156] hover:bg-[#C8D9E6]/50',
        ghost:
          'text-[#567C8D] hover:bg-[#C8D9E6]/20 hover:text-[#2F4156]',
        link:
          'text-[#2F4156] underline-offset-4 hover:underline',
        /* Navy→Teal gradient — only for primary CTAs */
        hero:
          'bg-gradient-to-r from-[#2F4156] to-[#567C8D] text-white font-semibold border-0 shadow-md hover:opacity-90 hover:shadow-lg',
        accent:
          'bg-[#567C8D] text-white hover:bg-[#567C8D]/90 shadow-sm',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-11 rounded-md px-7 has-[>svg]:px-5',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
