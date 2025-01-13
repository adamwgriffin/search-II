import omitBy from 'lodash/omitBy'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { objectToQueryString } from '~/lib/listingSearchParams'
import { URLParams } from '~/types'

export function useUpdateFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return function (newParams: URLParams) {
    const mergedParams = { ...Object.fromEntries(searchParams), ...newParams }
    const nonEmptyparams = omitBy(mergedParams, (value) => !value)
    const updatedQueryString = objectToQueryString(nonEmptyparams)
    const url =
      updatedQueryString === '' ? pathname : `${pathname}?${updatedQueryString}`
    router.push(url)
  }
}
