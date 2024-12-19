"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import moment from "moment";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import TableLayout from "@/components/Tablelayout";
import Pagination from "@/components/Pagination";
import Wrapper1 from "@/components/Wrapper";
import toast from "react-hot-toast";

export default function ResellerCrud() {
  const [data, setData] = useState<any[]>([]);
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(true);
const [currentPage, setCurrentPage] = useState<number>(1);
const [totalItems, setTotalItems] = useState<number>(0); // Total items from API
const [itemsPerPage] = useState<number>(10);
const { data: session }: any = useSession();

const fetchData = async (pageNo: number) => {
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


    setData(response.data.result.data);
    setTotalItems(response.data.result.pagination.total);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  fetchData(currentPage); 
}, [session, currentPage]);

const totalPages = Math.ceil(totalItems / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentData = data;


  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      const token = session.token;
      await axios.patch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/request/status`,
        { status: "Approved" , id: id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the data state to reflect approval
      setData((prevData) =>
        prevData.map((request) =>
          request._id === id ? { ...request, status: "Approved" } : request
        )
      );
  
      toast.success("User approved successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleReject = async (id: string) => {
    try {
      setLoading(true);
      const token = session.token;
      await axios.patch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/request/status`,
        { status: "Rejected",  id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) =>
        prevData.map((request) =>
          request._id === id ? { ...request, status: "Rejected" } : request
        )
      );
  
      toast.success("User rejected successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  

  const columns = [
    {
      header: "User",
      accessor: "username",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.from?.username || "N/A"}</span>
      ),
    },
    {
      header: "Current Email",
      accessor: "email",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.from?.email || "N/A"}</span>
      ),
    },
    {
      header: "New Email",
      accessor: "email",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.email || "N/A"}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ row }: { row: any }) => (
        <span className={`px-2 py-1 rounded ${getStatusClass(row)}`}>
          {row?.status || "N/A"}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      Cell: ({ row }: { row: any }) => (
        <span>
          {row?.from?.createdAt
            ? moment(row.from.createdAt).format("YYYY-MM-DD")
            : "N/A"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "_id",
      Cell: ({ row }: { row: any }) => (
        <div className="my-4 flex justify-center items-center gap-4">
          {row.status === "Pending" ? (
            <>
              <Button
                onClick={() => handleApprove(row?._id)}
                className="text-[#751A9B] border border-[#751a9b] bg-white h-[48px] font-semibold text-base py-2 px-4 rounded-md hover:bg-purple-700 hover:text-white"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleReject(row?._id)}
                className="bg-blue-500 text-white h-12 font-semibold hover:bg-purple-700 text-base py-2 px-4 rounded-md"
              >
                Reject
              </Button>
            </>
          ) : (
            <>
              {row.status === "Approved" ? (
                <Button className="text-white bg-[#751a9b] h-12 font-semibold text-base py-2 px-4 rounded-md">
                  Approved
                </Button>
              ) : (
                <Button className="text-white bg-red-500 h-12 font-semibold text-base py-2 px-4 rounded-md">
                  Rejected
                </Button>
              )}
            </>
          )}
        </div>
      )      
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"; // Yellow for Pending
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Approved":
        return "bg-green-100 text-green-800"; // Green for Approved
      case "Rejected":
        return "bg-red-100 text-red-800"; // Red for Rejected
      case "Requested Info":
        return "bg-orange-100 text-orange-800"; // Orange for Requested Info
      case "Waiting":
        return "bg-blue-100 text-blue-800"; // Blue for Waiting
      case "Processing":
        return "bg-teal-100 text-teal-800"; // Teal for Processing
      case "Completed":
        return "bg-indigo-100 text-indigo-800"; // Indigo for Completed
      default:
        return "";
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="flex w-full">
        <Wrapper1>
          <div className="flex flex-col items-center w-full">
            <div className="bg-white w-full rounded-lg">
              <div className="flex justify-between items-center max-w-[1000px] border-b mx-auto py-4">
                <h1 className="text-xl font-semibold">Email Change Request</h1>
              </div>
              <TableLayout columns={columns} data={currentData} isHrVisible={false} height={true} />
                <div className="flex justify-center py-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                    }}
                  />
                </div>

            </div>
          </div>
        </Wrapper1>
      </div>
    </>
  );
}
