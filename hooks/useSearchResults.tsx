import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchListings } from '~/lib/fetchListings'

export function useSearchResults() {
  const searchParams = useSearchParams()

  return useQuery({
    queryKey: ['search', searchParams.toString()], // Updates when search params change
    queryFn: () => fetchListings(searchParams),
    staleTime: 1000 * 60
  })
}
