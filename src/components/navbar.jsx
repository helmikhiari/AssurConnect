import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const active = "text-md font-bold underline";
  const unactive = "text-sm font-medium hover:underline";
  return (
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
        <Button
          className="bg-transparent hover:bg-white hover:text-[#272643] border-none flex justify-center"
          variant="outline"
        >
          <NavLink to="/login">Login</NavLink>
        </Button>
      </div>
    </header>
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
