import type { NextSearchParams } from '~/types'
import { SearchResults } from '~/components/SearchResults'
import { SearchHeader } from '~/components/SearchHeader'
import { Suspense } from 'react'
import { SearchResultsLoading } from '~/components/SearchResultsLoading'
import { ListingMapLoading } from '~/components/ListingMapLoading'
import { ListingMapServerComponent } from '~/components/ListingMapServerComponent'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<NextSearchParams>
}) {
  const params = await searchParams

  return (
    <main className='grid grid-rows-[auto_1fr] h-full'>
      <SearchHeader />
      <div className='grid grid-cols-2 h-full min-h-0 min-w-0'>
        <div className='p-4 overflow-y-auto'>
          <Suspense
            key={JSON.stringify(params)}
            fallback={<SearchResultsLoading />}
          >
            <SearchResults searchParams={params} />
          </Suspense>
        </div>
        <div className='p-4'>
          <Suspense
            key={JSON.stringify(params)}
            fallback={<ListingMapLoading />}
          >
            <ListingMapServerComponent searchParams={params} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
