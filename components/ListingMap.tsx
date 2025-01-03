'use client'

import type { Listing } from '~/hooks/listingSearch'
import { type JSX } from 'react'
import { Map, Marker, useMap } from '@vis.gl/react-google-maps'

export type ListingMapProps = {
  listings: Listing[] | undefined
}

export function ListingMap({ listings = [] }: ListingMapProps): JSX.Element {
  const map = useMap()

  if (map && listings?.length) {
    const bounds = new google.maps.LatLngBounds()
    listings.forEach((listing) => {
      bounds.extend(
        new google.maps.LatLng(listing.latitude, listing.longitude)
      )
    })
    map.fitBounds(bounds)
  }

  return (
    <Map
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '.5rem'
      }}
      defaultCenter={{ lat: 47.6560479, lng: -122.3603527 }}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!}
    >
      {listings.map((listing) => (
        <Marker
          key={listing._id}
          position={{ lat: listing.latitude, lng: listing.longitude }}
        />
      ))}
    </Map>
  )
}
