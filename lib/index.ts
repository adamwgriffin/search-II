export function convertBoundsToParams(bounds: google.maps.LatLngBoundsLiteral) {
  const { north, east, south, west } = bounds
  return {
    bounds_north: north.toString(),
    bounds_east: east.toString(),
    bounds_south: south.toString(),
    bounds_west: west.toString()
  }
}
