# URL State Search

In this example we're storing the map state and filters for the listing search
in the URL only, instead of relying on a state manager.

Uses Next.js app router, React Google Maps, React Query, Tailwind and Shadcn/UI.

## Setup

Save `env.example` as `.env.local` and add Google Maps API key and Map ID

Run `yarn install`

Run `yarn dev`

(Listing Service needs to be installed locally running on port 3001 to fetch
listing data)
