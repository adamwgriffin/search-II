'use client'

import type { Listing, MultiPolygon, ViewportLatLngBounds } from '~/types'
import { Map, Marker, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import {
  convertGeojsonCoordinatesToPolygonPaths,
  getAvailableBounds
} from '~/lib/polygon'
import { GoogleMapsPolygonOptions } from '~/lib/googleMapsOptions'
import { MapBoundary } from './MapBoundary'

export type ListingMapProps = {
  listings: Listing[] | undefined
  coordinates: MultiPolygon | undefined
  viewport: ViewportLatLngBounds | undefined
}

export function ListingMap({
  listings = [],
  coordinates,
  viewport
}: ListingMapProps) {
  const apiIsLoaded = useApiIsLoaded()
  const map = useMap()

  if (!apiIsLoaded) return

  const paths = coordinates
    ? convertGeojsonCoordinatesToPolygonPaths(coordinates)
    : null

  const bounds = getAvailableBounds(paths, viewport || null)
  if (map && bounds) {
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
      <MapBoundary
        paths={paths}
        visible={true}
        options={GoogleMapsPolygonOptions}
      />
    </Map>
  )
}
