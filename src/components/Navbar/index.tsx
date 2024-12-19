import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface NavbarProps {
  showLogout?: boolean;
  showRight?: boolean;
  welcomeText: string;
  showNavItems?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  showLogout,
  showRight,
  welcomeText,
  showNavItems,
}) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("user");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status }: any = useSession();
  const [navToggle, setNavToggle] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [userCount, setUserCount] = useState<number | null>(null);

  const handleLogout = async (e: any) => {
    e.stopPropagation(); // Stop event from closing the dropdown
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  const handleRoute = () => {
    router.push("/settings");
  };

  useEffect(() => {
    if (session) {
      if (session.user) setName(session.user.username);
      else handleLogout;
    }
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // const notifications = [
  //   {
  //     id: 1,
  //     title: "Login",
  //     message: "You are logged in right now.",
  //     date: "22-01-2024",
  //     icon:<FaUserCircle className="text-5xl text-gray-400" />
  //   },
  //   {
  //     id: 2,
  //     title: "New Message",
  //     message: "You have received a new message from John.",
  //     date: "21-01-2024",
  //     icon:<FaUserCircle className="text-5xl text-gray-400" />
  //   },
  //   {
  //     id: 3,
  //     title: "Update Available",
  //     message: "A new update is available for your application.",
  //     date: "20-01-2024",
  //     icon:<FaUserCircle className="text-5xl text-gray-400" />
  //   },
  //   {
  //     id: 4,
  //     title: "Subscription Expiry",
  //     message: "Your subscription will expire soon.",
  //     date: "19-01-2024",
  //     icon:<FaUserCircle className="text-5xl text-gray-400" />
  //   },
  // ];

  const navItems = [
    { name: "DASHBOARD", href: "/dashboard" },
    { name: "RESUMES", href: "/resume-list" },
    { name: "COVER LETTER", href: "/coming-soon" },
    { name: "PACKAGES", href: "/subscription" },
    { name: "PROFILE", href: "/coming-soon" },
  ];
  const customerSupportItems = [
    { name: "Email Change List", href: "/support-change-email-dashboard" },
  ];
  const resellerItems = [
    { name: "REFERRAL LIST", href: "/reseller-referral-list" },
  ];
  const adminItems = [{ name: "DASHBOARD", href: "/admin-dashboard" }];
  const currentPath = usePathname();

  const fetchData = async () => {
    if (!session) return; // Early return if session is not available
    try {
      const token = session.token; // Access token from user object
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/notification`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
          },
        }
      );
      setNotifications(response.data.result);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCount = async () => {
    if (!session) return; // Early return if session is not available
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/list?pageNo=1`,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );
      setUserCount(response.data.result.pagination.total);
    } catch (error: any) {
      toast.error("Failed to fetch user count");
    }
  };

  useEffect(() => {
    if (
      session?.user?.role === "SuperAdmin" &&
      currentPath?.includes("admin-dashboard")
    ) {
      fetchUserCount();
    }
  }, [session]);

  return (
    <div className="bg-[#FFFFFF] p-4 flex flex-col md:flex-row justify-between items-center w-full h-auto md:h-[65px]">
      {/* Logo and Mobile Menu Toggle */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <>
          {session?.user?.role === "User" ? (
            <Link href="/">
              <Image
                src="/images/svgs/logo.svg"
                width={169}
                height={45}
                alt="Logo"
                className="cursor-pointer "
              />
            </Link>
          ) : (
            <Link href="/">
              <Image
                src="/images/svgs/logo.svg"
                width={169}
                height={45}
                alt="Logo"
                className="cursor-pointer"
                onClick={(e) => e.preventDefault()} // Prevents navigation if role is not "User"
              />
            </Link>
          )}
        </>
        {/* Mobile Menu Toggle */}
        {showNavItems && (
          <button
            className="lg:hidden ml-4"
            onClick={() => setNavToggle(!navToggle)}
          >
            {navToggle ? (
              <FaTimes className="text-gray-800" size={24} />
            ) : (
              <FaBars className="text-gray-800" size={24} />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {showNavItems && navToggle && (
        <div className="lg:hidden absolute top-[65px] left-0 w-full bg-white z-50">
          <div className="flex flex-col p-4 space-y-2">
            {session?.user?.role === "User" ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            ) : session?.user?.role === "Reseller" ? (
              <>
                {resellerItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            ) : session?.user?.role === "SuperAdmin" &&
              currentPath?.startsWith("/admin-dashboard") ? (
              <>
                <div className="flex items-center justify-center text-gray-900 font-semibold">
                  Total Users:{" "}
                  <span className="ml-2 text-blue-500">
                    {userCount ?? "Loading..."}
                  </span>
                </div>
              </>
            ) : session?.user?.role === "SuperAdmin" &&
              currentPath?.includes("settings") ? (
              <>
                {adminItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            ) : session?.user?.role === "CustomerSupport" ? (
              <>
                {/* {customerSupportItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))} */}
              </>
            ) : null}

            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center justify-center w-[100%] bg-[#F3F3F3] h-[45px] border-0 p-2 rounded-full text-black"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaCircleUser className="text-3xl" />
                {session && <span className="font-bold ml-2">{name}</span>}
                <FaChevronDown className="text-gray-500 ml-2" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute p-2 mt-2 w-full bg-white border rounded-lg shadow-lg z-50"
                  style={{
                    minWidth: "150px",
                    position: "absolute",
                    right: "-10px",
                  }}
                >
                  {!showLogout && (
                    <>
                      {/* Conditionally Render Change Email Button if user role is 'User' */}
                      {session?.user?.role === "User" && (
                        <button
                          onClick={() => router.push("/change-email")} // Navigate to the change email page
                          className="flex items-center p-2 text-blue-500 hover:text-blue-700 w-full"
                        >
                          <span className="ml-2">Change Email</span>
                        </button>
                      )}

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center p-2 text-red-500 hover:text-red-700 w-full"
                      >
                        <span className="">Logout</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation Menu */}
      {showNavItems && (
        <div className="hidden lg:flex flex-nowrap justify-center items-center">
          <div className="flex space-x-6">
            {session?.user?.role === "User" ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            ) : session?.user?.role === "Reseller" ? (
              <>
                {resellerItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            ) : session?.user?.role === "SuperAdmin" &&
              currentPath?.startsWith("/admin-dashboard") ? (
              <>
                <div className="flex items-center justify-center text-gray-900 font-semibold">
                  Total Users:{" "}
                  <span className="ml-2 text-blue-500">
                    {userCount ?? "Loading..."}
                  </span>
                </div>
              </>
            ) : session?.user?.role === "SuperAdmin" &&
              currentPath?.includes("settings") ? (
              <>
                {adminItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </>
            ) : session?.user?.role === "CustomerSupport" ? (
              <>
                {/* {customerSupportItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 font-semibold hover:text-blue-500"
                    onClick={() => setNavToggle(false)}
                  >
                    {item.name}
                  </Link>
                ))} */}
              </>
            ) : null}
          </div>

          {/* Desktop Notifications and Profile */}
          {showRight && (
            <div className="flex items-center space-x-4 ml-6">
              {/* Notifications */}
              <div className="relative" ref={notificationDropdownRef}>
                <div
                  onClick={() =>
                    setNotificationDropdownOpen(!notificationDropdownOpen)
                  }
                  className="cursor-pointer"
                >
                  <Image
                    src="/images/svgs/Group 62.svg"
                    width={40}
                    height={40}
                    alt="Notifications"
                  />
                </div>
                {notificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-[370px] max-h-[400px] overflow-auto rounded-xl shadow-lg bg-white z-50">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start space-x-4 p-4 border-b last:border-none hover:bg-gray-100 transition-colors duration-200"
                        >
                          {/* Icon or Avatar */}
                          <div className="text-xl text-blue-600">
                            <FaUserCircle className="text-5xl text-gray-400" />
                          </div>
                          {/* Notification Content */}
                          <div className="flex-1">
                            <div className="text-sm text-gray-800 font-semibold">
                              {notification.description}
                            </div>
                            <p className="text-sm text-gray-600">
                              {notification.message}
                            </p>
                            <div className="text-xs text-gray-400 mt-1">
                              {notification.createdAt}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-semibold text-gray-600">
                        No new notifications
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Settings */}
              <div onClick={handleRoute} className="cursor-pointer">
                <Image
                  src="/images/svgs/Group 61.svg"
                  width={40}
                  height={40}
                  alt="Settings"
                />
              </div>

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center  bg-[#F3F3F3] h-[45px] border-0 p-2 rounded-full text-black"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaCircleUser className="text-3xl" />
                  {session && <span className="font-bold ml-2">{name}</span>}
                  <FaChevronDown className="text-gray-500 ml-2" />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute p-2 mt-2 w-full bg-white border rounded-lg shadow-lg z-50"
                    style={{
                      minWidth: "150px",
                      position: "absolute",
                      right: "-10px",
                    }}
                  >
                    {!showLogout && (
                      <>
                        {/* Conditionally Render Change Email Button if user role is 'User' */}
                        {session?.user?.role === "User" && (
                          <button
                            onClick={() => router.push("/change-email")} // Navigate to the change email page
                            className="flex items-center  text-blue-500 hover:text-blue-700 w-full"
                          >
                            <span className="ml-2 mt-2">Change Email</span>
                          </button>
                        )}

                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center p-2 text-red-500 hover:text-red-700 w-full"
                        >
                          <span className="">Logout</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
