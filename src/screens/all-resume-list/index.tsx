"use client";

import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineDownload,
} from "react-icons/ai";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import TableLayout from "@/components/Tablelayout";
import Wrapper1 from "@/components/Wrapper";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination"; // Import the Pagination component
import Image from "next/image";
import ResumeScoreModal from "@/components/scoreModal";

export default function AllResumeList() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const { data: session }: any = useSession();
  const router = useRouter();

  const handleCreateResume = () => {
    router.push("/createNewResume");
  };

  const handleDeleteResume = async (resumeId: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const token = session.token;
        await axios.delete(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire("Deleted!", "Your resume has been deleted.", "success");
        setLoading(false);
        fetchData();
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was a problem deleting your resume.",
          "error"
        );
        setLoading(false);
      }
    }
  };

  const handleEditResume = async (id: string) => {
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem(
          "resumeData",
          JSON.stringify(response.data.result)
        );
        router.push("/header");
      }
    } catch (error) {}
  };
  const getParsedScore = (score: any) => {
    if (score === "") {
      return 0;
    } else {
      const cleanedResponse = score
        .replace(/```json/g, "") // Remove opening ```json
        .replace(/```/g, "") // Remove closing ```
        .replace(/###/g, "") // Remove ###
        .replace(/\*/g, "") // Remove asterisks
        .trim();
      const parsedResponse = JSON.parse(cleanedResponse);

      return parsedResponse.score;
    }
  };

  const columns = [
    {
      header: "My Resumes",
      accessor: "title",
      Cell: ({ value }: { value: string }) => (
        <span className="font-semibold">{value}</span>
      ),
    },
    {
      header: "Modification",
      accessor: "updatedAt",
      Cell: ({ value }: { value: string }) => (
        <span className="font-semibold">
          {moment(value).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      header: "Creation",
      accessor: "createdAt",
      Cell: ({ value }: { value: string }) => (
        <span className="font-semibold">
          {moment(value).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      header: "Resume Strength",
      accessor: "score",
      Cell: ({ value }: { value: any }) => {
        const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

        return (
          <>
            <div
              className="flex justify-center items-center w-[80px] h-[28px] rounded-full bg-[#6B84FE] text-sm font-bold text-white cursor-pointer"
              onClick={() => setIsScoreModalOpen(true)}
            >
              {getParsedScore(value)}
            </div>

            <ResumeScoreModal
              isOpen={isScoreModalOpen}
              onClose={() => setIsScoreModalOpen(false)}
              score={value}
            />
          </>
        );
      },
    },
    {
      header: "Action",
      accessor: "_id",
      Cell: ({ value }: { value: string }) => (
        <div className="flex gap-2">
          <button
            className="flex flex-col cursor-pointer"
            onClick={() => handleEditResume(value)}
          >
            <Image
              src="/images/svgs/edit-res.svg"
              alt="Edit"
              height={20}
              width={20}
            />
          </button>
          <button
            className="flex flex-col cursor-pointer"
            onClick={() => handleDeleteResume(value)}
          >
            <Image
              src="/images/svgs/fluent_delete-24-regular.svg"
              alt="Delete"
              height={20}
              width={20}
            />
          </button>
          <button className="" onClick={() => handleDeleteResume(value)}>
            <Image
              src="/images/svgs/download-res.svg"
              alt="..."
              height={20}
              width={20}
            />
          </button>
          {/* <button
            className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600"
            onClick={() => handlePreviewResume(value)}
          >
            <AiFillEye />
          </button>
          <button
            className="bg-purple-500 text-white rounded-md p-2 hover:bg-purple-600"
            onClick={() => handleDownloadResume(value)}
          >
            <AiOutlineDownload />
          </button> */}
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const fetchData = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  return (
    <>
      <Loader loading={loading} />
      <div className="flex w-full">
        <Wrapper1>
          <div className="md:mx-[30px] mx-4">
            <div className="flex flex-col items-center w-full">
              <div className="bg-white w-full rounded-lg">
                <div className="flex justify-between items-center  border-b py-4">
                  <h1 className="text-xl font-semibold">My Resumes</h1>
                  <Button
                    onClick={handleCreateResume}
                    className="border border-blue-500 text-blue-500 px-4 py-2 rounded-3xl hover:text-white hover:bg-blue-600"
                  >
                    Create My Resume
                  </Button>
                </div>

                <div>
                  <TableLayout
                    columns={columns}
                    data={currentData}
                    isHrVisible={false}
                  />
                </div>
                <div className="flex justify-center py-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Wrapper1>
      </div>
    </>
  );
}
