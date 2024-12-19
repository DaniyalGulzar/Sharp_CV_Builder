// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import DatePicker from "react-datepicker";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";

// interface StackData {
//   _id: {
//     id: number;
//     title: string;
//     rating: number;
//   };
//   count: number;
// }

// interface StackResponse {
//   result: StackData[];
//   message: string;
// }

// interface StackChartFilters {
//   timePeriod: "weekly" | "monthly";
//   dateRange: {
//     startDate: Date | null;
//     endDate: Date | null;
//   };
// }

// const StackChart: React.FC = () => {
//   const [stackData, setStackData] = React.useState<StackData[]>([]);
//   const [filters, setFilters] = React.useState<any>({
//     timePeriod: "weekly",
//     dateRange: {
//       startDate: null,
//       endDate: null,
//     },
//   });

//   const { data: session }: any = useSession();

//   const fetchStackData = async () => {
//     try {
//       if (!session) return;
//       const token = session?.token;

//       let queryParams = new URLSearchParams();
//       queryParams.append("period", filters.timePeriod);

//       if (
//         filters.timePeriod === "monthly" &&
//         filters.dateRange.startDate &&
//         filters.dateRange.endDate
//       ) {
//         queryParams.append(
//           "startDate",
//           filters.dateRange.startDate.toISOString().split("T")[0]
//         );
//         queryParams.append(
//           "endDate",
//           filters.dateRange.endDate.toISOString().split("T")[0]
//         );
//       }

//       const response = await axios.get<StackResponse>(
//         `${
//           process.env.NEXT_PUBLIC_NEXT_URL
//         }api/dashboard/stacks-chart?${queryParams.toString()}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response?.data?.result) {
//         // Get top 5 stacks
//         const topStacks = response.data.result.slice(0, 5);
//         setStackData(topStacks);
//       } else {
//         toast.error("Failed to load stack analytics.");
//       }
//     } catch (error) {
//       toast.error("Error fetching stack analytics.");
//     }
//   };

//   React.useEffect(() => {
//     if (session) {
//       fetchStackData();
//     }
//   }, [session, filters]);

//   const handleFilterChange = (
//     timePeriod: "weekly" | "monthly",
//     startDate?: Date | null,
//     endDate?: Date | null
//   ) => {
//     setFilters({
//       timePeriod,
//       dateRange: {
//         startDate: startDate || null,
//         endDate: endDate || null,
//       },
//     });
//   };

//   // Transform data for horizontal bar chart
//   const chartData = stackData.map((item) => ({
//     name: item._id.title,
//     count: item.count,
//   }));

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
//           <p className="font-medium">{payload[0].payload.name}</p>
//           <p className="text-gray-600">Count: {payload[0].value}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-xl font-semibold mb-6">Mostly Used Stacks</h2>

//       {/* Filter Controls */}
//       <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
//         <select
//           value={filters.timePeriod}
//           onChange={(e) =>
//             handleFilterChange(e.target.value as "weekly" | "monthly")
//           }
//           className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
//         >
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>

//         {filters.timePeriod === "monthly" && (
//           <div className="flex gap-2">
//             <DatePicker
//               selected={filters.dateRange.startDate}
//               onChange={(date: Date | null) =>
//                 handleFilterChange(
//                   filters.timePeriod,
//                   date,
//                   filters.dateRange.endDate
//                 )
//               }
//               selectsStart
//               startDate={filters.dateRange.startDate}
//               endDate={filters.dateRange.endDate}
//               placeholderText="Start Date"
//               className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
//             />
//             <DatePicker
//               selected={filters.dateRange.endDate}
//               onChange={(date: Date | null) =>
//                 handleFilterChange(
//                   filters.timePeriod,
//                   filters.dateRange.startDate,
//                   date
//                 )
//               }
//               selectsEnd
//               startDate={filters.dateRange.startDate}
//               endDate={filters.dateRange.endDate}
//               minDate={filters.dateRange.startDate}
//               placeholderText="End Date"
//               className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
//             />
//           </div>
//         )}
//       </div>

//       {/* Chart */}
//       <div className="h-[400px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={chartData}
//             layout="vertical"
//             margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" horizontal={false} />
//             <XAxis type="number" />
//             <YAxis
//               type="category"
//               dataKey="name"
//               width={100}
//               tick={{ fill: "#666", fontSize: 12 }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar
//               dataKey="count"
//               fill="#6366F1"
//               radius={[0, 4, 4, 0]}
//               barSize={30}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default StackChart;

// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import DatePicker from "react-datepicker";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";

// interface StackData {
//   _id: {
//     id: number;
//     title: string;
//     rating: number;
//   };
//   count: number;
// }

// interface StackResponse {
//   result: StackData[];
//   message: string;
// }

