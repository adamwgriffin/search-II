export type SearchParamsInit =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined

export type NextSearchParams = { [key: string]: string | string[] | undefined }

export type PhotoGalleryImage = {
  _id: string
  url: string
  caption?: string
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
  photoGallery: PhotoGalleryImage[]
  address: Address
  listPrice: number
  soldPrice?: number
}

export type ListingSearchPagination = {
  page: number
  numberReturned: number
}

export type PolygonPaths = Array<Array<google.maps.LatLngLiteral>>

export type Position = [longitude: number, latitude: number]

export type Polygon = {
  type: 'Polygon'
  coordinates: Position[][]
}

export type MultiPolygon = {
  type: 'MultiPolygon'
  coordinates: Position[][][]
}

export type Geometry = (Polygon | MultiPolygon) & { _id: string }

export type Boundary = {
  _id: string
  name: string
  placeId: string
  type: string
  geometry: Geometry
}

export type GeoJSONBoundary = {
  type: 'Feature'
  id: string
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: Position[][] | Position[][][]
  }
}

export type ViewportLatLngBounds = {
  northeast: google.maps.LatLngLiteral
  southwest: google.maps.LatLngLiteral
}

export type ListingSearchResponse = {
  boundary?: Boundary
  listings?: Listing[]
  pagination?: ListingSearchPagination
  viewport?: ViewportLatLngBounds
}

export type URLParams = Record<string, string | number | null>

export type SortType = 'listedDate' | 'listPrice' | 'beds' | 'baths' | 'sqft'

export type SortDirection = 'asc' | 'desc'
