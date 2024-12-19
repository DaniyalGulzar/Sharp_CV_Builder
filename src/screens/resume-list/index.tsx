"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import TableLayout from "@/components/Tablelayout";
import { useSession } from "next-auth/react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { BiRightArrow } from "react-icons/bi";
import Link from "next/link";
import { ApexOptions } from "apexcharts";

import Modal from "@/components/Modal";
import toast from "react-hot-toast";
import Chart from "@/components/Chart";
interface Resume {
  _id: string;
  title: string;
  percentage: string;
  createdAt: string;
  updatedAt: string;
}
export default function Resumelist() {
  const [data, setData] = useState<Resume[]>([]); // State to store fetched data
  const [data1, setData1] = useState<any>(); // State to store fetched data
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null); // State to manage errors
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { data: session }: any = useSession(); // Access session data
  const router = useRouter(); // Initialize useRouter hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [matchingData, setMatchingData] = useState<{
    percentage: string;
    matchingWords: string[];
  }>({
    percentage: "",
    matchingWords: [],
  });
  const [formData, setFormData] = useState({
    text: "",
    id: null,
    percentage: "",
  });

  const handleClose = () => {
    setIsModalOpen(false); // Assuming you have a state to control modal visibility
  };

  const handleCreateResume = () => {
    router.push("/createNewResume"); // Redirect to the templates page
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (event: any) => {
    setFormData((prevData) => ({ ...prevData, id: event.target.value }));
    setSelectedDegree(event.target.value); // Update the selected degree
  };
  const handleEvaluate = () => {
    setIsModalOpen(true); // Open modal when Evaluate button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
  };

  // Dummy data for pie  Chart
  const pieChartData = {
    series: [67],
    options: {
      chart: {
        type: "radialBar",
        height: 350,
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              formatter: (val: any) => (isNaN(val) ? "0.0%" : `${val}%`),
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ["Chart Ratio"],
    } as ApexOptions,
  };

  const handleDeleteResume = async (resumeId: any) => {
    // Show confirmation message using SweetAlert
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
        const token = session.token; // Access token from user object

        // Call API to delete the resume
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your actual token
            },
          }
        );

        // Show success message
        Swal.fire("Deleted!", "Your resume has been deleted.", "success");
        fetchData();
        setLoading(false);
      } catch (error) {
        // Handle error
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
      const token = session.token; // Access token from user object
      // Call the API to edit the resume
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Perform any additional actions with the response data if needed
      // Example: Redirect to an edit page with the fetched data
      if (response.status === 200) {
        localStorage.setItem(
          "resumeData",
          JSON.stringify(response.data.result)
        );
        router.push("/header");
      }
      fetchData();
    } catch (error) {}
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = session.token;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/match`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData1(response.data.result);
      fetchData();
      const result = response.data.result;
      setMatchingData({
        percentage: result.percentage,
        matchingWords: result.matchingWords,
      });
      toast.success("Request Successful");
      // setIsModalOpen(false);
      setIsSubmitted(true); // Set the form as submitted
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAnotherChance = () => {
    setIsSubmitted(false); // Reset the submission state to show the form again
    setFormData({
      text: "",
      id: null,
      percentage: "",
    });
    setSelectedDegree("");
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
      header: "Action",
      accessor: "_id",
      Cell: ({ value }: { value: string }) => (
        <div className="flex">
          <button
            className="bg-blue-500 text-white rounded-md p-2 hover:underline flex flex-col cursor-pointer"
            onClick={() => handleEditResume(value)}
          >
            <AiFillEdit />
          </button>
          &nbsp;
          <button
            className="bg-red-500 text-white rounded-md p-2 hover:underline flex flex-col cursor-pointer"
            onClick={() => handleDeleteResume(value)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ];
  const names = [
    { name: "John Doe", color: "bg-red-500" },
    { name: "Jane Smith", color: "bg-blue-500" },
    { name: "Michael Johnson", color: "bg-green-500" },
    { name: "Emily Davis", color: "bg-yellow-500" },
    { name: "David Wilson", color: "bg-purple-500" },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = session.token; // Access token from user object
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/resume/recent`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace yourToken with the actual token
          },
        }
      );
      setData(response.data.result);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    fetchData();
  }, [session]);

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Loader loading={loading} />
      <div className="flex flex-col items-center w-full">
        <div className="bg-white w-full rounded-lg">
          <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row max-w-[1000px] border-b mx-4 lg:mx-auto py-4">
            <h1 className="text-xl font-semibold">My Resumes</h1>
            <div className="flex gap-3 items-center flex-col lg:flex-row md:flex-row">
              <Link href="/resume-list">
                <span className="flex gap-2 items-center text-blue-500 cursor-pointer">
                  View All{" "}
                </span>
              </Link>
              <Button
                onClick={handleEvaluate} // Open modal on Evaluate click
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-3xl hover:text-white hover:bg-blue-600"
              >
                Evaluate
              </Button>
              <Button
                onClick={handleCreateResume}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-3xl hover:text-white hover:bg-blue-600"
              >
                Create My Resume
              </Button>
            </div>
          </div>

          {/* <hr className="border-gray-300 my-4" /> */}

          <div className=" ">
            <TableLayout columns={columns} data={data} isHrVisible={false} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-newspaper bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={handleClose}
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
              Evaluate Your Resume
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="my-3 col-span-1">
                  <textarea
                    id="message"
                    rows={4}
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    className="block p-2.5 w-full text-sm text-black bg-white border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                    placeholder="Write your thoughts here..."
                  ></textarea>

                  <div className="flex-1 my-5">
                    <select
                      name="degree"
                      value={selectedDegree}
                      onChange={handleInputChange}
                      required
                      className="w-full my-4 h-[47px] px-4 py-[.8rem] text-sm border border-black-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                    >
                      <option value="">Select Your Resume</option>
                      {data.map((resume, index) => (
                        <option key={index} value={resume._id}>
                          {resume.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white flex items-center justify-center border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                <Chart
                  type="radialBar"
                  series={[data1.percentage]}
                  options={pieChartData.options}
                />
                <div className="flex mt-5">
                  Matched Values:
                  <div className="flex justify-center flex-wrap gap-2 ml-3">
                    {matchingData.matchingWords.map(
                      (word: string, index: number) => (
                        <div
                          key={index}
                          className={`px-3 py-1 bg-blue-500 flex text-white rounded-full text-sm`}
                        >
                          {word}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-5">
                  <Button
                    onClick={handleTryAnotherChance}
                    className="bg-[#6B84FE] hover:bg-[#6B84FE] text-white text-sm py-2 h-[48px] w-full sm:w-[192px] px-4 items-center rounded-xl"
                  >
                    Try Another Chance
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
