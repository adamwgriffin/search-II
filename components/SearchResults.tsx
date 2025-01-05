import type { JSX } from 'react'
import type { Listing } from '~/types'
import { ListingCard } from './ListingCard'

export type SearchResultsProps = {
  listings: Listing[] | undefined
}

export function SearchResults({
  listings = []
}: SearchResultsProps): JSX.Element {
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 overflow-y-auto'>
      {listings.map((listing) => (
        <li key={listing._id}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  )
}
