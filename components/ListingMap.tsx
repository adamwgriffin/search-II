'use client'

import { Map, useMap } from '@vis.gl/react-google-maps'
import { useCallback, useEffect, useRef } from 'react'
import { BoundaryControl } from '~/components/BoundaryControl'
import { ZoomControl } from '~/components/ZoomControl'
import { useSearchParamsState } from '~/hooks/useSearchParamsState'
import { useSearchResultsData } from '~/hooks/useSearchResultsData'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import {
  GoogleMapsMapOptions,
  GoogleMapsPolygonOptions
} from '~/lib/googleMapsOptions'
import { convertBoundsToURLBoundsParam } from '~/lib/polygon'
import type { URLParams } from '~/types'
import { ListingMarker } from './ListingMarker'
import { MapBoundary } from './MapBoundary'

export function ListingMap() {
  const map = useMap()
  const updateFiltersOnMapIdle = useRef(false)
  const updateFilters = useUpdateFilters()
  const params = useSearchParamsState()
  const results = useSearchResultsData()

  const { isFetching } = results.queryResult

  const handleIdle = useCallback(() => {
    if (!updateFiltersOnMapIdle.current) return
    updateFiltersOnMapIdle.current = false
    const mapBounds = map?.getBounds()
    if (!mapBounds) return
    const updatedFilters: URLParams = convertBoundsToURLBoundsParam(mapBounds)
    const mapZoom = map?.getZoom()
    if (mapZoom) {
      updatedFilters.zoom = mapZoom
    }
    if (results.boundaryId) {
      updatedFilters.boundary_id = results.boundaryId
    }
    updateFilters(updatedFilters)
  }, [results.boundaryId, map, updateFilters])

  const handleZoomIn = useCallback(() => {
    if (!map) return
    const currentZoom = map.getZoom()
    const newZoom = typeof currentZoom == 'number' ? currentZoom + 1 : 1
    updateFilters({ zoom: newZoom })
  }, [map, updateFilters])

  const handleZoomOut = useCallback(() => {
    if (!map) return
    const currentZoom = map?.getZoom()
    const newZoom = typeof currentZoom == 'number' ? currentZoom - 1 : 1
    updateFilters({ zoom: newZoom })
  }, [map, updateFilters])

  const handleUserAdjustedMap = useCallback(() => {
    updateFiltersOnMapIdle.current = true
  }, [])

  // TODO: Use AbortController for this instead
  useEffect(() => {
    map?.getDiv()?.addEventListener('wheel', handleUserAdjustedMap)
    return () =>
      map?.getDiv()?.removeEventListener('wheel', handleUserAdjustedMap)
  }, [handleUserAdjustedMap, map])

  useEffect(() => {
    // No bounds param in the url means it's a new search, so call fitBounds()
    // to adjust the map to fit the new boundary that was returned from the
    // search results
    if (!map) return
    if (!params.bounds && results.bounds) {
      map.fitBounds(results.bounds)
    }
  }, [map, results.bounds, params.bounds])

  useEffect(() => {
    // Bounds param is present in the URL, which means we're searching an
    // existing location, so use the bounds & zoom from the url to adjust the
    // map
    if (!map) return
    if (params.bounds) {
      const center = new google.maps.LatLngBounds(params.bounds).getCenter()
      map.setCenter(center)
      if (params.zoom) {
        map.setZoom(params.zoom)
      }
    }
  }, [map, params.bounds, params.zoom])

  return (
    <Map
      style={{
        overflow: 'hidden',
        borderRadius: '.5rem'
      }}
      {...GoogleMapsMapOptions}
      onDragend={handleUserAdjustedMap}
      onIdle={handleIdle}
    >
      {results.listings.map((l) => (
        <ListingMarker
          key={l._id}
          latitude={l.latitude}
          longitude={l.longitude}
          listPrice={l.listPrice}
          soldPrice={l.soldPrice}
          loading={isFetching}
        />
      ))}
      <MapBoundary
        paths={results.polygonPaths}
        visible={params.showMapBoundary}
        options={GoogleMapsPolygonOptions}
      />
      <BoundaryControl loading={isFetching} />
      <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </Map>
  )
}
