'use client'

import { Map, useMap } from '@vis.gl/react-google-maps'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { BoundaryControl } from '~/components/BoundaryControl'
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

export function ListingMap() {
  const map = useMap()
  const updateFiltersOnMapIdle = useRef(false)
  const updateFilters = useUpdateFilters()
  const {
    queryResult,
    boundaryId,
    listings,
    polygonPaths,
    searchResultsBounds,
    urlBoundsParam,
    showMapBoundary
  } = useSearchResultsMapData()
  const searchParams = useSearchParams()

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
      const currentZoom = map.getZoom()
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
    // No bounds param in the url means it's a new search, so call fitBounds()
    // to adjust the map to fit the new boundary that was returned from the
    // search results
    if (map && !urlBoundsParam && searchResultsBounds) {
      map.fitBounds(searchResultsBounds)
    }
  }, [searchResultsBounds, map, searchParams, urlBoundsParam])

  useEffect(() => {
    // Bounds param is present in the URL, which means we're searching an
    // existing location, so use the bounds & zoom from the url to adjust the
    // map
    if (map && urlBoundsParam) {
      const center = new google.maps.LatLngBounds(urlBoundsParam).getCenter()
      map.setCenter(center)
      const zoom = searchParams.get('zoom')
      if (zoom) {
        map.setZoom(Number(zoom))
      }
    }
  }, [map, searchParams, urlBoundsParam])

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
        visible={showMapBoundary}
        options={GoogleMapsPolygonOptions}
      />
      <BoundaryControl loading={queryResult.isFetching} />
      <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
    </Map>
  )
}
