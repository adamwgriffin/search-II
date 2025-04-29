import { useSearchState } from '~/providers/SearchStateProvider';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationGroups } from '~/components/PaginationGroups';

export type SearchResultsPaginationProps = {
  numberOfPages: number;
  currentPage: number;
};

// TODO: If anything besides a pagination event triggers a search we need to
// remove the page_index param to start over at the beginning
export function SearchResultsPagination({
  numberOfPages,
  currentPage
}: SearchResultsPaginationProps) {
  const { setSearchState } = useSearchState();

  return (
    <nav className='relative pt-6 pb-2' aria-labelledby='pagination'>
      <h2 id='pagination' className='sr-only'>
        Pagination
      </h2>
      <ul className='flex gap-2 items-center justify-center'>
        <button
          disabled={currentPage === 0}
          onClick={() => {
            setSearchState({ page_index: currentPage - 1 });
          }}
          aria-label='Go to previous page'
          className='disabled:text-gray-300 dark:disabled:text-gray-600'
        >
          <ChevronLeft />
        </button>

        <PaginationGroups
          numberOfPages={numberOfPages}
          currentPage={currentPage}
        />

        <button
          disabled={currentPage === numberOfPages - 1}
          onClick={() => {
            setSearchState({ page_index: currentPage + 1 });
          }}
          aria-label='Go to next page'
          className='disabled:text-gray-300 dark:disabled:text-gray-600'
        >
          <ChevronRight />
        </button>
      </ul>
    </nav>
  );
}
