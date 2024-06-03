import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "../assets/icons/icons";

export default function InfoBar() {
  return (
    <div className="flex items-center justify-end px-4 py-6 bg-darkblue shadow-sm h-[50px] w-full shrink">
      <div className="flex items-center space-x-4">
        <Button className="rounded-full hover:bg-[#3a3d6b] hover:text-gray-50" size="icon" variant="ghost">
          <BellIcon className="h-5 w-5 text-white" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </div>
  );
}



