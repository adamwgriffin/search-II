export type SearchParamsInit =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export type PropertyStatus = "active" | "pending" | "sold" | "rented";

export type PhotoGalleryImage = {
  _id: string;
  url: string;
  caption?: string;
};

export type Address = {
  city: string;
  line1: string;
  state: string;
  zip: string;
};

export type PropertDetail = {
  name: string;
  details: string[];
};

export type PropertDetailsSection = {
  name: string;
  description?: string;
  details: PropertDetail[];
};

export type Listing = {
  _id: string;
  latitude: number;
  longitude: number;
  photoGallery: PhotoGalleryImage[];
  address: Address;
  listPrice: number;
  soldPrice?: number;
  beds: number;
  baths: number;
  sqft: number;
  slug: string;
  neighborhood: string;
  propertyType: string;
  lotSize: number;
  description: string;
  status: PropertyStatus;
};

export type TListingDetail = Listing & {
  yearBuilt: number;
  soldDate?: string;
  propertyDetails?: PropertDetailsSection[];
};

export type ListingSearchPagination = {
  numberAvailable: number;
  numberOfPages: number;
  numberReturned: number;
  page: number;
  pageSize: number;
};

export type Position = [longitude: number, latitude: number];

export type Polygon = {
  type: "Polygon";
  coordinates: Position[][];
};

export type MultiPolygon = {
  type: "MultiPolygon";
  coordinates: Position[][][];
};

export type Geometry = (Polygon | MultiPolygon) & { _id: string };

export type Boundary = {
  _id: string;
  name: string;
  placeId: string;
  type: string;
  geometry: Geometry;
};

export type GeoJSONBoundary = {
  type: "Feature";
  id: string;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: Position[][] | Position[][][];
  };
};

export type ViewportLatLngBounds = {
  northeast: google.maps.LatLngLiteral;
  southwest: google.maps.LatLngLiteral;
};

export type ListingSearchResponse = {
  listingDetail?: TListingDetail;
  boundary?: Boundary;
  listings?: Listing[];
  pagination?: ListingSearchPagination;
  viewport?: ViewportLatLngBounds;
};