// interface StackChartFilters {
//   timePeriod: "weekly" | "monthly";
//   dateRange: {
//     startDate: Date | null;
//     endDate: Date | null;
//   };
// }

// const StackChart: React.FC = () => {
//   const [stackData, setStackData] = React.useState<StackData[]>([]);
//   const [filters, setFilters] = React.useState<any>({
//     timePeriod: "weekly",
//     dateRange: {
//       startDate: null,
//       endDate: null,
//     },
//   });

//   const { data: session }: any = useSession();

//   const validateDateRange = () => {
//     if (filters.timePeriod === "monthly") {
//       if (!filters.dateRange.startDate && !filters.dateRange.endDate) {
//         return true; // No dates selected yet, don't show error
//       }
//       if (!filters.dateRange.startDate || !filters.dateRange.endDate) {
//         toast.error("Please enter both start and end dates");
//         return false;
//       }
//     }
//     return true;
//   };

//   const fetchStackData = async () => {
//     try {
//       if (!session) return;

//       // Validate dates for monthly period
//       if (!validateDateRange()) {
//         return;
//       }

//       const token = session?.token;
//       let queryParams = new URLSearchParams();
//       queryParams.append("period", filters.timePeriod);

//       if (
//         filters.timePeriod === "monthly" &&
//         filters.dateRange.startDate &&
//         filters.dateRange.endDate
//       ) {
//         queryParams.append(
//           "startDate",
//           filters.dateRange.startDate.toISOString().split("T")[0]
//         );
//         queryParams.append(
//           "endDate",
//           filters.dateRange.endDate.toISOString().split("T")[0]
//         );
//       }

//       const response = await axios.get<StackResponse>(
//         `${
//           process.env.NEXT_PUBLIC_NEXT_URL
//         }api/dashboard/stacks-chart?${queryParams.toString()}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response?.data?.result) {
//         // Get top 5 stacks
//         const topStacks = response.data.result.slice(0, 5);
//         setStackData(topStacks);
//       } else {
//         toast.error("Failed to load stack analytics.");
//       }
//     } catch (error) {
//       toast.error("Error fetching stack analytics.");
//     }
//   };

//   React.useEffect(() => {
//     if (session) {
//       // For weekly period, fetch immediately
//       if (filters.timePeriod === "weekly") {
//         fetchStackData();
//       }
//       // For monthly period, only fetch if both dates are selected
//       else if (
//         filters.timePeriod === "monthly" &&
//         filters.dateRange.startDate &&
//         filters.dateRange.endDate
//       ) {
//         fetchStackData();
//       }
//     }
//   }, [session, filters]);

//   const handleFilterChange = (
//     timePeriod: "weekly" | "monthly",
//     startDate?: Date | null,
//     endDate?: Date | null
//   ) => {
//     // Reset dates when switching to weekly
//     if (timePeriod === "weekly") {
//       setFilters({
//         timePeriod,
//         dateRange: {
//           startDate: null,
//           endDate: null,
//         },
//       });
//     } else {
//       setFilters({
//         timePeriod,
//         dateRange: {
//           startDate: startDate || filters.dateRange.startDate,
//           endDate: endDate || filters.dateRange.endDate,
//         },
//       });
//     }
//   };

//   // Transform data for horizontal bar chart
//   const chartData = stackData.map((item) => ({
//     name: item._id.title,
//     count: item.count,
//   }));

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
//           <p className="font-medium">{payload[0].payload.name}</p>
//           <p className="text-gray-600">Count: {payload[0].value}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <h2 className="text-xl font-semibold mb-6">Mostly Used Stacks</h2>

//       {/* Filter Controls */}
//       <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
//         <select
//           value={filters.timePeriod}
//           onChange={(e) =>
//             handleFilterChange(e.target.value as "weekly" | "monthly")
//           }
//           className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
//         >
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>

//         {filters.timePeriod === "monthly" && (
//           <div className="flex gap-2">
//             <DatePicker
//               selected={filters.dateRange.startDate}
//               onChange={(date: Date | null) =>
//                 handleFilterChange(
//                   filters.timePeriod,
//                   date,
//                   filters.dateRange.endDate
//                 )
//               }
//               selectsStart
//               startDate={filters.dateRange.startDate}
//               endDate={filters.dateRange.endDate}
//               placeholderText="Start Date"
//               className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
//             />
//             <DatePicker
//               selected={filters.dateRange.endDate}
//               onChange={(date: Date | null) =>
//                 handleFilterChange(
//                   filters.timePeriod,
//                   filters.dateRange.startDate,
//                   date
//                 )
//               }
//               selectsEnd
//               startDate={filters.dateRange.startDate}
//               endDate={filters.dateRange.endDate}
//               minDate={filters.dateRange.startDate}
//               placeholderText="End Date"
//               className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
//             />
//           </div>
//         )}
//       </div>

