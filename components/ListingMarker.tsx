import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { type Listing } from '~/types'
import { formatPriceAbbreviated } from '~/lib/listingHelpers'

export type ListingMarkerProps = Pick<
  Listing,
  'latitude' | 'longitude' | 'listPrice' | 'soldPrice'
>

export function ListingMarker({
  latitude,
  longitude,
  listPrice,
  soldPrice
}: ListingMarkerProps) {
  return (
    <AdvancedMarker
      position={{
        lat: latitude,
        lng: longitude
      }}
    >
      <div
        className='
        flex items-center justify-center
        rounded-full min-h-6 min-w-12
        shadow-md shadow-gray-500 
        font-medium bg-white text-black dark:bg-gray-600 dark:text-white
        '
      >
          {formatPriceAbbreviated(soldPrice || listPrice)}
      </div>
    </AdvancedMarker>
  )
}
