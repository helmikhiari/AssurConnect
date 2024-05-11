

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <header className="bg-[#272643] text-gray-50 px-4 md:px-6 h-16 flex items-center">
      <Link  className="flex items-center gap-2 bg-transparent" href="#">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">AssurConnect</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 md:gap-6">
        <Link className="text-sm font-medium hover:underline" to='/login' href="#">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Products
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Contact
        </Link>
      </nav>
      <div className="ml-6">
        <Button className="bg-transparent hover:bg-white hover:text-[#272643] border-none" variant="outline">
          <Link to='/login'>Login</Link>
        </Button>
      </div>
    </header>
  )
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
  )
}