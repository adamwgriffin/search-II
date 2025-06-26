import ListingAddress from "@/components/ListingAddress";
import { ListingInfo } from "@/components/ListingInfo";
import { formatPrice } from "@/lib/listingHelpers";
import type { TListingDetail } from "@/types";
import ListingDetailImage from "@/components/ListingDetail/ListingDetailImage";

export type ListingDetailProps = {
  listing: TListingDetail;
};

export default function ListingDetail({ listing }: ListingDetailProps) {
  return (
    <div className="flex flex-col gap-y-4 max-w-4xl m-auto p-4">
      <ListingDetailImage listing={listing} />
      <div className="text-4xl font-semibold">
        {formatPrice(listing.soldPrice || listing.listPrice)}
      </div>
      <div className="text-2xl font-semibold">{listing.neighborhood}</div>
      <ListingAddress large address={listing.address} />
      <ListingInfo listing={listing} bedsLabel=" Bed" bathsLabel=" Bath" />
      <div>
        <h1 className="font-semibold my-4">Description</h1>
        <p>{listing.description}</p>
      </div>
    </div>
  );
}
