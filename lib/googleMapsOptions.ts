import { type MapProps } from "@vis.gl/react-google-maps";

export const GoogleMapsStreetViewURL =
  "https://maps.googleapis.com/maps/api/streetview";

export const GoogleStreetViewMaxImageSize = 640;

export const MapBoundaryStyleOptions: google.maps.Data.StyleOptions = {
  strokeColor: "darkgray",
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 0
};

export const GoogleMapsMapOptions: MapProps = {
  // Using a mapId is required for using AdvancedMarkerView
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!,
  defaultCenter: {
    lat: 47.6560479,
    lng: -122.3603527
  },
  defaultZoom: 12,
  disableDefaultUI: true,
  gestureHandling: "greedy",
  clickableIcons: false
};

export const GoogleMapsAutocompleteOptions = {
  // types restricts the autocomplete results to only a specific set of place
  // types. The "geocode" type seems to be the only decent choice for both
  // addresses and places like neighborhoods/cities/states, etc. The places API
  // has weird, strict rules about what types you can and can't use, which makes
  // it really difficult to get very granular with the specific types we would
  // normally want to use.
  types: ["geocode"],
  componentRestrictions: { country: ["us"] }
};
