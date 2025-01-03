'use client'

import Image from 'next/image'
import { useSearchResults } from '~/hooks/listingSearch'

export function SearchResults() {
  const { data: results, isLoading, isError } = useSearchResults()

  function formatPrice(price: number) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
    }).format(price)
  }

  return (
    <>
      {isLoading && 'Loading...'}
      {isError && 'Error fetching data'}
      {results?.listings && (
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 overflow-y-auto'>
          {results.listings.map((listing) => (
            <li key={listing._id}>
              <Image
                src={listing.photoGallery[0].smallUrl}
                alt='Listing Image'
                width={300}
                height={300}
              />
              <div className='pt-2'>
                {formatPrice(listing.soldPrice || listing.listPrice)}
              </div>
              <address className='not-italic pt-2'>
                <div>{listing.address.line1}</div>
                <div>{`${listing.address.city}, ${listing.address.state} ${listing.address.zip}`}</div>
              </address>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
