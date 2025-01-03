import { SearchForm } from '~/components/SearchForm'
import { SearchResults } from '~/components/SearchResults'
import { ListingMap } from '~/components/ListingMap'

export default function Home() {
  return (
    <main className='grid grid-rows-[auto_1fr] min-h-screen'>
      <SearchForm />
      <div className='grid grid-cols-2'>
        <div className='p-4'>
          <SearchResults />
        </div>
        <div className='p-4'>
          <ListingMap />
        </div>
      </div>
    </main>
  )
}
