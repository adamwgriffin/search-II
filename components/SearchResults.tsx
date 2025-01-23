'use client'

import { ListingCard } from '~/components/ListingCard'
import { useSearchResults } from '~/hooks/useSearchResults'
import { SearchResultsLoading } from '~/components/SearchResultsLoading'

export function SearchResults() {
  const { data: results, isLoading, isError } = useSearchResults()

  if (isError) {
    return <p>Something went wrong</p>
  }

  if (isLoading) {
    return (
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 overflow-y-auto'>
        <SearchResultsLoading />
      </ul>
    )
  }

  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 overflow-y-auto'>
      {results?.listings?.map((listing) => (
        <li key={listing._id}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  )
}
