import type { Listing } from '~/types'

export function formatPrice(price: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
  }).format(price)
}

export function formatPriceAbbreviated(price: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact'
  }).format(price)
}

/**
 * Sort listings by latitude and longitude in descending order. Sort latitude
 * first (descending is East to West), then longitude (descending order is East
 * to West)
 */
export function sortListingsByLatLng(listings: Listing[]) {
  return listings.toSorted((a, b) => {
    // Sort by longitude if latitude was already sorted
    if (a.latitude === b.latitude) {
      return b.longitude - a.longitude
    }
    // Sort by latitude first.
    return b.latitude - a.latitude
  })
}
