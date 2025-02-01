import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { type Listing } from '~/types'
import { formatPriceAbbreviated } from '~/lib/listingHelpers'
import { cn } from '~/lib/utils'

export type ListingMarkerProps = Pick<
  Listing,
  'latitude' | 'longitude' | 'listPrice' | 'soldPrice'
> & { loading: boolean }

export function ListingMarker({
  latitude,
  longitude,
  listPrice,
  soldPrice,
  loading
}: ListingMarkerProps) {
  return (
    <AdvancedMarker
      position={{
        lat: latitude,
        lng: longitude
      }}
    >
      <div
        className='flex items-center justify-center
          rounded-full min-h-6 min-w-12
          shadow-md shadow-gray-500 
          font-medium text-black dark:text-white bg-background dark:bg-gray-600'
      >
        <span
          className={cn(
            loading && 'animate-pulse text-gray-400 dark:text-gray-300'
          )}
        >
          {formatPriceAbbreviated(soldPrice || listPrice)}
        </span>
      </div>
    </AdvancedMarker>
  )
}
