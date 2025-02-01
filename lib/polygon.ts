import type { MultiPolygon, PolygonPaths, ViewportLatLngBounds } from '../types'

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
// TODO: this should be recursive instead. also this type is not really a
// MultiPolygon. it's only the coordinates from a MultiPolygon
export const convertGeojsonCoordinatesToPolygonPaths = (
  geoJsonCoordinates: MultiPolygon
): PolygonPaths => {
  return geoJsonCoordinates.map((arr) => {
    return arr[0].map((arr) => {
      return { lat: arr[1], lng: arr[0] }
    })
  })
}

// most examples use polygon.getPaths() to extend the bounds, but that data is
// the same as the geojson coordinates we used to create the polygon paths, so
// we might as well just use that data since we already have it
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

export function convertBoundsToURLBoundsParam(
  bounds: google.maps.LatLngBounds
) {
  return {
    bounds: bounds.toUrlValue()
  }
}

export function convertURLBoundsParamToLatLngBoundsLiteral(
  boundsString: string
): google.maps.LatLngBoundsLiteral {
  const [south, west, north, east] = boundsString.split(',').map(Number)
  return { south, west, north, east }
}

export function getPolygonPaths(coordinates: MultiPolygon | undefined) {
  return coordinates
    ? convertGeojsonCoordinatesToPolygonPaths(coordinates)
    : null
}

export function getAvailableBoundsFromSearchResults(
  polygonPaths: PolygonPaths | undefined,
  viewport: ViewportLatLngBounds | undefined
) {
  if (polygonPaths) return getGeoLayerBounds(polygonPaths)
  if (viewport) return convertViewportToLatLngBoundsLiteral(viewport)
}
