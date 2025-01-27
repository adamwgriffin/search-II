'use client'

import { Map, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import { useSearchParams } from 'next/navigation'
import { useSearchResultsMapData } from '~/hooks/useSearchResultsMapData'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import {
  GoogleMapsMapOptions,
  GoogleMapsPolygonOptions
} from '~/lib/googleMapsOptions'
import { convertBoundsToURLBoundsParam } from '~/lib/polygon'
import type { URLParams } from '~/types'
import { ListingMarker } from './ListingMarker'
import { MapBoundary } from './MapBoundary'

let userAdjustedMap = false

export function ListingMap() {
  const searchParams = useSearchParams()
  const apiIsLoaded = useApiIsLoaded()
  const map = useMap()
  const updateFilters = useUpdateFilters()
  const { listings, bounds, boundaryId, polygonPaths, queryResult } =
    useSearchResultsMapData(apiIsLoaded)

  if (!apiIsLoaded) return

  if (bounds) {
    map?.fitBounds(bounds)
  }

  const zoom = Number(searchParams.get('zoom')) || null

  function handleIdle() {
    if (!userAdjustedMap) return
    userAdjustedMap = false
    const mapBounds = map?.getBounds()
    if (!mapBounds) return
    const updatedFilters: URLParams = convertBoundsToURLBoundsParam(mapBounds)
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
      {listings.map((l) => (
        <ListingMarker
          key={l._id}
          latitude={l.latitude}
          longitude={l.longitude}
          listPrice={l.listPrice}
          soldPrice={l.soldPrice}
          loading={queryResult.isFetching}
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
