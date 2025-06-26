import { Logo } from "@/components/Logo";
import { UserMenu } from "@/components/UserMenu";

export function ListingDetailHeader() {
  return (
    <header className="grid grid-cols-[1fr_1fr] items-center gap-8 p-4">
      <Logo />
      <UserMenu />
    </header>
  );
}
