import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[10px] bg-[length:200%_100%] animate-[shimmer_1.6s_ease-in-out_infinite]',
        'bg-[linear-gradient(90deg,rgba(26,34,56,0.6)_0%,rgba(60,75,118,0.7)_50%,rgba(26,34,56,0.6)_100%)]',
        className
      )}
      {...props}
    />
  )
}
