import { ListingCardLoading } from './ListingCardLoading'

export function SearchResultsLoading() {
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 overflow-y-auto'>
      <li>
        <ListingCardLoading />
      </li>
      <li>
        <ListingCardLoading />
      </li>
      <li>
        <ListingCardLoading />
      </li>
      <li>
        <ListingCardLoading />
      </li>
    </ul>
  )
}
