import Image from "next/image";
import SHARPDESK_LOGO from "../../../public/images/svgs/sharpdesk-logo-white.svg";
import FACEBOOK from "../../../public/images/svgs/facebook.svg";
import INSTA from "../../../public/images/svgs/insta.svg";
import TWITTER from "../../../public/images/svgs/twitter.svg";
import LINKEDIN from "../../../public/images/svgs/linkedin.svg";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// // <Link href="/dashboard">
// <Image
// src="/images/svgs/logo.svg"
// width={169}
// height={45}
// alt="Logo"
// />
// </Link>

function Footer() {
  const router = useRouter()
  return (
    <>
      <div className="bg-[#0f172a]">
        <div className="flex justify-center py-[50px]">
          <Image
            src="/images/svgs/logo1.svg"
            alt="logo"
            width={169}
            height={45}
            onClick={()=>router.push("/")}
            className="cursor-pointer"
          />
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 mx-4 md:mx-8 lg:mx-20 pb-10 border-b-2 border-[#ffffff]">
          <div className="w-full md:w-auto px-4">
            <h3 className="text-left text-[22px] text-[#ffffff] font-semibold">
              RESUME
            </h3>
            <ul className="space-y-[18px] text-left mt-4 list-none p-0 text-[#ffffff]">
              <li className="transition-transform transform hover:scale-105">
                <Link href="/#builder-section" className="text-sm font-semibold">
                  Resume Builder
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Resume Templates
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Resume Examples
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Resume Format
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Resume Checker
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Resume Help
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto px-4">
            <h3 className="text-left text-[22px] text-[#ffffff] font-semibold">
              CV
            </h3>
            <ul className="space-y-[18px] text-left mt-4 list-none p-0 text-[#ffffff]">
              <li className="transition-transform transform hover:scale-105">
                <Link href="/#builder-section" className="text-sm font-semibold">
                  CV Builder
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  CV Templates
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  CV Examples
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  CV Format
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  How To Write A CV
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  CV Help
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto px-4">
            <h3 className="text-left text-[22px] text-[#ffffff] font-semibold">
              QUICK LINKS
            </h3>
            <ul className="space-y-[18px] text-left mt-4 list-none p-0 text-[#ffffff]">
              <li className="transition-transform transform hover:scale-105">
                <Link href="/" className="text-sm font-semibold">
                  Home
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/#builder-section" className="text-sm font-semibold">
                  Builder
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  CV
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Blogs
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Contact Us
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/auth/signup" className="text-sm font-semibold">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto px-4">
            <h3 className="text-left text-[22px] text-[#ffffff] font-semibold">
              SUPPORT
            </h3>
            <ul className="space-y-[18px] text-left mt-4 list-none p-0 text-[#ffffff]">
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  About Us
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  FAQS
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Guidelines
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Media Mentions
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Accessibility
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto px-4">
            <h3 className="text-left text-[22px] text-[#ffffff] font-semibold">
              &nbsp;
            </h3>
            <ul className="space-y-[18px] text-left mt-4 list-none p-0 text-[#ffffff]">
              <li className="transition-transform transform hover:scale-105">
                <Link href="/privacy-policy" className="text-sm font-semibold">
                  Privacy Policy
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Terms of Services
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Terms & Conditions
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Cookies
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Tracking Policy
                </Link>
              </li>
              <li className="transition-transform transform hover:scale-105">
                <Link href="/coming-soon" className="text-sm font-semibold">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-4 md:mx-8 lg:mx-20 py-[44px]">
          <div className="text-base flex justify-center items-center lg:justify-start md:justify-start text-[#ffffff] font-normal">
            © 2024 Works Limited. All Rights Reserved.
          </div>
          <div className="gap-4 flex justify-center lg:justify-end md:justify-end items-center">
            <Link href="https://www.facebook.com" target="_blank">
              <Image
                className="transition-transform transform hover:scale-105 cursor-pointer"
                src={FACEBOOK}
                alt="Facebook logo"
                width={48}
                height={48}
              />
            </Link>

            <Link href="https://www.instagram.com" target="_blank">
              <Image
                className="transition-transform transform hover:scale-105 cursor-pointer"
                src={INSTA}
                alt="Instagram logo"
                width={48}
                height={48}
              />
            </Link>

            <Link href="https://www.twitter.com" target="_blank">
              <Image
                className="transition-transform transform hover:scale-105 cursor-pointer"
                src={TWITTER}
                alt="Twitter logo"
                width={48}
                height={48}
              />
            </Link>

            <Link href="https://www.linkedin.com" target="_blank">
              <Image
                className="transition-transform transform hover:scale-105 cursor-pointer"
                src={LINKEDIN}
                alt="LinkedIn logo"
                width={48}
                height={48}
              />
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
