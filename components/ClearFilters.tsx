"use client";

import { useSearchState } from "@/providers/SearchStateProvider";
import { Button } from "@/components/ui/button";

export function ClearFilters() {
  const { clearFilters } = useSearchState();

  return (
    <Button
      variant="outline"
      className="rounded-full dark:bg-gray-600 dark:text-inherit"
      type="button"
      onClick={clearFilters}
    >
      Clear All
    </Button>
  );
}
