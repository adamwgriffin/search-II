# URL State Search

In this example we're storing the map state and filters for the listing search
in the URL only, instead of relying on a state manager.

Uses Next.js app router, React Google Maps, React Query, Tailwind and Shadcn/UI.

## Requirements

* Node.js 23
* Bun 1.2

## Setup

[Listing Service](https://github.com/adamwgriffin/listing_service) needs to be
installed locally running on port 3001 to fetch listing data.

Save `env.example` as `.env.local` and add a Google Maps API key and Map ID.

Run `bun install`

Run `bun run dev`
