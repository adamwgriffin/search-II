import { SearchField } from '~/components/SearchField'
import { Filters } from './Filters'

export function SearchForm() {
  return (
    <div className='flex items-center gap-8 p-4'>
      <SearchField />
      <Filters />
    </div>
  )
}
