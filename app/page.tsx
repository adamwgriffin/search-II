import type { GeocodeSearchResults } from '~/types'
import { SearchForm } from '~/components/SearchForm'
import { SearchResults } from '~/components/SearchResults'
import { ListingMap } from '~/components/ListingMap'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const queryParams = await searchParams
  let results

  if (queryParams && Object.keys(queryParams).length !== 0) {
    // @ts-expect-error Haven't figured out correctly type for this yet
    const queryString = new URLSearchParams(queryParams).toString()
    try {
      const res = await fetch(
        `http://localhost:3001/listing/search/geocode?${queryString}`
      )
      if (!res.ok) {
        console.error('Error in try block:', res)
      }
      results = (await res.json()) as GeocodeSearchResults
    } catch (error) {
      console.error('Error in catch block:', error)
    }
  }

  return (
    <main className='grid grid-rows-[auto_1fr] min-h-screen'>
      <SearchForm />
      <div className='grid grid-cols-2'>
        <div className='p-4'>
          <SearchResults listings={results?.listings} />
        </div>
        <div className='p-4'>
          <ListingMap
            listings={results?.listings}
            coordinates={results?.boundary?.geometry?.coordinates}
            viewport={results?.viewport}
          />
        </div>
      </div>
    </main>
  )
}
