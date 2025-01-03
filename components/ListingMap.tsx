'use client'

import { useEffect } from 'react'
import { Map, Marker, useMap } from '@vis.gl/react-google-maps'
import { useSearchResults } from '~/hooks/listingSearch'

export function ListingMap() {
  const map = useMap()
  const { data: results } = useSearchResults()

  useEffect(() => {
    if (map && results?.listings) {
      const bounds = new google.maps.LatLngBounds()
      results?.listings.forEach((listing) => {
        bounds.extend(
          new google.maps.LatLng(listing.latitude, listing.longitude)
        )
      })
      map.fitBounds(bounds)
    }
  }, [map, results?.listings])

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
        {results?.listings.map((listing) => (
          <Marker
            key={listing._id}
            position={{ lat: listing.latitude, lng: listing.longitude }}
          />
        ))}
      </Map>

  )
}
