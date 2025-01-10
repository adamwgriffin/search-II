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

export type Pagination = {
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

export type GeocodeSearchResults = {
  boundary?: Boundary
  listings?: Listing[]
  pagination?: Pagination
  viewport?: ViewportLatLngBounds
}

export type SearchParams = Record<string, string | number | null>
