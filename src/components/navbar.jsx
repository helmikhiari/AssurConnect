import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../Context/userContext";
import Loading from "./loading";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import imgPatient from "../assets/images/Vector1.png";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
export default function NavBar() {
  const { activeProfile,logOut } = useContext(userContext);
  const active = "text-md font-bold underline";
  const unactive = "text-sm font-medium hover:underline";
  return activeProfile != null ? (
    <header className="bg-[#272643] text-gray-50 px-4 md:px-6 h-auto flex items-center flex-col sm:flex-row sm:h-16">
      <NavLink className="flex items-center gap-2 bg-transparent pb-5 sm:pb-0">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold ">AssurConnect</span>
      </NavLink>
      <nav className="sm:ml-auto flex items-center  sm:gap-6 flex-col sm:flex-row space-y-3 sm:space-y-0">
        <NavLink
          className={({ isActive }) => (isActive ? active : unactive)}
          to="/"
        >
          Home
        </NavLink>
        <NavLink className="text-sm font-medium hover:underline" href="#">
          Services
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? active : unactive)}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? active : unactive)}
          to="/contact"
        >
          Contact
        </NavLink>
      </nav>
      <div className="sm:ml-6 py-3">
        {activeProfile?.data === false && (
          <Button
            className="bg-transparent hover:bg-white hover:text-[#272643] border-none flex justify-center"
            variant="outline"
          >
            <NavLink to="/login">Login</NavLink>
          </Button>
        )}
        {activeProfile?.data !== false && 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-12 w-12 text-darkblue cursor-pointer">
                <AvatarImage src={"imgPatient"} />
                {activeProfile.role === "Doctor" && (
                  <AvatarFallback>
                    {activeProfile.data.firstName[0] +
                      activeProfile.data.lastName[0]}
                  </AvatarFallback>
                )}
                {(activeProfile.role === "Company" ||
                  activeProfile.role === "Assurance" ||
                  activeProfile.role === "Pharmacy") && 
                  <AvatarFallback>
                    {activeProfile.data.name[0] + activeProfile.data.name[1]}
                  </AvatarFallback>}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                <NavLink to="/dashboard">Dashboard</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <NavLink to="/dashboard/settings">Settings</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={logOut}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </header>
  ) : (
    <Loading />
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
function LayoutDashboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}


function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}