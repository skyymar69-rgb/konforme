import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-11 w-full rounded-[10px] border border-[#2a3654] bg-[#0a0e1a]/50 px-4 py-2 text-[0.95rem] text-[#f1f5fb] placeholder:text-[#8b98b8]',
        'transition-colors focus-visible:border-[#3b82f6] focus-visible:outline-3 focus-visible:outline-[#fbbf24] focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
