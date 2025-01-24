import isEqual from 'lodash/isEqual'
import omitBy from 'lodash/omitBy'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DefaultFilters, objectToQueryString } from '~/lib/listingSearchParams'
import type { URLParams } from '~/types'

export function useUpdateFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return function (newParams: URLParams) {
    const merged = { ...Object.fromEntries(searchParams), ...newParams }
    const truthyValues = omitBy(merged, (value) => !value)
    const defaultsRemoved = omitBy(truthyValues, (value, key) =>
      isEqual(value, DefaultFilters[key])
    )
    const updatedQueryString = objectToQueryString(defaultsRemoved)
    const url =
      updatedQueryString === '' ? pathname : `${pathname}?${updatedQueryString}`
    router.push(url)
  }
}
