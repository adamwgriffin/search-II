import { SearchResults } from '~/components/SearchResults'
import { ListingMap } from '~/components/ListingMap'
import { SearchHeader } from '~/components/SearchHeader'

export default async function Home() {
  return (
    <main className='grid grid-rows-[auto_1fr] h-full'>
      <SearchHeader />
      <div className='grid grid-cols-2 h-full min-h-0 min-w-0'>
        <div className='p-4 overflow-y-auto'>
          <SearchResults />
        </div>
        <div className='p-4'>
          <ListingMap />
        </div>
      </div>
    </main>
  )
}
