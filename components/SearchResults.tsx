import { ListingCard } from './ListingCard'
import { fetchListings } from '~/lib/fetchListings'
import { NextSearchParams } from '~/types'

export type SearchResultsProps = {
  searchParams: NextSearchParams
}

export async function SearchResults({ searchParams }: SearchResultsProps) {
  const results = await fetchListings(searchParams)

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
