'use client'

import { useSearchResults } from '~/hooks/listingSearch'

export function SearchResults() {
  const { data: results, isLoading, isError } = useSearchResults()

  return (
    <>
      {isLoading && 'Loading...'}
      {isError && 'Error fetching data'}
      {results?.listings && (
        <ul>
          {results.listings.map((listing) => (
            <li key={listing._id}>{listing._id}</li>
          ))}
        </ul>
      )}
    </>
  )
}
