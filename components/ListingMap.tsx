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
import type { URLParams } from '~/types'
import { ListingMarker } from './ListingMarker'
import { MapBoundary } from './MapBoundary'
import { useSearchResults } from '~/hooks/useSearchResults'

let userAdjustedMap = false

export function ListingMap() {
  const apiIsLoaded = useApiIsLoaded()
  const map = useMap()
  const queryParams = useSearchParams()
  const updateFilters = useUpdateFilters()
  const { data: results } = useSearchResults()

  if (!apiIsLoaded) return

  const polygonPaths =
    results && 'boundary' in results ? getPolygonPaths(results) : null

  const bounds = getAvailableBounds(
    queryParams,
    polygonPaths,
    results && 'viewport' in results ? results.viewport || null : null
  )

  const zoom = Number(queryParams.get('zoom')) || null

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
    if (results && 'boundary' in results && results?.boundary?._id) {
      updatedFilters.boundary_id = results.boundary._id
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
