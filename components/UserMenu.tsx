import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function UserMenu() {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="shrink cursor-pointer rounded-full border border-gray-400 p-2">
            <FaUser className="text-2xl text-gray-400" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>My Account</DropdownMenuItem>
          <DropdownMenuItem>Saved Homes</DropdownMenuItem>
          <DropdownMenuItem>Saved Searches</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="flex justify-center">
            <ThemeSwitcher />
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
