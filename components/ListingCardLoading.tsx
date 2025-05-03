export function ListingCardLoading() {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <div className="w-full rounded-lg aspect-square bg-gray-200 dark:bg-gray-700"></div>

      <div className="w-1/4 h-4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      <div>
        <div className="w-3/5 h-4 rounded-md bg-gray-200 dark:bg-gray-700 mb-3"></div>
        <div className="w-3/5 h-4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}
