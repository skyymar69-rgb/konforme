import { cn } from '@/lib/utils'

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="inline-block size-7 rounded-[8px] bg-gradient-to-br from-[#2563eb] to-[#06b6d4] shadow-[0_4px_14px_rgba(37,99,235,0.45)]"
      />
      {withText && (
        <span className="font-bold tracking-tight text-base text-[#f1f5fb]">
          Konforme
        </span>
      )}
    </span>
  )
}
