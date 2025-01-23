import { SearchParamsInit, URLParams } from '~/types'

export const GeospatialSearchParams = [
  'bounds_north',
  'bounds_east',
  'bounds_south',
  'bounds_west',
  'boundary_id',
  'zoom'
]

export function objectToQueryString(params: URLParams) {
  // Casting params as SearchParamsInit because the current type provided by Typescript for this is not correct
  return new URLSearchParams(params as SearchParamsInit)
    .toString()
    .replace(/%2C/g, ',') // Don't encode commas in url params
}
