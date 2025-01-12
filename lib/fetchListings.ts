import type {
  NextSearchParams,
  ListingSearchGeocodeResponse,
  ListingSearchBoundaryResponse
} from '~/types'
import omit from 'lodash/omit'

async function http<T>(url: string, params: NextSearchParams) {
  const queryString = new URLSearchParams(
    params as Record<string, string> // The current TS type for this is not correct
  ).toString()
  const res = await fetch(
    `${process.env.LISTING_SEARCH_ENDPOINT!}${url}?${queryString}`
  )
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return (await res.json()) as T
}

function paramsForGeospatialSearch(params: NextSearchParams) {
  return omit(params, 'boundary_id', 'address', 'zoom')
}

async function searchNewLocation(params: NextSearchParams) {
  return http<ListingSearchGeocodeResponse>('/geocode', params)
}

async function searchCurrentLocation(params: NextSearchParams) {
  const url = params.boundary_id ? `/boundary/${params.boundary_id}` : '/bounds'
  return http<ListingSearchBoundaryResponse>(
    url,
    paramsForGeospatialSearch(params)
  )
}

export async function fetchListings(params: NextSearchParams) {
  if (!params || Object.keys(params).length === 0) return null
  try {
    return params.bounds_north
      ? searchCurrentLocation(params)
      : searchNewLocation(params)
  } catch (error) {
    console.error(error)
    return null
  }
}
