import inRange from 'lodash/inRange';
import range from 'lodash/range';
import { useSearchParamsState } from '~/providers/SearchParamsProvider';
import { PaginationButton } from '~/components/PaginationButton';
import { MoreHorizontal } from 'lucide-react';

export type PaginationGroupsProps = {
  numberOfPages: number;
  currentPage: number;
};

const ShowAllPagesThreshold = 7;
const WithinPagesThreshold = 3;
const PageGroupLength = 4;

export function PaginationGroups({
  numberOfPages,
  currentPage
}: PaginationGroupsProps) {
  const { updateSearchParams } = useSearchParamsState();

  // If there aren't that many pages just show them all
  if (numberOfPages <= ShowAllPagesThreshold) {
    return (
      <>
        {range(numberOfPages).map((page) => (
          <li key={page}>
            <PaginationButton
              currentPage={page === currentPage}
              onClick={() => updateSearchParams({ page_index: page })}
            >
              {page + 1}
            </PaginationButton>
          </li>
        ))}
      </>
    );
  }

  // If there are a lot of pages selectively show groups of pages depending on
  // where the current page is inside the list, e.g., < 1 ... 3 (4) 5 ... 13 >
  const firstPage = 0;
  const lastPage = numberOfPages - 1;

  // Find which group the current page is within
  const currentPageWithinFirstGroup = inRange(
    currentPage,
    firstPage,
    WithinPagesThreshold
  );
  const currentPageWithinLastGroup = inRange(
    currentPage,
    numberOfPages - WithinPagesThreshold,
    numberOfPages
  );
  const currentPageWithinMiddleGroup =
    !currentPageWithinFirstGroup && !currentPageWithinLastGroup;

  // Create a set of arrays to represent the pages for each group
  const firstPageGroup = currentPageWithinFirstGroup
    ? range(PageGroupLength)
    : [firstPage];
  // Middle page group is 3 pages and always shows the current page in the
  // middle. Don't show it if the current page isn't inside it
  const middlePageGroup = currentPageWithinMiddleGroup
    ? [currentPage - 1, currentPage, currentPage + 1]
    : null;
  const lastPageGroup = currentPageWithinLastGroup
    ? range(numberOfPages - PageGroupLength, numberOfPages)
    : [lastPage];

  return (
    <>
      {firstPageGroup.map((page) => (
        <li key={page}>
          <PaginationButton
            currentPage={page === currentPage}
            onClick={() => updateSearchParams({ page_index: page })}
          >
            {page + 1}
          </PaginationButton>
        </li>
      ))}

      {/* Indicate that more pages exist that are hidden with ellipsis ... */}
      {(currentPageWithinFirstGroup || currentPageWithinMiddleGroup) && (
        <MoreHorizontal />
      )}

      {middlePageGroup?.map((page) => (
        <li key={page}>
          <PaginationButton
            currentPage={page === currentPage}
            onClick={() => updateSearchParams({ page_index: page })}
          >
            {page + 1}
          </PaginationButton>
        </li>
      ))}

      {(currentPageWithinLastGroup || currentPageWithinMiddleGroup) && (
        <MoreHorizontal />
      )}

      {lastPageGroup.map((page) => (
        <li key={page}>
          <PaginationButton
            currentPage={page === currentPage}
            onClick={() => updateSearchParams({ page_index: page })}
          >
            {page + 1}
          </PaginationButton>
        </li>
      ))}
    </>
  );
}
