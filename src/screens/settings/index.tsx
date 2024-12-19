"use client";

import React, { useState } from "react";
import Wrapper1 from "@/components/Wrapper";
import { useSession } from "next-auth/react";
import { IoPencil } from "react-icons/io5";
import InputField from "@/components/InputField";
import axios from "axios";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Setting() {
  const { data: session, status }: any = useSession(); // Use session and status
  const email = session?.user?.email;
  const username = session?.user?.username;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: username,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const openPasswordModal = () => setPasswordModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    let formattedValue = value;
    if (type === "text") {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      setLoading(false);
      return;
    }

    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/auth/update-profile`,
        { username: formData.username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated!");
      setModalOpen(false);
    } catch (error: any) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Check if any fields are empty
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmNewPassword
    ) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Check if the new password matches the old password
    if (formData.oldPassword === formData.newPassword) {
      toast.error("New password cannot be the same as the old password.");
      setLoading(false);
      return;
    }

    // Check if new password and confirm password match
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New password and Confirm New Password do not match");
      setLoading(false);
      return;
    }

    if (!session) {
      setLoading(false);
      return;
    }

    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/auth/change-password`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password changed!");
      setPasswordModalOpen(false);
    } catch (error) {
      toast.error("Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="flex w-full">
        <Wrapper1>
          <div className="bg-[#F3F3F3] h-[calc(100vh-65px)] overflow-auto">
            <div className="max-w-[1200px] lg:mx-auto mx-4 ">
              <div className="my-8">
                <span className="text-3xl font-semibold">MY ACCOUNT</span>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4 bg-white rounded-xl p-4">
                  <ul className="list-none p-0">
                    <li className="text-lg cursor-pointer font-semibold p-5 my-3 bg-[#0070d7] text-white active:bg-1B76FF">
                      General Account Settings
                    </li>
                    {/* {session.user.role !== "SuperAdmin" &&
                      session.user.role !== "CustomerSupport" && (
                        <Link href="/coming-soon">
                          <li className="text-lg cursor-pointer font-semibold p-5 my-3 hover:bg-[#0070d7] hover:text-white active:bg-1B76FF">
                            Subscription
                          </li>
                        </Link>
                      )} */}
                  </ul>
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-8 rounded-xl bg-white p-4">
                  <div className="p-5">
                    <div>
                      <span className="text-3xl">General Account Settings</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 border-b border-gray-300 py-5 items-center">
                      <span className="text-xl font-semibold">Email ID:</span>
                      <span className="text-xl truncate">{email}</span>
                      {session.user.role !== "SuperAdmin" &&
                        session.user.role !== "CustomerSupport" && (
                          <span
                            onClick={openModal}
                            className="text-xl bg-blue-500 text-white rounded-md p-2 hover:underline flex flex-col cursor-pointer items-center md:justify-self-end"
                          >
                            <AiFillEdit />
                          </span>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 border-b border-gray-300 py-5 items-center">
                      <span className="text-xl font-semibold">Password:</span>
                      <span className="text-xl">******</span>
                      <span
                        onClick={openPasswordModal}
                        className="text-xl bg-blue-500 text-white rounded-md p-2 hover:underline flex flex-col cursor-pointer items-center md:justify-self-end"
                      >
                        <AiFillEdit />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper1>
        {/* Modal */}
        {modalOpen &&
          session.user.role !== "SuperAdmin" &&
          session.user.role !== "CustomerSupport" && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] animate-wave-effect">
                <h2 className="text-xl font-bold text-center my-5">
                  Edit Name
                </h2>
                <p className="mt-2 text-base text-[#666666] text-center">
                  Are you sure you want to change Name?
                </p>
                <form onSubmit={handleEmailSubmit}>
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    disabled={true}
                    placeholder="Enter Email Address"
                    onChange={handleChange}
                  />
                  <InputField
                    label="User Name"
                    name="username"
                    type="text"
                    value={formData.username}
                    placeholder="Enter User Name"
                    onChange={handleChange}
                  />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="mt-4 bg-blue-500 hover:bg-[#6B84FE] hover:text-white text-white py-2 px-4 rounded"
                    >
                      Save
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-4 bg-blue-500 hover:bg-[#6B84FE] hover:text-white text-white py-2 px-4 rounded"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        {/* PasswordModal */}
        {passwordModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white animate-wave-effect p-6 rounded-lg w-full max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] ">
              <h2 className="text-xl font-bold text-center my-5">
                Password Change
              </h2>
              <p className="mt-2 text-base text-[#666666] text-center">
                Are you sure you want to change Password?
              </p>
              <form onSubmit={handleChangePassword}>
                <InputField
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                  value={formData.oldPassword}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                <InputField
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  placeholder="Enter New Password"
                  onChange={handleChange}
                />
                <InputField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  value={formData.confirmNewPassword}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-[#6B84FE] text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    onClick={() => setPasswordModalOpen(false)}
                    className="mt-4 bg-blue-500 hover:bg-[#6B84FE] text-white py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Setting;
