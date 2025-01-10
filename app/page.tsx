import type { NextSearchParams } from '~/types'
import { SearchForm } from '~/components/SearchForm'
import { SearchResults } from '~/components/SearchResults'
import { ListingMap } from '~/components/ListingMap'
import { fetchListings } from '~/lib/fetchListings'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<NextSearchParams>
}) {
  const params = await searchParams

  let results

  if (params && Object.keys(params).length !== 0) {
    try {
      results = await fetchListings(params)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className='grid grid-rows-[auto_1fr] h-full'>
      <SearchForm />
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
