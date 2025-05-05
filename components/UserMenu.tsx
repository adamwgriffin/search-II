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
        <DropdownMenuTrigger
          aria-label="Navigation and Settings"
          className="border-gray-400 text-2xl rounded-full border p-2 text-gray-400
            hover:border-purple-500 hover:text-purple-500"
        >
          <FaUser />
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
