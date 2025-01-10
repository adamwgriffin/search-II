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
  
  // Get center if available
  const centerLat = queryParams.center_lat
    ? Number(queryParams.center_lat)
    : undefined
  const centerLng = queryParams.center_lng
    ? Number(queryParams.center_lng)
    : undefined
  delete queryParams.center_lat
  delete queryParams.center_lng

  let results

  if (queryParams && Object.keys(queryParams).length !== 0) {
    // console.log("queryParams:", queryParams)
    let url = 'http://localhost:3001/listing/search'
    if (queryParams.bounds_north) {
      if (queryParams.boundary_id) {
        url += `/boundary/${queryParams.boundary_id}`
        delete queryParams.boundary_id
        delete queryParams.address
      } else {
        url += '/bounds'
      }
    } else {
      url += '/geocode'
    }
    // @ts-expect-error Haven't figured out correctly type for this yet
    const queryString = new URLSearchParams(queryParams).toString()
    try {
      const res = await fetch(`${url}?${queryString}`)
      if (!res.ok) {
        console.error('Error in try block:', res)
      }
      results = (await res.json()) as GeocodeSearchResults
    } catch (error) {
      console.error('Error in catch block:', error)
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
          <ListingMap results={results} lat={centerLat} lng={centerLng} />
        </div>
      </div>
    </main>
  )
}
