import Image from 'next/image'
import { formatPrice } from '~/lib/listingHelpers'
import { type Listing } from '~/types'

export type ListingCardsProps = {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardsProps) {
  return (
    <div className='flex flex-col gap-3'>
      <Image
        src={listing.photoGallery[0].smallUrl}
        alt='Listing Image'
        width={300}
        height={300}
        className='rounded-lg aspect-square object-cover'
        priority
      />
      <div className=''>
        {formatPrice(listing.soldPrice || listing.listPrice)}
      </div>
      <address className='not-italic'>
        <div>{listing.address.line1}</div>
        <div>{`${listing.address.city}, ${listing.address.state} ${listing.address.zip}`}</div>
      </address>
    </div>
  )
}
