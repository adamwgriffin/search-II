# Search ||

A real estate search app written with Next.js.

This is a re-write of the [Search](https://github.com/adamwgriffin/search) project. This version uses Next.js app router, React Google Maps, React Query, Tailwind and Shadcn/UI.

## Requirements

- Node.js 23
- Bun 1.2 (used as the package manager and script runner)

## Setup

[Listing Service](https://github.com/adamwgriffin/listing_service) needs to be installed locally running on port 3001 to fetch listing data.

Save `env.example` as `.env.local` and add a Google Maps API key and Map ID.

Run `bun install`

Run `bun run dev`
