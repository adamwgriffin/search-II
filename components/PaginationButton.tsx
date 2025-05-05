export type PaginationButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    currentPage?: boolean;
  };

export function PaginationButton({
  currentPage,
  children,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      aria-current={currentPage ? "page" : undefined}
      disabled={currentPage}
      className="flex justify-center items-center h-7 w-7 rounded-full hover:bg-slate-200
        dark:hover:text-black aria-[current=page]:bg-black
        dark:aria-[current=page]:bg-white aria-[current=page]:text-white
        dark:aria-[current=page]:text-black"
      {...props}
    >
      {children}
    </button>
  );
}
