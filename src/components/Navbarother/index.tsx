// components/Navbar.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

const NavbarOther = () => {
  return (
    <nav className="bg-[#FFFFFF] p-4 border border-[#DDDDDD] w-full">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo Image */}
        <div className="flex-shrink-0 ml-5">
          <Image
            src="/images/svgs/vector.svg"
            alt="Logo"
            width={123}
            height={58}
          />
        </div>

        {/* Center Navigation Links */}
        <div className="hidden md:flex flex-grow justify-center space-x-4 ml-20">
          <Link href="/">
            <span className="text-black hover:bg-gray-200 px-4 py-2 rounded cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="text-black hover:bg-gray-200 px-4 py-2 rounded cursor-pointer">
              Builder
            </span>
          </Link>
          <Link href="/services">
            <span className="text-black hover:bg-gray-200 px-4 py-2 rounded cursor-pointer">
              Cv
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-black hover:bg-gray-200 px-4 py-2 rounded cursor-pointer">
              Blogs
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-black hover:bg-gray-200 px-4 py-2 rounded cursor-pointer">
              Contact Us
            </span>
          </Link>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-2 mr-5">
          <Button className="h-12 bg-transparent border border-[#6B84FE] hover:bg-purple-700 hover:text-white text-[#6B84FE] px-12 rounded-xl">
            LOG IN
          </Button>
          <Button className="h-12 bg-[#6B84FE] hover:bg-purple-700 text-[#FFFFFF] px-12 rounded-xl">
            SIGN UP
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarOther;
