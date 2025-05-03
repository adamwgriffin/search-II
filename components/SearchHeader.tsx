import { Filters } from "@/components/Filters";
import { Logo } from "@/components/Logo";
import { SearchLocation } from "@/components/SearchLocation/SearchLocation";
import { UserMenu } from "@/components/UserMenu";
import { Suspense } from "react";

export function SearchHeader() {
  return (
    <header className="grid grid-cols-[1fr_18rem_auto_1fr] items-center gap-8 p-4">
      <Logo />
      <Suspense>
        <SearchLocation />
      </Suspense>
      <Filters />
      <UserMenu />
    </header>
  );
}
