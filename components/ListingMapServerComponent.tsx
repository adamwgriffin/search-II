import { fetchListings } from '~/lib/fetchListings'
import type { NextSearchParams } from '~/types'
import { ListingMap } from './ListingMap'

export type ListingMapServerComponentProps = {
  searchParams: NextSearchParams
}

export async function ListingMapServerComponent({
  searchParams
}: ListingMapServerComponentProps) {
  const results = await fetchListings(searchParams)
  return <ListingMap results={results} />
}
