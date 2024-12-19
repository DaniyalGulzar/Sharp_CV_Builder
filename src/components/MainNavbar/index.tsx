import React, { useState } from "react";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200  border-y-2">
        <div className="md:mx-8 lg:mx-20 flex flex-wrap items-center justify-between mx-auto py-2">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/svgs/logo.svg"
              width={169}
              height={45}
              alt="Logo"
              onClick={() => router.push("/")}
              className="cursor-pointer"
            />
          </a>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:block lg:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium mb-0 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white   ">
              <Link href="/" className="flex items-center">
                <span
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  HOME
                </span>
              </Link>
              <Link href="/#builder-section" className="flex items-center">
                <span className="block py-2 px-3 text-666666 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  BUILDER
                </span>
              </Link>
              <Link href="/coming-soon" className="flex items-center">
                <span className="block py-2 px-3 text-666666 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  CONTACT US
                </span>
              </Link>
              <Link href="/subscription" className="flex items-center">
                <span className="block py-2 px-3 text-666666 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  PACKAGES
                </span>
              </Link>
              <div className="h-12 flex items-center">
                {status !== "loading" && (
                  <>
                    {status !== "authenticated" ? (
                      <>
                        <Link href="/auth/signin" className="my-1">
                          <Button className="h-12 w-28 bg-transparent rounded-lg text-blue-400 border border-[#6B84FE] hover:bg-indigo-700 hover:text-white">
                            LOG IN
                          </Button>
                        </Link>{" "}
                        &nbsp; &nbsp;
                        <Link href="/auth/signup" className="my-1">
                          <Button className="h-12 w-28 bg-[#6B84FE] text-sm text-white rounded-lg hover:bg-sky-700 hover:text-white">
                            SIGN UP
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={
                          session?.user?.role === "SuperAdmin"
                            ? "/admin-dashboard"
                            : session?.user?.role === "CustomerSupport"
                            ? "/support-change-email-dashboard"
                            : "/dashboard"
                        }
                        className="flex items-center"
                      >
                        <span className="block py-2 px-3 text-666666 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                          DASHBOARD
                        </span>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
