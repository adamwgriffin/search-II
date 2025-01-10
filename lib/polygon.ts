import { ReadonlyURLSearchParams } from 'next/navigation'
import type { PolygonPaths, MultiPolygon, ViewportLatLngBounds } from '../types'

/*
we need to transform the geojson we get from the service into a shape that works for the Polygon class we need to use
it for. we get the data as:
[
  [
    [
      [
        -122.510645,
        47.228309
      ],
      [
        -122.506443,
        47.226519
      ]
    ]
  ]
]
but instead we need:
[
  [
    {
      lat: 47.228309,
      lng: -122.510645
    },
    {
      lat: 47.226519,
      lng: -122.506443
    },
  ]
]
*/
// TODO: this should be recursive instead. also this type is not really a MultiPolygon. it's only the coordinates from a
// MultiPolygon
export const convertGeojsonCoordinatesToPolygonPaths = (
  geoJsonCoordinates: MultiPolygon
): PolygonPaths => {
  return geoJsonCoordinates.map((arr) => {
    return arr[0].map((arr) => {
      return { lat: arr[1], lng: arr[0] }
    })
  })
}

// most examples use polygon.getPaths() to extend the bounds, but that data is the same as the geojson coordinates we
// used to create the polygon paths, so we might as well just use that data since we already have it
export const getGeoLayerBounds = (geoLayerCoordinates: PolygonPaths) => {
  const bounds = new google.maps.LatLngBounds()
  geoLayerCoordinates.forEach((latLngArr) =>
    latLngArr.forEach((latLng) => bounds.extend(latLng))
  )
  return bounds.toJSON()
}

export const convertViewportToLatLngBoundsLiteral = (
  viewport: ViewportLatLngBounds
) => {
  const bounds = new google.maps.LatLngBounds(
    viewport.southwest,
    viewport.northeast
  )
  return bounds.toJSON()
}

export function convertBoundsToParams(bounds: google.maps.LatLngBoundsLiteral) {
  const { north, east, south, west } = bounds
  return {
    bounds_north: north,
    bounds_east: east,
    bounds_south: south,
    bounds_west: west
  }
}

export function convertBoundsParamsToBounds(
  queryParams: ReadonlyURLSearchParams
): google.maps.LatLngBoundsLiteral {
  return {
    north: Number(queryParams.get('bounds_north')),
    east: Number(queryParams.get('bounds_east')),
    south: Number(queryParams.get('bounds_south')),
    west: Number(queryParams.get('bounds_west'))
  }
}

function boundsPresent(queryParams: ReadonlyURLSearchParams) {
  const requiredKeys = [
    'bounds_north',
    'bounds_east',
    'bounds_south',
    'bounds_west'
  ]
  const queryParamsKeys = Array.from(queryParams.keys())
  return requiredKeys.every((key) => queryParamsKeys.includes(key))
}

export function getAvailableBounds(
  queryParams: ReadonlyURLSearchParams,
  paths: PolygonPaths | null,
  viewport: ViewportLatLngBounds | null
) {
  if (boundsPresent(queryParams))
    return convertBoundsParamsToBounds(queryParams)
  if (paths) return getGeoLayerBounds(paths)
  if (viewport) return convertViewportToLatLngBoundsLiteral(viewport)
  return null
}
