import { ListingDetailHeader } from "@/components/ListingDetail/ListingDetailHeader";

// Next.js automatically nests this layout component inside the RootLayout for
// every page that's inside the same directory where it's located.
export default function ListingPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <ListingDetailHeader />
      {children}
    </div>
  );
}
