import Image from 'next/image'
import { formatPrice } from '~/lib/listingHelpers'
import { type Listing } from '~/types'

export type ListingCardsProps = {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardsProps) {
  return (
    <div>
      <Image
        src={listing.photoGallery[0].smallUrl}
        alt='Listing Image'
        width={300}
        height={300}
        className='rounded-md aspect-square object-cover'
      />
      <div className='pt-2'>
        {formatPrice(listing.soldPrice || listing.listPrice)}
      </div>
      <address className='not-italic pt-2'>
        <div>{listing.address.line1}</div>
        <div>{`${listing.address.city}, ${listing.address.state} ${listing.address.zip}`}</div>
      </address>
    </div>
  )
}
