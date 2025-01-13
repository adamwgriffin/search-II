'use client'

import { Map, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import { useSearchParams } from 'next/navigation'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import {
  GoogleMapsMapOptions,
  GoogleMapsPolygonOptions
} from '~/lib/googleMapsOptions'
import {
  convertBoundsToParams,
  getAvailableBounds,
  getPolygonPaths
} from '~/lib/polygon'
import type { ListingSearchGeocodeResponse, URLParams } from '~/types'
import { ListingMarker } from './ListingMarker'
import { MapBoundary } from './MapBoundary'

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
        <ListingMarker key={listing._id} listing={listing} />
      ))}
      <MapBoundary
        paths={polygonPaths}
        visible={true}
        options={GoogleMapsPolygonOptions}
      />
    </Map>
  )
}
