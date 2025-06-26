import type { TListingDetail } from "@/types";
import ListingDetail from "@/components/ListingDetail/ListingDetail";
import { ErrorMessage } from "@/components/ErrorMessage";

type ListingPageProps = {
  params: { slug: string };
};

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.LISTING_SERVICE_HOSTNAME}/listing/${slug}`
  );

  if (res.ok) {
    const listing: TListingDetail = await res.json();
    return <ListingDetail listing={listing} />;
  }

  if (res.status === 404) {
    return (
      <div className="pt-12">
        <ErrorMessage icon="🕵" message="Sorry, We couldn't find that one." />
        <div className="p-4 text-center text-6xl font-mono">404</div>
      </div>
    );
  }

  return (
    <div className="pt-12">
      <ErrorMessage icon="😕" message="Oops! Something went wrong." />
    </div>
  );
}
