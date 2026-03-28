import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[var(--radius-sm)] bg-muted/80 ring-1 ring-border/30',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
