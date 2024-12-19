import React from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaTachometerAlt,
  FaUserShield,
  FaHeadset,
} from "react-icons/fa";

export default function AdminSidebar() {
  const router = useRouter();

  return (
    <nav className="h-screen w-64 bg-gray-800 text-white flex flex-col items-center py-6 fixed">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <div className="flex flex-col w-full px-4">
        <button
          className="flex items-center w-full py-4 px-4 text-lg font-semibold hover:bg-gray-700 rounded-lg whitespace-nowrap"
          onClick={() => router.push("/admin-dashboard")}
        >
          <FaTachometerAlt className="mr-4" size={20} /> Dashboard
        </button>

        <button
          className="flex items-center w-full py-4 px-4 text-lg font-semibold hover:bg-gray-700 rounded-lg whitespace-nowrap"
          onClick={() => router.push("/admin-user-list")}
        >
          <FaUsers className="mr-4" size={20} /> User Management
        </button>

        <button
          className="flex items-center w-full py-4 px-4 text-lg font-semibold hover:bg-gray-700 rounded-lg whitespace-nowrap overflow-hidden"
          onClick={() => router.push("/super-admin-dashboard")}
        >
          <FaUserShield className="mr-2" size={20} />
          <span className="truncate">Reseller Management</span>
        </button>
        <button
          className="flex items-center w-full py-4 px-4 text-lg font-semibold hover:bg-gray-700 rounded-lg whitespace-nowrap"
          onClick={() => router.push("/admin-customer-support-list")}
        >
          <FaHeadset className="mr-4" size={20} /> Customer Support
        </button>
      </div>
    </nav>
  );
}
