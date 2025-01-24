'use client'

import { ListingCard } from '~/components/ListingCard'
import { ListingResultsHeader } from '~/components/ListingResultsHeader'
import { SearchResultsLoading } from '~/components/SearchResultsLoading'
import { useSearchResults } from '~/hooks/useSearchResults'

export function SearchResults() {
  const { data: results, isLoading, isError } = useSearchResults()

  if (isError) {
    return <p>Something went wrong</p>
  }

  return (
    <div>
      <ListingResultsHeader />
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 overflow-y-auto'>
        {isLoading && <SearchResultsLoading />}
        {!isLoading &&
          results?.listings?.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))}
      </ul>
    </div>
  )
}
