'use client'

import { Map, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { ZoomControl } from '~/components/ZoomControl'
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

function getZoomFromSearchParams(searchParams: ReadonlyURLSearchParams) {
  return searchParams.get('zoom') !== null
    ? Number(searchParams.get('zoom'))
    : null
}

export function ListingMap() {
  const apiIsLoaded = useApiIsLoaded()
  const map = useMap()
  const updateFiltersOnMapIdle = useRef(false)
  const updateFilters = useUpdateFilters()
  const { listings, bounds, boundaryId, polygonPaths, queryResult } =
    useSearchResultsMapData()
  const searchParams = useSearchParams()
  const zoom = getZoomFromSearchParams(searchParams)

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
    if (boundaryId) {
      updatedFilters.boundary_id = boundaryId
    }
    updateFilters(updatedFilters)
  }, [boundaryId, map, updateFilters])

  const handleZoomIn = useCallback(() => {
    if (map) {
      const currentZoom = map?.getZoom()
      const newZoom = typeof currentZoom == 'number' ? currentZoom + 1 : 1
      updateFilters({ zoom: newZoom })
    }
  }, [map, updateFilters])

  const handleZoomOut = useCallback(() => {
    if (map) {
      const currentZoom = map?.getZoom()
      const newZoom = typeof currentZoom == 'number' ? currentZoom - 1 : 1
      updateFilters({ zoom: newZoom })
    }
  }, [map, updateFilters])

  const handleUserAdjustedMap = useCallback(() => {
    updateFiltersOnMapIdle.current = true
  }, [])

  useEffect(() => {
    map?.getDiv()?.addEventListener('wheel', handleUserAdjustedMap)
    return () =>
      map?.getDiv()?.removeEventListener('wheel', handleUserAdjustedMap)
  }, [handleUserAdjustedMap, map])

  useEffect(() => {
    if (!map) return
    if (bounds) {
      map.fitBounds(bounds)
    }
    if (zoom !== null) {
      map.setZoom(zoom)
    }
  }, [bounds, map, zoom])

  if (!apiIsLoaded) return

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
      <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </Map>
  )
}
