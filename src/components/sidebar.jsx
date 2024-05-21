import React, { useState, useEffect, useRef, useContext, act } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CloudIcon, LogOutIcon, MenuIcon } from "../assets/icons/icons";
import { userContext } from "../Context/userContext";
import userIcon from "../assets/icons/placeholder.png";
export default function SideBar({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef();
  const { setActiveProfile, activeProfile } = useContext(userContext);
  const navigate = useNavigate();
  const logOut = () => {
    setActiveProfile({ data: false });
    localStorage.clear();
    navigate("/login");
  };
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    console.log(activeProfile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="flex flex-col h-screen w-auto drop-shadow  z-40 ">
      <div
        ref={sidebarRef}
        className={`  fixed inset-y-0 left-0 w-[200px] bg-[#272643] drop-shadow-mdtransform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full justify-between px-6 py-8 drop-shadow">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <CloudIcon className="h-6 w-6 text-gray-50" />
              <span className="text-lg font-semibold text-gray-50 ">
                AssurConnect
              </span>
            </div>
            <nav className="space-y-2">
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors text-white hover:bg-[#3a3d6b] hover:text-gray-50 ${
                    location.pathname === link.url
                      ? "bg-[#3a3d6b] text-gray-50"
                      : ""
                  }`}
                  to={link.url}
                >
                  {link.icon}
                  {link.text}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="space-y-2">
            <NavLink
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-[#3a3d6b] hover:text-gray-50"
              to="/dashboard/profile"
            >
              <Avatar className="h-10 w-10 text-darkblue">
                <AvatarImage src="elj" />
                {activeProfile.role === "Doctor" && (
                  <AvatarFallback>
                    {activeProfile.data.firstName[0] +
                      activeProfile.data.lastName[0]}
                  </AvatarFallback>
                )}
                {(activeProfile.role === "Company" ||
                  activeProfile.role === "Assurance" ||
                  activeProfile.role === "Pharmacy") && (
                  <AvatarFallback>
                    {activeProfile.data.name[0] + activeProfile.data.name[1]}
                  </AvatarFallback>
                )}
              </Avatar>
              <p className="break-words w-full">
                {activeProfile.role == "Doctor"
                  ? activeProfile.data.firstName +
                    " " +
                    activeProfile.data.lastName
                  : activeProfile.data.name}
              </p>
            </NavLink>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <NavLink
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-[#3a3d6b] hover:text-gray-50"
                  to="#"
                >
                  <LogOutIcon className="h-5 w-5" />
                  Logout
                </NavLink>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-bold text-darkblue">
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will end your current session and you will need to log
                    in again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-[#272643]" onClick={logOut}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div
        className={`sm:hidden ${
          isOpen ? "invisible" : "visible"
        } fixed top-4 left-4 z-50`}
      >
        <button
          onClick={toggleSidebar}
          className="text-gray-700 focus:outline-none"
        >
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}
