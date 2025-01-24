export type SearchParamsInit =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined

export type NextSearchParams = { [key: string]: string | string[] | undefined }

export type GalleryImage = {
  _id: string
  caption: string
  fullUrl: string
  galleryUrl: string
  smallUrl: string
}

export type Address = {
  city: string
  line1: string
  state: string
  zip: string
}

export type Listing = {
  _id: string
  latitude: number
  longitude: number
  photoGallery: GalleryImage[]
  address: Address
  listPrice: number
  soldPrice?: number
}

export type ListingSearchPagination = {
  page: number
  numberReturned: number
}

export type PolygonPaths = Array<Array<google.maps.LatLngLiteral>>

export type MultiPolygon = Array<Array<Array<Array<number>>>>

export type Geometry = {
  type: 'MultiPolygon' | 'Polygon'
  coordinates: MultiPolygon
  _id: string
}

export type Boundary = {
  _id: string
  name: string
  placeId: string
  type: string
  geometry: Geometry
}

export type ViewportLatLngBounds = {
  northeast: google.maps.LatLngLiteral
  southwest: google.maps.LatLngLiteral
}

export type ListingSearchGeocodeResponse = {
  boundary?: Boundary
  listings?: Listing[]
  pagination?: ListingSearchPagination
  viewport?: ViewportLatLngBounds
}

export type ListingSearchBoundaryResponse = {
  listings: Listing[]
  pagination: ListingSearchPagination
}

export type URLParams = Record<string, string | number | null>

export type SortType = 'listedDate' | 'listPrice' | 'beds' | 'baths' | 'sqft'

export type SortDirection = 'asc' | 'desc'
