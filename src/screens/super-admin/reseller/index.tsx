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
import { log } from "util";
import AdminSidebar from "@/components/adminNavbar";

export default function ResellerCrud() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedReseller, setSelectedReseller] = useState<any>(null);
  const [itemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { data: session }: any = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    percentage: 0.0,
    university: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    details: {
      percentage: 0.0,
      university: "",
    },
    email: "",
  });

  const handleCreateReseller = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleEditClose = () => setEditIsModalOpen(false);

  const handleEditOpen = (reseller?: any) => {
    setSelectedReseller(reseller);

    if (reseller) {
      setEditFormData({
        id: reseller._id,
        username: reseller.username,
        details: {
          percentage: reseller.details?.percentage,
          university: reseller.details?.university,
        },
        email: reseller.email,
      });
    } else {
      setFormData({
        username: "",
        percentage: 0.0,
        university: "",
        email: "",
      });
    }
    setEditIsModalOpen(true);
  };

  const handleInputChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };
  const handleInputChangeEditOther = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [name]: value,
      },
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      setLoading(true);
      const token = session.token;

      const apiEndpoint = isBlocked
        ? `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/unblock/${id}`
        : `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/block/${id}`;

      await axios.get(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(currentPage);
      toast.success(`${isBlocked ? "Unblocked" : "Blocked"} successfully!`);
    } catch (error) {
      toast.error(`Failed to ${isBlocked ? "unblock" : "block"} the member!`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReseller = async (id: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const token = session.token;
        await axios.delete(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/reseller/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Deleted!", "Your resume has been deleted.", "success");
        fetchData(currentPage);
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was a problem deleting your resume.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditReseller = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/reseller/${editFormData.id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Reseller updated successfully");
      setEditIsModalOpen(false);
      fetchData(currentPage);
    } catch (error) {
      toast.error("Error editing reseller");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = session.token;
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/reseller`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Reseller added successfully");
      setIsModalOpen(false);
      fetchData(currentPage); // Refetch data after adding a reseller
    } catch (error: any) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: "Reseller",
      accessor: "username",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.reseller?.username || "N/A"}</span>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.reseller?.email || "N/A"}</span>
      ),
    },
    {
      header: "Referral",
      accessor: "referralCount",
      Cell: ({ value }: { value: number }) => (
        <span className="font-semibold">{value}</span>
      ),
    },
    {
      header: "Percentage",
      accessor: "percentage",
      Cell: ({ row }: { row: any }) => (
        <span>
          {row?.reseller?.details?.percentage
            ? `${row?.reseller?.details?.percentage}%`
            : "N/A"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "_id",
      Cell: ({ row }: { row: { reseller: any } }) => (
        <div className="flex gap-2">
          <Button
            onClick={() =>
              handleBlockToggle(row.reseller._id, row.reseller.isBlocked)
            }
            className={`text-white rounded px-5 ${
              row.reseller.isBlocked ? "bg-red-500" : "bg-[#751A9B]"
            }`}
          >
            {row.reseller.isBlocked ? "Unblock" : "Block"}
          </Button>
          <button
            className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
            onClick={() => handleEditOpen(row.reseller)}
          >
            <AiFillEdit />
          </button>
          <button
            className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
            onClick={() => handleDeleteReseller(row.reseller._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    fetchData(currentPage);
  }, [session, currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data;

  const fetchData = async (pageNo: any) => {
    if (!session) return;
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/reseller?pageNo=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.result.data); // Setting data correctly
      setTotalItems(response.data.result.pagination.total);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <AdminSidebar /> {/* Fixed Sidebar */}
      <div className="ml-64 w-full flex">
        <Wrapper1>
          <div className="flex flex-col items-center w-full">
            <div className="bg-white w-full rounded-lg">
              <div className="flex justify-between items-center max-w-[1000px] border-b mx-auto py-4">
                <h1 className="text-xl font-semibold">Reseller</h1>
                <Button
                  onClick={handleCreateReseller}
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-3xl hover:text-white hover:bg-blue-600"
                >
                  Add Reseller
                </Button>
              </div>

              <TableLayout columns={columns} data={data} isHrVisible={false} />

              <div className="flex justify-center py-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </Wrapper1>
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
              Add Reseller
            </p>
            {/* Form for Adding Reseller */}
            <form onSubmit={handleSubmit}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-1">
                  <InputField
                    label="Name"
                    name="username"
                    required={true}
                    value={formData.username}
                    placeholder="Enter your name."
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-1">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    required={true}
                    value={formData.email}
                    placeholder="Enter your email address"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-span-1">
                  <InputField
                    label="Percentage"
                    name="percentage"
                    required={true}
                    type="number"
                    value={formData.percentage}
                    placeholder="Enter your percentage.."
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-span-1">
                  <InputField
                    label="University"
                    name="university"
                    required={false}
                    value={formData.university}
                    placeholder="Enter your University."
                    onChange={handleInputChange}
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
      {isEditModalOpen && (
        <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-newspaper bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={handleEditClose}
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
              Edit Your Reseller
            </p>
            {/* Form for Editing Reseller */}
            <form onSubmit={handleEditReseller}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-1">
                  <InputField
                    label="Name"
                    name="username"
                    required={true}
                    value={editFormData.username}
                    placeholder="Enter your name."
                    onChange={handleInputChangeEdit}
                  />
                </div>
                <div className="col-span-1">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    required={true}
                    value={editFormData.email}
                    placeholder="Enter your email address"
                    disabled={true}
                    onChange={handleInputChangeEdit}
                  />
                </div>

                <div className="col-span-1">
                  <InputField
                    label="Percentage"
                    name="percentage"
                    required={true}
                    value={editFormData.details.percentage}
                    placeholder="Enter your percentage.."
                    onChange={handleInputChangeEditOther}
                  />
                </div>

                <div className="col-span-1">
                  <InputField
                    label="University"
                    name="university"
                    required={false}
                    value={editFormData.details.university}
                    placeholder="Enter your University."
                    onChange={handleInputChangeEditOther}
                  />
                </div>
              </div>
              <div className="flex justify-center col-span-1 mt-5">
                <Button
                  type="submit"
                  className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white flex items-center justify-center border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
//     <>
//       <Loader loading={loading} />
//       <div className="flex w-full">
//         <Wrapper1>
//           <div className="flex flex-col items-center w-full">
//             <div className="bg-white w-full rounded-lg">
//               <div className="flex justify-between items-center max-w-[1000px] border-b mx-auto py-4">
//                 <h1 className="text-xl font-semibold">Reseller</h1>
//                 <Button
//                   onClick={handleCreateReseller}
//                   className="border border-blue-500 text-blue-500 px-4 py-2 rounded-3xl hover:text-white hover:bg-blue-600"
//                 >
//                   Add Reseller
//                 </Button>
//               </div>

//               <TableLayout columns={columns} data={data} isHrVisible={false} />

//               <div className="flex justify-center py-4">
//               <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={(page) => {
//                       setCurrentPage(page);
//                     }}
//                   />
//               </div>
//             </div>
//           </div>
//         </Wrapper1>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="modal-newspaper bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
//             <button
//               onClick={handleClose}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <p className="my-2 text-2xl text-center mb-6 font-bold">
//               Add Reseller
//             </p>

//             <form onSubmit={handleSubmit}>
//               <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <div className="col-span-1">
//                   <InputField
//                     label="Name"
//                     name="username"
//                     required={true}
//                     value={formData.username}
//                     placeholder="Enter your name."
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="col-span-1">
//                   <InputField
//                     label="Email"
//                     type="email"
//                     name="email"
//                     required={true}
//                     value={formData.email}
//                     placeholder="Enter your email address"
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <InputField
//                     label="Percentage"
//                     name="percentage"
//                     required={true}
//                     type="number"
//                     value={formData.percentage}
//                     placeholder="Enter your percentage.."
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <InputField
//                     label="University"
//                     name="university"
//                     required={false}
//                     value={formData.university}
//                     placeholder="Enter your University."
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-center col-span-1 mt-5">
//                 <Button
//                   type="submit"
//                   className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white flex items-center justify-center border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 px-5 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="modal-newspaper bg-white p-6 rounded-lg w-[70%] max-w-[90%] sm:max-w-[80%] md:max-w-[50%] lg:max-w-full xl:max-w-full max-h-[90vh] overflow-auto relative">
//             <button
//               onClick={handleEditClose}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <p className="my-2 text-2xl text-center mb-6 font-bold">
//               Edit Your Reseller
//             </p>

//             <form onSubmit={handleEditReseller}>
//               <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <div className="col-span-1">
//                   <InputField
//                     label="Name"
//                     name="username"
//                     required={true}
//                     value={editFormData.username}
//                     placeholder="Enter your name."
//                     onChange={handleInputChangeEdit}
//                   />
//                 </div>
//                 <div className="col-span-1">
//                   <InputField
//                     label="Email"
//                     type="email"
//                     name="email"
//                     required={true}
//                     value={editFormData.email}
//                     placeholder="Enter your email address"
//                     disabled={true}
//                     onChange={handleInputChangeEdit}
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <InputField
//                     label="Percentage"
//                     name="percentage"
//                     required={true}
//                     value={editFormData.details.percentage}
//                     placeholder="Enter your percentage.."
//                     onChange={handleInputChangeEditOther}
//                   />
//                 </div>

//                 <div className="col-span-1">
//                   <InputField
//                     label="University"
//                     name="university"
//                     required={false}
//                     value={editFormData.details.university}
//                     placeholder="Enter your University."
//                     onChange={handleInputChangeEditOther}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-center col-span-1 mt-5">
//                 <Button
//                   type="submit"
//                   className="h-12 bg-transparent hover:bg-[#6B84FE] hover:text-white flex items-center justify-center border border-[#6B84FE] text-[#6B84FE] px-14 rounded-lg"
//                 >
//                   Update
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
