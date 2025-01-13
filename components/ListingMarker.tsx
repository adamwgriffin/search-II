import { AdvancedMarker } from '@vis.gl/react-google-maps'
import { type Listing } from '~/types'
import { formatPriceAbbreviated } from '~/lib/listingHelpers'

export type ListingMarkerProps = {
  listing: Listing
}

export function ListingMarker({ listing }: ListingMarkerProps) {
  return (
    <AdvancedMarker
      position={{
        lat: listing.latitude,
        lng: listing.longitude
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
        {formatPriceAbbreviated(listing.soldPrice || listing.listPrice)}
      </div>
    </AdvancedMarker>
  )
}
