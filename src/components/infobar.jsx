import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "../assets/icons/icons";
import { AlarmClockIcon, CalendarIcon, MailIcon } from "lucide-react";

export default function InfoBar() {
  return (
    <div className="flex items-center justify-end px-4 py-6 bg-darkblue shadow-sm h-[50px] w-full shrink">
      <div className="flex items-center space-x-4">
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="contained" className="hover:shadow-lg">
          <BellIcon className="h-4 w-4" />
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-medium ">1</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Notifications</h3>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CalendarIcon className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Meeting scheduled</p>
              <p className="text-muted-foreground text-sm">
                Your weekly team meeting is scheduled for tomorrow at 10am.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MailIcon className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">New message</p>
              <p className="text-muted-foreground text-sm">You have a new message from Jane Doe.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlarmClockIcon className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Deadline approaching</p>
              <p className="text-muted-foreground text-sm">The project deadline is in 2 days.</p>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
        
      </div>
    </div>
  );
}



