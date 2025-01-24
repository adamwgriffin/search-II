import { Suspense } from 'react'
import { SortMenu } from '~/components/SortMenu'

export function ListingResultsHeader() {
  return (
    <div className='flex items-center justify-between pb-4'>
      <div>Listings Found message</div>
      <Suspense>
        <SortMenu />
      </Suspense>
    </div>
  )
}
