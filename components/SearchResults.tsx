'use client'

import { ListingCard } from '~/components/ListingCard'
import { SearchResultsHeader } from '~/components/SearchResultsHeader'
import { SearchResultsLoading } from '~/components/SearchResultsLoading'
import { useSearchResults } from '~/hooks/useSearchResults'

export function SearchResults() {
  const { data: results, isFetching, isError } = useSearchResults()

  if (isError) {
    return <p>Something went wrong</p>
  }

  return (
    <div>
      <ListingResultsHeader
      <SearchResultsHeader
        listingCount={results?.pagination?.numberAvailable}
        loading={isFetching}
      />
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 overflow-y-auto'>
        {isFetching && <SearchResultsLoading />}
        {!isFetching &&
          results?.listings?.map((listing) => (
            <li key={listing._id}>
              <ListingCard listing={listing} />
            </li>
          ))}
      </ul>
    </div>
  )
}
