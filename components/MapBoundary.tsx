import { useMap } from '@vis.gl/react-google-maps'
import { useEffect } from 'react'
import type { GeoJSONBoundary } from '~/types'

export type MapBoundaryProps = {
  boundary: GeoJSONBoundary | null
} & google.maps.Data.StyleOptions

export function MapBoundary({ boundary, ...styleOptions }: MapBoundaryProps) {
  const map = useMap()

  useEffect(() => {
    if (!map || !boundary) return
    const feature = map.data.addGeoJson(boundary)[0]
    map.data.setStyle(styleOptions)
    return () => {
      map.data.remove(feature)
    }
  }, [map, boundary, styleOptions])

  return null
}
