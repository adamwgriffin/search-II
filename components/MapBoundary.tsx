import { useMap } from '@vis.gl/react-google-maps'
import { useRef } from 'react'
import type { PolygonPaths } from '~/types'

export type MapBoundaryProps = {
  paths: PolygonPaths | undefined
  visible: boolean
  options: google.maps.PolygonOptions
}

export function MapBoundary({
  paths,
  visible = true,
  options = {}
}: MapBoundaryProps) {
  const map = useMap()
  const polygon = useRef<google.maps.Polygon | null>(null)

  polygon.current ||= new google.maps.Polygon()
  polygon.current.setMap(map)
  if (paths) polygon.current.setPaths(paths)
  polygon.current.setOptions({ ...options, visible })

  return null
}
