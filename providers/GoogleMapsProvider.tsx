'use client'

import { APIProvider } from '@vis.gl/react-google-maps'

const GoogleMapsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={['maps', 'places', 'marker']}
    >
      {children}
    </APIProvider>
  )
}

export default GoogleMapsProvider
