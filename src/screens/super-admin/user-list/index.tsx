"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import TableLayout from "@/components/Tablelayout";
import Pagination from "@/components/Pagination";
import Wrapper1 from "@/components/Wrapper";
import toast from "react-hot-toast";
import AdminSidebar from "@/components/adminNavbar";
import moment from "moment";

export default function UserCrud() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const { data: session }: any = useSession();

  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    try {
      setLoading(true);
      const token = session.token;
      const apiEndpoint = isBlocked
        ? `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/unblock/${id}`
        : `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/block/${id}`;

      await axios.get(apiEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(currentPage);
      toast.success(`${isBlocked ? "Unblocked" : "Blocked"} successfully!`);
    } catch (error) {
      toast.error(`Failed to ${isBlocked ? "unblock" : "block"} the user!`);
    } finally {
      setLoading(false);
    }
  };

  // const handlePaidToggle = async (id: string, subscription: string | null) => {
  //   try {
  //     setLoading(true);
  //     const token = session.token;
  //     const apiEndpoint = subscription
  //       ? `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/mark-unpaid/${id}`
  //       : `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/mark-paid/${id}`;

  //     await axios.get(apiEndpoint, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setData((prevData) =>
  //       prevData.map((user) =>
  //         user._id === id
  //           ? { ...user, subscription: subscription ? null : "unpaid" }
  //           : user
  //       )
  //     );

  //     toast.success(
  //       `${subscription ? "Marked as Unpaid" : "Marked as Paid"} successfully!`
  //     );
  //   } catch (error) {
  //     toast.error(
  //       `Failed to ${
  //         subscription ? "mark as unpaid" : "mark as paid"
  //       } the user!`
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePaidToggle = async (id: string, subscription: string | null) => {
    try {
      setLoading(true);
      const token = session.token;
      const apiEndpoint = subscription
        ? `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/mark-unpaid/${id}`
        : `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/mark-paid/${id}`;

      await axios.get(apiEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData((prevData) =>
        prevData.map((user) =>
          user._id === id
            ? {
                ...user,
                subscription: subscription
                  ? null
                  : "Manual Subscribed By Admin",
              }
            : user
        )
      );
      fetchData(currentPage);
      toast.success(
        `User ${
          subscription ? "marked as Unpaid" : "marked as Paid"
        } successfully!`
      );
    } catch (error) {
      toast.error(
        `Failed to ${
          subscription ? "mark as unpaid" : "mark as paid"
        } the user!`
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteUser = async (id: any) => {
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
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Deleted!", "User has been deleted.", "success");
        fetchData(currentPage);
      } catch (error) {
        Swal.fire("Error!", "There was a problem deleting the user.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    {
      header: "User",
      accessor: "username",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.user?.username || "N/A"}</span>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      Cell: ({ row }: { row: any }) => <span>{row?.user?.email || "N/A"}</span>,
    },
    {
      header: "Date",
      accessor: "createdAt",
      Cell: ({ row }: { row: any }) => (
        <span>
          {row?.user?.createdAt
            ? moment(row.user.createdAt).format("MM/DD/YYYY")
            : "N/A"}
        </span>
      ),
    },
    {
      header: "Resume Count",
      accessor: "resumeCount",
      Cell: ({ value }: { value: number }) => <span>{value}</span>,
    },
    {
      header: "Email Count",
      accessor: "emailCount",
      Cell: ({ value }: { value: number }) => <span>{value}</span>,
    },
    {
      header: "Action",
      accessor: "_id",
      Cell: ({ row }: { row: any }) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleBlockToggle(row.user._id, row.user.isBlocked)}
            className={`text-white rounded px-5 ${
              row.user.isBlocked ? "bg-red-500" : "bg-[#751A9B]"
            }`}
          >
            {row?.user.isBlocked ? "Unblock" : "Block"}
          </Button>
          <Button
            onClick={() =>
              handlePaidToggle(row.user._id, row.user.subscription)
            }
            className={`text-white rounded px-5 ${
              row.user.subscription ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            {row.user.subscription ? "Paid" : "Unpaid"}
          </Button>
          <button
            className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
            onClick={() => handleDeleteUser(row.user._id)}
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

  const fetchData = async (pageNo: any) => {
    if (!session) return;
    setLoading(true);
    try {
      const token = session.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/list?pageNo=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.result.data);
      setTotalItems(response.data.result.pagination.total);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <AdminSidebar />

      <div className="ml-64 w-full">
        <Wrapper1>
          <div className="flex flex-col items-center w-full">
            <div className="bg-white w-full rounded-lg">
              <div className="flex justify-between items-center max-w-[1000px] border-b mx-auto py-4">
                <h1 className="text-xl font-semibold">User List</h1>
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
    </>
  );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { AiFillDelete, AiFillEdit } from "react-icons/ai";
// import { useSession } from "next-auth/react";
// import Loader from "@/components/Loader";
// import Button from "@/components/Button";
// import TableLayout from "@/components/Tablelayout";
// import Pagination from "@/components/Pagination";
// import Wrapper1 from "@/components/Wrapper";
// import toast from "react-hot-toast";
// import AdminSidebar from "@/components/adminNavbar"

// export default function UserCrud() {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [itemsPerPage] = useState<number>(10);
//   const [totalItems, setTotalItems] = useState<number>(0);
//   const { data: session }: any = useSession();

//   const handleBlockToggle = async (id: string, isBlocked: boolean) => {
//     try {
//       setLoading(true);
//       const token = session.token;
//       const apiEndpoint = isBlocked
//         ? `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/unblock/${id}`
//         : `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/block/${id}`;

//       await axios.get(apiEndpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchData(currentPage);
//       toast.success(`${isBlocked ? "Unblocked" : "Blocked"} successfully!`);
//     } catch (error) {
//       toast.error(`Failed to ${isBlocked ? "unblock" : "block"} the user!`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (id: any) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         setLoading(true);
//         const token = session.token;
//         await axios.delete(`${process.env.NEXT_PUBLIC_NEXT_URL}api/user/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         Swal.fire("Deleted!", "User has been deleted.", "success");
//         fetchData(currentPage);
//       } catch (error) {
//         Swal.fire("Error!", "There was a problem deleting the user.", "error");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleEditUser = async (e: any) => {

//   };

//   const columns = [
//     {
//       header: "User",
//       accessor: "username",
//       Cell: ({ value }: { value: string }) => (
//         <span>{value}</span>
// ),
//     },
//     {
//       header: "Email",
//       accessor: "email",
//       Cell: ({ value }: { value: string }) => (
//                 <span>{value}</span>
//       ),
//     },
//     {
//         header: "Date",
//         accessor: "createdAt",
//         Cell: ({ value }: { value: string }) => (
//             <span>{new Date(value).toLocaleDateString()}</span>
//           ),
//       },
//     {
//       header: "Action",
//       accessor: "_id",
//       Cell: ({ row }: { row: { user: any } }) => (
//         <div className="flex gap-2">
//           <Button
//             onClick={() =>
//               handleBlockToggle(row.user._id, row.user.isBlocked)
//             }
//             className={`text-white rounded px-5 ${
//               row?.user?.isBlocked ? "bg-red-500" : "bg-[#751A9B]"
//             }`}
//           >
//             {row?.user?.isBlocked ? "Unblock" : "Block"}
//           </Button>
//           <button
//             className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
//             onClick={() => handleEditUser(row.user)}
//           >
//             <AiFillEdit />
//           </button>
//           <button
//             className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
//             onClick={() => handleDeleteUser(row.user._id)}
//           >
//             <AiFillDelete />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [session, currentPage]);

//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const fetchData = async (pageNo: any) => {
//     if (!session) return;
//     setLoading(true);
//     try {
//       const token = session.token;
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_NEXT_URL}api/user/list?pageNo=${pageNo}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setData(response.data.result.data);
//       setTotalItems(response.data.result.pagination.total);
//     } catch (error: any) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Loader loading={loading} />
//       <AdminSidebar /> {/* Fixed sidebar */}

//       <div className="ml-64 w-full">
//         <Wrapper1>
//           <div className="flex flex-col items-center w-full">
//             <div className="bg-white w-full rounded-lg">
//               <div className="flex justify-between items-center max-w-[1000px] border-b mx-auto py-4">
//                 <h1 className="text-xl font-semibold">User List</h1>
//               </div>
//               <TableLayout columns={columns} data={data} isHrVisible={false} />
//               <div className="flex justify-center py-4">
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={(page) => setCurrentPage(page)}
//                 />
//               </div>
//             </div>
//           </div>
//         </Wrapper1>
//       </div>
//     </>
//   );
// }

//     <>
//       <Loader loading={loading} />
//       <div className="flex w-full">
//         <Wrapper1>
//           <div className="flex flex-col items-center w-full">
//             <div className="bg-white w-full rounded-lg">
//               <div className="flex justify-between items-center max-w-[1000px] border-b mx-auto py-4">
//                 <h1 className="text-xl font-semibold">User List</h1>
//               </div>

//               <TableLayout columns={columns} data={data} isHrVisible={false} />

//               <div className="flex justify-center py-4">
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={(page) => setCurrentPage(page)}
//                 />
//               </div>
//             </div>
//           </div>
//         </Wrapper1>
//       </div>
//     </>
//   );
// }
