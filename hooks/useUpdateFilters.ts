import {
  type ReadonlyURLSearchParams,
  useSearchParams,
  useRouter,
  usePathname
} from 'next/navigation'

function getUpdatedSearchParams(
  currentParams: ReadonlyURLSearchParams,
  newParams: Record<string, string>
) {
  const updatedParams = new URLSearchParams(currentParams.toString())
  Object.entries(newParams).forEach(([key, value]) => {
    if (value) {
      updatedParams.set(key, value)
    } else {
      updatedParams.delete(key)
    }
  })
  return updatedParams
}

export function useUpdatedFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return function (newParams: Record<string, string>) {
    const updatedQueryString = getUpdatedSearchParams(
      searchParams,
      newParams
    ).toString()
    const url =
      updatedQueryString === '' ? pathname : `${pathname}?${updatedQueryString}`
    router.push(url)
  }
}