//       {/* Chart */}
//       <div className="h-[400px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={chartData}
//             layout="vertical"
//             margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" horizontal={false} />
//             <XAxis type="number" />
//             <YAxis
//               type="category"
//               dataKey="name"
//               width={100}
//               tick={{ fill: "#666", fontSize: 12 }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar
//               dataKey="count"
//               fill="#6366F1"
//               radius={[0, 4, 4, 0]}
//               barSize={30}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default StackChart;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface StackData {
  _id: {
    id: number;
    title: string;
    rating: number;
  };
  count: number;
}

interface StackResponse {
  result: StackData[];
  message: string;
}

interface StackChartFilters {
  timePeriod: "weekly" | "monthly";
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const StackChart: React.FC = () => {
  const [stackData, setStackData] = React.useState<StackData[]>([]);
  const [filters, setFilters] = React.useState<any>({
    timePeriod: "weekly",
    dateRange: {
      startDate: null,
      endDate: null,
    },
  });

  const { data: session }: any = useSession();

  const validateDateRange = () => {
    if (filters.timePeriod === "monthly") {
      if (!filters.dateRange.startDate && !filters.dateRange.endDate) {
        return true; // No dates selected yet, don't show error
      }
      if (!filters.dateRange.startDate || !filters.dateRange.endDate) {
        toast.error("Please enter both start and end dates");
        return false;
      }
    }
    return true;
  };

  const fetchStackData = async () => {
    try {
      if (!session) return;

      // Validate dates for monthly period
      if (!validateDateRange()) {
        return;
      }

      const token = session?.token;
      let queryParams = new URLSearchParams();
      queryParams.append("period", filters.timePeriod);

      if (
        filters.timePeriod === "monthly" &&
        filters.dateRange.startDate &&
        filters.dateRange.endDate
      ) {
        queryParams.append(
          "startDate",
          filters.dateRange.startDate.toISOString().split("T")[0]
        );
        queryParams.append(
          "endDate",
          filters.dateRange.endDate.toISOString().split("T")[0]
        );
      }

      const response = await axios.get<StackResponse>(
        `${
          process.env.NEXT_PUBLIC_NEXT_URL
        }api/dashboard/stacks-chart?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.result) {
        // Get top 5 stacks
        const topStacks = response.data.result.slice(0, 5);
        setStackData(topStacks);
      } else {
        toast.error("Failed to load stack analytics.");
      }
    } catch (error) {
      toast.error("Error fetching stack analytics.");
    }
  };

  React.useEffect(() => {
    if (session) {
      // For weekly period, fetch immediately
      if (filters.timePeriod === "weekly") {
        fetchStackData();
      }
      // For monthly period, only fetch if both dates are selected
      else if (
        filters.timePeriod === "monthly" &&
        filters.dateRange.startDate &&
        filters.dateRange.endDate
      ) {
        fetchStackData();
      }
    }
  }, [session, filters]);

  const handleFilterChange = (
    timePeriod: "weekly" | "monthly",
    startDate?: Date | null,
    endDate?: Date | null
  ) => {
    // Reset dates when switching to weekly
    if (timePeriod === "weekly") {
      setFilters({
        timePeriod,
        dateRange: {
          startDate: null,
          endDate: null,
        },
      });
    } else {
      setFilters({
        timePeriod,
        dateRange: {
          startDate: startDate || filters.dateRange.startDate,
          endDate: endDate || filters.dateRange.endDate,
        },
      });
    }
  };

  // Transform data for horizontal bar chart
  const chartData = stackData.map((item) => ({
    name: item._id.title,
    count: item.count,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-gray-600">Count: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Most Used Stacks</h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <select
          value={filters.timePeriod}
          onChange={(e) =>
            handleFilterChange(e.target.value as "weekly" | "monthly")
          }
          className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        {filters.timePeriod === "monthly" && (
          <div className="flex gap-2">
            <DatePicker
              selected={filters.dateRange.startDate}
              onChange={(date: Date | null) =>
                handleFilterChange(
                  filters.timePeriod,
                  date,
                  filters.dateRange.endDate
                )
              }
              selectsStart
              startDate={filters.dateRange.startDate}
              endDate={filters.dateRange.endDate}
              placeholderText="Start Date"
              className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
            />
            <DatePicker
              selected={filters.dateRange.endDate}
              onChange={(date: Date | null) =>
                handleFilterChange(
                  filters.timePeriod,
                  filters.dateRange.startDate,
                  date
                )
              }
              selectsEnd
              startDate={filters.dateRange.startDate}
              endDate={filters.dateRange.endDate}
              minDate={filters.dateRange.startDate}
              placeholderText="End Date"
              className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="#6366F1"
              radius={[0, 4, 4, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackChart;
