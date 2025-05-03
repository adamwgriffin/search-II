import { Suspense } from "react";
import { Baths } from "@/components/Baths";
import { Beds } from "@/components/Beds";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Filters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full dark:bg-gray-600 dark:text-inherit"
        >
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <form className="flex flex-col gap-4 p-4">
          <Suspense>
            <Beds />
            <Baths />
          </Suspense>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
