# Search II

A real estate search app written with Next.js.

This is a re-write of the [Search](https://github.com/adamwgriffin/search)
project. This version uses Next.js app router, React Google Maps, React Query,
Tailwind and Shadcn/UI.

Currently we only have boundaries for Seattle, so the
search is limited to Seattle neighborhoods. The listing data is automatically
generated using Faker. These are not real listings.

## Requirements

- Node.js >= 23
- Bun >= 1.2 (used as the package manager and script runner)

## Installation

[Listing Service](https://github.com/adamwgriffin/listing_service) needs to be
installed locally running on port 3001 to fetch listing data.

Save `env.example` as `.env.local` and add a Google Maps API key and Map ID.

Run `bun install`

Run `bun dev`

#### Google Maps

Setting up Google Maps requires creating an API token on [Google Cloud Console](https://console.cloud.google.com/).
You have to enable the following APIs:

- Maps JavaScript API
- Maps Embed API
- Places API
- Street View Static API

Add the API token to the `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` variable.

You also have to create a map under "Map Management" and add the Map ID to
`NEXT_PUBLIC_GOOGLE_MAPS_ID` variable.
