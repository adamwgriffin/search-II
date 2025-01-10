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
    // console.log("queryParams:", queryParams)
    let url = 'http://localhost:3001/listing/search'
    if (queryParams.bounds_north) {
      if (queryParams.boundary_id) {
        url += `/boundary/${queryParams.boundary_id}`
        // Remove params that the listing service doens't recognize
        delete queryParams.boundary_id
        delete queryParams.address
        delete queryParams.zoom
      } else {
        url += '/bounds'
      }
    } else {
      url += '/geocode'
    }
    // @ts-expect-error Haven't figured out correct type for this yet
    const queryString = new URLSearchParams(queryParams).toString()
    try {
      const res = await fetch(`${url}?${queryString}`)
      if (!res.ok) {
        throw new Error(await res.text())
      }
      results = (await res.json()) as GeocodeSearchResults
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
