import omit from 'lodash/omit'
import { http } from '~/lib/http'
import type {
  ListingSearchBoundaryResponse,
  ListingSearchGeocodeResponse,
  URLParams
} from '~/types'
import type { ReadonlyURLSearchParams } from 'next/navigation'

function paramsForGeospatialSearch(params: URLParams) {
  return omit(params, 'boundary_id', 'address', 'zoom')
}

async function getListings<T>(url: string, params: URLParams) {
  return http<T>(
    `${process.env.NEXT_PUBLIC_LISTING_SEARCH_ENDPOINT!}${url}`,
    params
  )
}

async function searchNewLocation(params: URLParams) {
  return getListings<ListingSearchGeocodeResponse>('/geocode', params)
}

async function searchCurrentLocation(params: URLParams) {
  return getListings<ListingSearchBoundaryResponse>(
    params.boundary_id ? `/boundary/${params.boundary_id}` : '/bounds',
    paramsForGeospatialSearch(params)
  )
}

export async function fetchListings(searchParams: ReadonlyURLSearchParams) {
  if (searchParams.size === 0) return null
  const params = Object.fromEntries(searchParams.entries())
  return params.bounds_north
    ? await searchCurrentLocation(params)
    : await searchNewLocation(params)
}
