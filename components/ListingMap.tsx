'use client'

import { Map, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import { useSearchParams } from 'next/navigation'
import { useSearchResults } from '~/hooks/useSearchResults'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import {
  GoogleMapsMapOptions,
  GoogleMapsPolygonOptions
} from '~/lib/googleMapsOptions'
import {
  convertBoundsToURLBoundsParam,
  getAvailableBounds,
  getPolygonPaths
} from '~/lib/polygon'
import type { URLParams } from '~/types'
import { ListingMarker } from './ListingMarker'
import { MapBoundary } from './MapBoundary'
import { useMemo } from 'react'

let userAdjustedMap = false

export function ListingMap() {
  const apiIsLoaded = useApiIsLoaded()
  const map = useMap()
  const queryParams = useSearchParams()
  const updateFilters = useUpdateFilters()
  // We're setting showCurrentDataWhileFetching so that the map markers won't
  // blink from being re-rendered each time the map is moved and a new data
  // fetch happens
  const { data: results } = useSearchResults({
    showCurrentDataWhileFetching: true
  })
  // If the user changes the sort criteria, it will cause the markers to
  // re-render on the map, even if the have the exact same listing data, which
  // is yet another thing that makes the markers blink. It seems that
  // overlapping markers are placed with a different zIndex depending on
  // what order they were rendered in. Keeping the order stable by making sure
  // they always sort the same way fixes this.
  const listings = useMemo(() => {
    return (results?.listings || []).toSorted((a, b) => {
      // Sort by longitude if latitude was already sorted, in descending order
      // (East to West)
      if (a.latitude === b.latitude) {
        return b.longitude - a.longitude
      }
      // Sort by latitude first. Sescending order, North to South.
      return b.latitude - a.latitude
    })
  }, [results?.listings])

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
    const updatedFilters: URLParams = convertBoundsToURLBoundsParam(mapBounds)
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
      {listings.map((l) => (
        <ListingMarker
          key={l._id}
          latitude={l.latitude}
          longitude={l.longitude}
          listPrice={l.listPrice}
          soldPrice={l.soldPrice}
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
