import { cn } from '~/lib/utils'

export type TextLoadingProps = {
  loading: boolean
  children: React.ReactNode
}

export function TextLoading({ loading = false, children }: TextLoadingProps) {
  return (
    <span
      className={cn(
        loading && 'animate-pulse text-gray-400 dark:text-gray-300'
      )}
    >
      {children}
    </span>
  )
}
