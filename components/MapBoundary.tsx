import type { PolygonPaths } from '~/types'
import { useMap } from '@vis.gl/react-google-maps'

export type MapBoundaryProps = {
  paths: PolygonPaths | null
  visible: boolean
  options: google.maps.PolygonOptions
}

let polygon: google.maps.Polygon

export function MapBoundary ({
  paths,
  visible = true,
  options = {}
}: MapBoundaryProps) {
  const map = useMap()

  polygon ||= new google.maps.Polygon()
  polygon.setMap(map)
  if (paths) polygon.setPaths(paths)
  polygon.setOptions({ ...options, visible })

  return null
}
