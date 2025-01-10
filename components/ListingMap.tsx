'use client'

import type { ListingSearchGeocodeResponse, URLParams } from '~/types'
import { Map, Marker, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import { getPolygonPaths, getAvailableBounds } from '~/lib/polygon'
import {
  GoogleMapsMapOptions,
  GoogleMapsPolygonOptions
} from '~/lib/googleMapsOptions'
import { MapBoundary } from './MapBoundary'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import { convertBoundsToParams } from '~/lib/polygon'
import { useSearchParams } from 'next/navigation'

export type ListingMapProps = {
  results: ListingSearchGeocodeResponse | null
}

let userAdjustedMap = false

export function ListingMap({ results }: ListingMapProps) {
  const apiIsLoaded = useApiIsLoaded()
  const map = useMap()
  const queryParams = useSearchParams()
  const updateFilters = useUpdateFilters()

  if (!apiIsLoaded) return

  const polygonPaths = getPolygonPaths(results)

  const bounds = getAvailableBounds(
    queryParams,
    polygonPaths,
    results?.viewport || null
  )

  const zoom = Number(queryParams.get('zoom')) || null

  const boundaryId = results?.boundary?._id

  if (bounds) {
    map?.fitBounds(bounds)
  }

  function handleIdle() {
    if (!userAdjustedMap) return
    userAdjustedMap = false
    const mapBounds = map?.getBounds()
    if (!mapBounds) return
    const updatedFilters: URLParams = convertBoundsToParams(mapBounds.toJSON())
    updatedFilters.zoom = map?.getZoom() || GoogleMapsMapOptions.defaultZoom!
    if (boundaryId) {
      updatedFilters.boundary_id = boundaryId
    }
    updateFilters(updatedFilters)
  }

  return (
    <Map
      style={{
        overflow: 'hidden',
        borderRadius: '.5rem'
      }}
      {...GoogleMapsMapOptions}
      onDragend={() => {
        userAdjustedMap = true
      }}
      onIdle={handleIdle}
      zoom={zoom}
    >
      {results?.listings?.map((listing) => (
        <Marker
          key={listing._id}
          position={{ lat: listing.latitude, lng: listing.longitude }}
        />
      ))}
      <MapBoundary
        paths={polygonPaths}
        visible={true}
        options={GoogleMapsPolygonOptions}
      />
    </Map>
  )
}
