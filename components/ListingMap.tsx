'use client'

import type { GeocodeSearchResults } from '~/types'
import { Map, Marker, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'
import {
  convertGeojsonCoordinatesToPolygonPaths,
  getAvailableBounds
} from '~/lib/polygon'
import {
  GoogleMapsMapOptions,
  GoogleMapsPolygonOptions
} from '~/lib/googleMapsOptions'
import { MapBoundary } from './MapBoundary'
import { useUpdateFilters } from '~/hooks/useUpdateFilters'
import { convertBoundsToParams } from '~/lib'

export type ListingMapProps = {
  results: GeocodeSearchResults | undefined
  lat?: number | undefined
  lng?: number | undefined
}

let userAdjustedMap = false
let previousBoundaryId: string

export function ListingMap({ results, lat, lng }: ListingMapProps) {
  const apiIsLoaded = useApiIsLoaded()
  const map = useMap()
  const updateFilters = useUpdateFilters()

  if (!apiIsLoaded) return

  const coordinates = results?.boundary?.geometry?.coordinates
  const paths = coordinates
    ? convertGeojsonCoordinatesToPolygonPaths(coordinates)
    : null

  const bounds = getAvailableBounds(paths, results?.viewport || null)

  // console.log('results?.boundary?._id:', results?.boundary?._id)
  // console.log('previousBoundaryId:', previousBoundaryId)

  const boundaryId = results?.boundary?._id

  if (map && lat && lng) {
    map.setCenter({ lat, lng })
  } else if (map && bounds && boundaryId) {
    if (!previousBoundaryId || previousBoundaryId !== boundaryId) {
      map.fitBounds(bounds)
    }
    previousBoundaryId = boundaryId
  }

  function handleIdle() {
    if (!userAdjustedMap) return
    userAdjustedMap = false
    const mapBounds = map?.getBounds()
    const center = map?.getCenter()
    if (!mapBounds || !center) return
    const { lat, lng } = center.toJSON()
    const updatedFilters: Record<string, string> = {
      ...convertBoundsToParams(mapBounds.toJSON()),
      center_lat: lat.toString(),
      center_lng: lng.toString()
    }
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
      onDragend={() => {
        userAdjustedMap = true
      }}
      onIdle={handleIdle}
      {...GoogleMapsMapOptions}
    >
      {results?.listings?.map((listing) => (
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
