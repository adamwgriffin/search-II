import type { GeocodeSearchResults } from '~/types'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

async function fetchGeocodeSearchResults(
  queryString: string
): Promise<GeocodeSearchResults> {
  const response = await fetch(`/api/listing/search/geocode?${queryString}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export function useSearchResults() {
  const searchParams = useSearchParams()

  return useQuery({
    queryKey: ['search', searchParams.toString()], // Updates when search params change
    queryFn: () => fetchGeocodeSearchResults(searchParams.toString()),
    // Optional: configure stale time, cache time, etc.
    staleTime: 1000 * 60 // Data considered fresh for 1 minute
  })
}
