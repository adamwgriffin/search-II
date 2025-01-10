import type {
  NextSearchParams,
  ListingSearchGeocodeResponse,
  ListingSearchBoundaryResponse
} from '~/types'
import omit from 'lodash/omit'

async function http<T>(url: string, queryParams: NextSearchParams) {
  const queryString = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString()
  const res = await fetch(
    `${process.env.LISTING_SEARCH_ENDPOINT!}${url}?${queryString}`
  )
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return (await res.json()) as T
}

function selectParamsForGeocodeSearch(queryParams: NextSearchParams) {
  return queryParams
}

function selectParamsForGeospatialSearch(queryParams: NextSearchParams) {
  return omit(queryParams, 'boundary_id', 'address', 'zoom')
}

async function newLocationGeocodeSearch(queryParams: NextSearchParams) {
  return http<ListingSearchGeocodeResponse>(
    '/geocode',
    selectParamsForGeocodeSearch(queryParams)
  )
}

async function searchCurrentLocation(queryParams: NextSearchParams) {
  const url = queryParams.boundary_id
    ? `/boundary/${queryParams.boundary_id}`
    : '/bounds'
  return http<ListingSearchBoundaryResponse>(
    url,
    selectParamsForGeospatialSearch(queryParams)
  )
}

export async function fetchListings(queryParams: NextSearchParams) {
  return queryParams.bounds_north
    ? searchCurrentLocation(queryParams)
    : newLocationGeocodeSearch(queryParams)
}
