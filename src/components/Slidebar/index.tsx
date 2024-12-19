import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const router = useRouter();
  const handleClick = (path: any) => {
    setActiveItem(path);
  };

  const confirmLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logout successful!");
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Failed to logout.");
    }
  };

  return (
    <div className="lg:w-64 w-20 bg-white h-screen justify-between flex flex-col ">
      <div>
        <div className="w-full border-b border-r flex justify-center items-center ">
          <Image
            src="/images/svgs/logo.svg"
            alt="providernow"
            width={128}
            onClick={()=>router.push("/")}
            height={34}
            className="mx-[40px] my-[28px] hidden lg:block cursor-pointer"
          />

          <Image
            src="/images/svgs/favicon.svg"
            alt="providernow"
            width={40}
            onClick={()=>router.push("/")}
            height={40}
            className="mx-[46px] my-[28px] lg:hidden"
          />
        </div>

        {/* Navigation Links */}
        <nav className="mt-5 ">
          <Link
            href="#"
            onClick={() => handleClick("#dashboard")}
            className={`flex items-center justify-center lg:justify-start p-3 mb-4 transition-colors duration-300 ${
              activeItem === "#dashboard"
                ? "bg-blue-600 text-white"
                : "text-black hover:bg-blue-500 hover:text-white"
            }`}
          >
            <Image
              src="/images/svgs/house.svg"
              alt="dashboard"
              height={24}
              width={24}
            />
            <span className="hidden lg:inline ml-4">Dashboard</span>
          </Link>

          <Link
            href="#"
            onClick={() => handleClick("#resume-template")}
            className={`flex items-center justify-center lg:justify-start p-3 mb-4 transition-colors duration-300 ${
              activeItem === "#resume-template"
                ? "bg-blue-600 text-white"
                : "text-black hover:bg-blue-500 hover:text-white"
            }`}
          >
            <Image
              src="/images/svgs/letter.svg"
              alt="resume template"
              height={24}
              width={24}
            />
            <span className="hidden lg:inline ml-4">Resume Template</span>
          </Link>

          <Link
            href="#"
            onClick={() => handleClick("#create-resume")}
            className={`flex items-center justify-center lg:justify-start p-3 mb-4 transition-colors duration-300 ${
              activeItem === "#create-resume"
                ? "bg-blue-600 text-white"
                : "text-black hover:bg-blue-500 hover:text-white"
            }`}
          >
            <Image
              src="/images/svgs/add.svg"
              alt="create new resume"
              height={24}
              width={24}
            />
            <span className="hidden lg:inline ml-4">Create New Resume</span>
          </Link>

          <Link
            href="#"
            onClick={() => handleClick("#notifications")}
            className={`flex items-center justify-center lg:justify-start p-3 mb-4 transition-colors duration-300 ${
              activeItem === "#notifications"
                ? "bg-blue-600 text-white"
                : "text-black hover:bg-blue-500 hover:text-white"
            }`}
          >
            <Image
              src="/images/svgs/hugeicons_notification-02.svg"
              alt="notifications"
              height={24}
              width={24}
            />
            <span className="hidden lg:inline ml-4">Notifications</span>
          </Link>

          <Link
            href="#"
            onClick={() => handleClick("#settings")}
            className={`flex items-center justify-center lg:justify-start p-3 mb-4 transition-colors duration-300 ${
              activeItem === "#settings"
                ? "bg-blue-600 text-white"
                : "text-black hover:bg-blue-500 hover:text-white"
            }`}
          >
            <Image
              src="/images/svgs/setting.svg"
              alt="settings"
              height={24}
              width={24}
            />
            <span className="hidden lg:inline ml-4">Settings</span>
          </Link>
        </nav>
      </div>

      <div>
        <div className="hidden lg:flex items-center justify-center h-40 bg-[#F0F3FF] mx-5 rounded-xl mb-5 p-4">
          <div className="bg-white w-full h-full flex flex-col items-center justify-center rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-200 text-blue-500 rounded-full">
              10%
            </div>
            <span className="mt-4 text-gray-700">Resume Completion</span>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>

        <div className="">

          <button
            onClick={confirmLogout}
            className="hidden lg:flex items-center justify-center bg-black text-white w-full h-12  shadow-md hover:bg-gray-800 transition-colors duration-300"
          >
            <Image
              src="/images/svgs/logout1.svg"
              alt="logout"
              height={20}
              width={20}
              className="mr-3"
            />
            <span>Logout</span>
          </button>

          <button
            onClick={() => alert("Logged out")}
            className="lg:hidden flex items-center justify-center bg-black text-white w-10 h-10 mx-auto rounded-full hover:bg-gray-800 transition-colors duration-300"
          >
            <Image
              src="/images/svgs/logout1.svg"
              alt="logout"
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
