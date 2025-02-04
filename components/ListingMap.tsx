'use client'

import { Map, useMap } from '@vis.gl/react-google-maps'
import { useCallback, useEffect, useRef } from 'react'
import { BoundaryControl } from '~/components/BoundaryControl'
import { MapBoundary } from '~/components/MapBoundary'
import { ZoomControl } from '~/components/ZoomControl'
import { useSearchParamsState } from '~/hooks/useSearchParamsState'
import { useSearchResultsData } from '~/hooks/useSearchResultsData'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import { getAvailableBoundsFromSearchResults } from '~/lib/boundary'
import {
  GoogleMapsMapOptions,
  MapBoundaryStyleOptions
} from '~/lib/googleMapsOptions'
import type { URLParams } from '~/types'
import { ListingMarker } from './ListingMarker'

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
    const bounds = map?.getBounds()?.toUrlValue()
    if (!bounds) throw new Error('No bounds available for map')
    const updatedFilters: URLParams = { bounds }
    const mapZoom = map?.getZoom()
    if (results.boundaryId) {
      updatedFilters.boundary_id = results.boundaryId
    }
    if (mapZoom) {
      updatedFilters.zoom = mapZoom
    }
    updateFilters(updatedFilters)
  }, [results.boundaryId, map, updateFilters])

  const handleZoomIn = useCallback(() => {
    if (!map) return
    const bounds = map?.getBounds()?.toUrlValue()
    if (!bounds) throw new Error('No bounds available for map')
    const updatedFilters: URLParams = { bounds }
    if (results.boundaryId) {
      updatedFilters.boundary_id = results.boundaryId
    }
    const currentZoom = map.getZoom()
    updatedFilters.zoom = currentZoom !== undefined ? currentZoom + 1 : 1
    updateFilters(updatedFilters)
  }, [map, results.boundaryId, updateFilters])

  const handleZoomOut = useCallback(() => {
    if (!map) return
    const bounds = map?.getBounds()?.toUrlValue()
    if (!bounds) throw new Error('No bounds available for map')
    const updatedFilters: URLParams = { bounds }
    if (results.boundaryId) {
      updatedFilters.boundary_id = results.boundaryId
    }
    const currentZoom = map.getZoom()
    updatedFilters.zoom = currentZoom !== undefined ? currentZoom - 1 : 1
    updateFilters(updatedFilters)
  }, [map, results.boundaryId, updateFilters])

  const handleUserAdjustedMap = useCallback(() => {
    updateFiltersOnMapIdle.current = true
  }, [])

  useEffect(() => {
    map?.getDiv()?.addEventListener('wheel', handleUserAdjustedMap)
    return () =>
      map?.getDiv()?.removeEventListener('wheel', handleUserAdjustedMap)
  }, [handleUserAdjustedMap, map])

  // No bounds param in the url means it's a new search, so call fitBounds()
  // to adjust the map to fit the new boundary that was returned from the
  // search results
  useEffect(() => {
    if (!map || params.bounds) return
    const feature = results.geoJSONBoundary?.id
      ? map.data.getFeatureById(results.geoJSONBoundary.id)
      : undefined
    const bounds = getAvailableBoundsFromSearchResults(
      feature,
      results.viewport
    )
    if (bounds) {
      map.fitBounds(bounds)
    }
  }, [map, results.geoJSONBoundary, params.bounds, results.viewport])

  // Bounds param is present in the URL, which means we're searching an
  // existing location, so use the bounds & zoom from the url to adjust the
  // map
  useEffect(() => {
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
        boundary={results.geoJSONBoundary}
        {...MapBoundaryStyleOptions}
      />
      <BoundaryControl loading={isFetching} />
      <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </Map>
  )
}
