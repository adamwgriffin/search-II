import type { NextSearchParams } from '~/types'
import { SearchResults } from '~/components/SearchResults'
import { ListingMap } from '~/components/ListingMap'
import { fetchListings } from '~/lib/fetchListings'
import { SearchField } from '~/components/SearchField'
import { Filters } from '~/components/Filters'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<NextSearchParams>
}) {
  const results = await fetchListings(await searchParams)

  return (
    <main className='grid grid-rows-[auto_1fr] h-full'>
      <div className='flex items-center gap-8 p-4'>
        <SearchField />
        <Filters />
      </div>
      <div className='grid grid-cols-2 h-full min-h-0 min-w-0'>
        <div className='p-4 overflow-y-auto'>
          <SearchResults listings={results?.listings} />
        </div>
        <div className='p-4'>
          <ListingMap results={results} />
        </div>
      </div>
    </main>
  )
}
