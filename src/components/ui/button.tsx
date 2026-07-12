import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-semibold transition-all focus-visible:outline-3 focus-visible:outline-[#fbbf24] focus-visible:outline-offset-3 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-br from-[#2563eb] to-[#0e7490] text-white shadow-[0_8px_22px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.55)] hover:-translate-y-px',
        ghost:
          'bg-transparent text-[#f1f5fb] border border-[#2a3654] hover:bg-white/5 hover:border-[#3b4970]',
        outline:
          'bg-transparent text-[#f1f5fb] border border-[#3b4970] hover:bg-white/5',
        danger:
          'bg-[#b91c1c] text-white hover:bg-[#dc2626]',
        link:
          'bg-transparent text-[#3b82f6] hover:text-[#67e8f9] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-[0.95rem]',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'
