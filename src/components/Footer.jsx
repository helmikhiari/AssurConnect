import { CrossIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo_transparent.png";
export default function Footer() {
  return (
    <footer className="bg-darkblue text-white py-8 mt-16 h-auto">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <img
            src={Logo}
            alt="logo"
            style={{
              objectFit: "contain",
            }}
            className="w-10"
          />
          <span className="text-lg font-semibold">AssurConnect</span>
        </div>
        <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8">
          <NavLink href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </NavLink>
          <NavLink href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </NavLink>
          <NavLink href="#" className="hover:underline" prefetch={false}>
            Contact Us
          </NavLink>
        </nav>
        <p className="text-sm text-gray-400 mt-4 md:mt-0">
          &copy; 2024 AssurConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
