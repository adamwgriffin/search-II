# URL State Search with Next.js App Router

In this example we're storing the map state and filters for the listing search
in the URL only, instead of relying on a state manager. In addition we are using
the Next.js app router. We are fetching listing data on the server using a
server component then passing that data to its child components. When the URL is
updated with new filters, Next automatically streams changes from the server
with new listing data. This causes the <ListingMap> and <SearchResults>
components to re-render, updating them with new listing results. This approach
helps to simplyfy things and requires less code to be shipped to the browser.


## Setup

Save `env.example` as `.env.local` and add Google Maps API key and Map ID

Run `npm install`

Run `npm run dev`

(Listing Service needs to be installed locally running on port 3001 to fetch
listing data)
