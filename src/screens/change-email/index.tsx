"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import TableLayout from "@/components/Tablelayout";
import Pagination from "@/components/Pagination";
import Wrapper1 from "@/components/Wrapper";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ChangeEmailList() {
  const [emailData, setEmailData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailPage, setEmailPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [totalEmailItems, setTotalEmailItems] = useState<number>(0);
  const { data: session }: any = useSession();
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const router = useRouter();

  const handleOpenChangeEmailModal = () => setIsChangeEmailModalOpen(true);
  const handleCloseChangeEmailModal = () => {
    setIsChangeEmailModalOpen(false);
    setNewEmail("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);
    try {
      const token = session.token;
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/request`,
        { email: newEmail },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Change email request sent successfully!");
      handleCloseChangeEmailModal;
      fetchEmailData(emailPage);
      handleCloseChangeEmailModal();
    } catch (error: any) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const emailColumns = [
    {
      header: "Email",
      accessor: "email",
      Cell: ({ row }: { row: any }) => <span>{row?.email || "N/A"}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: string }) => (
        <span className="font-semibold">{value}</span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      Cell: ({ value }: { value: string }) => (
        <span>{new Date(value).toLocaleDateString()}</span>
      ),
    },
  ];

  useEffect(() => {
    fetchEmailData(emailPage);
  }, [session, emailPage]);

  const totalEmailPages = Math.ceil(totalEmailItems / itemsPerPage);

  const fetchEmailData = async (pageNo: number) => {
    if (!session) return;
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/request/list?pageNo=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmailData(response.data.result.data);
      setTotalEmailItems(response.data.result.pagination.total);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="flex w-full">
        <Wrapper1>
          <div className="flex flex-col items-center w-full">
            <div className="bg-white w-full rounded-lg">
              {/* Change Email List */}
              <div className="flex justify-between items-center max-w-[1000px] border-b mx-auto py-4">
                <h1 className="text-xl font-semibold">Change Email List</h1>
                <Button
                  onClick={handleOpenChangeEmailModal}
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-3xl hover:text-white hover:bg-blue-600"
                >
                  Change Email
                </Button>
              </div>

              <TableLayout
                columns={emailColumns}
                data={emailData}
                isHrVisible={false}
              />
              <div className="flex justify-center py-4">
                <Pagination
                  currentPage={emailPage}
                  totalPages={totalEmailPages}
                  onPageChange={(page) => {
                    setEmailPage(page);
                  }}
                />
              </div>
            </div>
          </div>
        </Wrapper1>
      </div>

      {/* Change Email Modal */}
      {isChangeEmailModalOpen && (
        <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-newspaper bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={handleCloseChangeEmailModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <p className="my-2 text-2xl text-center mb-6 font-bold">
              Change Email
            </p>

            <form onSubmit={handleEmailSubmit}>
              <div className="w-full grid grid-cols-1 gap-3">
                <div className="col-span-1">
                  <InputField
                    label="New Email"
                    type="email"
                    name="email"
                    required={true}
                    value={newEmail}
                    placeholder="Enter the new email address"
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <div className="flex justify-center col-span-1 mt-5">
                <Button
                  type="submit"
                  className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white flex items-center justify-center border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
