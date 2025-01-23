import { useSearchParams } from 'next/navigation'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchListings } from '~/lib/fetchListings'

const DefalutOptions = {
  showCurrentDataWhileFetching: false
}

export type UseSearchResultsOptions = {
  showCurrentDataWhileFetching: boolean
}

export function useSearchResults(
  options: UseSearchResultsOptions = DefalutOptions
) {
  const searchParams = useSearchParams()

  return useQuery({
    // Run fetchListings() every time search params change
    queryKey: ['search', searchParams.toString()],
    queryFn: () => fetchListings(searchParams),
    staleTime: 1000 * 60,
    // Using keepPreviousData with placeholderData keeps the data from the last
    // request so that we can still show the current data while new data is
    // being fetched:
    // https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries
    placeholderData: options.showCurrentDataWhileFetching
      ? keepPreviousData
      : undefined
  })
}
