"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSession } from "next-auth/react";
import Wrapper1 from "@/components/Wrapper";
import AdminSidebar from "@/components/adminNavbar";
import SubscriptionStatusPieChart from "@/components/Pie-Chart-Subscribe";
import Loader from "@/components/Loader";
import StackChart from "@/components/admin-stack-chart";
import toast from "react-hot-toast";

interface CardProps {
  title: string;
  count: string | number;
  color: string;
}

interface Stats {
  users: number;
  resellers: number;
  cvs: number;
  revenue: number | null;
}

interface ResumeAnalytics {
  date: string;
  count: number;
}

interface AnalyticsFilter {
  timePeriod: "weekly" | "monthly";
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

interface ChartProps {
  data: ResumeAnalytics[];
  color: string;
}

interface ActiveUserStats {
  activeUsersCount: number;
  inactiveUsersCount: number;
}

interface ActiveResellerStats {
  activeResellersCount: number;
  inactiveResellersCount: number;
}

interface ActivityFilter {
  timePeriod: "weekly" | "monthly";
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const CustomBarChart: React.FC<ChartProps> = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(new Date(date), "MMM dd")}
          fontSize={12}
          tick={{ fill: "#666" }}
        />
        <YAxis fontSize={12} tick={{ fill: "#666" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [`${value} items`, "Count"]}
          labelFormatter={(date) => format(new Date(date), "MMMM dd, yyyy")}
        />
        <Legend />
        <defs>
          <linearGradient
            id={`colorGradient${color}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Bar
          dataKey="count"
          fill={`url(#colorGradient${color})`}
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function AdminDashboard() {
  const [resumeData, setResumeData] = useState<ResumeAnalytics[]>([]);
  const [signupData, setSignupData] = useState<ResumeAnalytics[]>([]);
  const [activityFilters, setActivityFilters] = useState<any>({
    timePeriod: "weekly",
    dateRange: {
      startDate: null,
      endDate: null,
    },
  });
  const [activeUserStats, setActiveUserStats] = useState<ActiveUserStats>({
    activeUsersCount: 0,
    inactiveUsersCount: 0,
  });
  const [activeResellerStats, setActiveResellerStats] =
    useState<ActiveResellerStats>({
      activeResellersCount: 0,
      inactiveResellersCount: 0,
    });
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"User" | "Reseller">("User");
  const [filters, setFilters] = useState<any>({
    timePeriod: "weekly",
    dateRange: {
      startDate: null,
      endDate: null,
    },
  });
  const [resumeFilters, setResumeFilters] = useState<any>({
    timePeriod: "weekly",
    dateRange: {
      startDate: null,
      endDate: null,
    },
  });
  const [stats, setStats] = useState<Stats>({
    users: 0,
    resellers: 0,
    cvs: 0,
    revenue: null,
  });

  const { data: session }: any = useSession();

  const fetchActiveUserStats = async () => {
    try {
      if (!session) return;
      const token = session?.token;

      let queryParams = new URLSearchParams();
      queryParams.append("period", activityFilters.timePeriod);

      if (
        activityFilters.timePeriod === "monthly" &&
        activityFilters.dateRange.startDate &&
        activityFilters.dateRange.endDate
      ) {
        queryParams.append(
          "startDate",
          activityFilters.dateRange.startDate.toISOString().split("T")[0]
        );
        queryParams.append(
          "endDate",
          activityFilters.dateRange.endDate.toISOString().split("T")[0]
        );
      }

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_NEXT_URL
        }api/dashboard/active-user-count?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.success) {
        setActiveUserStats(response.data.data);
      } else {
        toast.error("Failed to load active user stats.");
      }
    } catch (error) {
      toast.error("Error fetching active user stats.");
    }
  };

  const fetchActiveResellerStats = async () => {
    try {
      if (!session) return;
      const token = session?.token;

      let queryParams = new URLSearchParams();
      queryParams.append("period", activityFilters.timePeriod);

      if (
        activityFilters.timePeriod === "monthly" &&
        activityFilters.dateRange.startDate &&
        activityFilters.dateRange.endDate
      ) {
        queryParams.append(
          "startDate",
          activityFilters.dateRange.startDate.toISOString().split("T")[0]
        );
        queryParams.append(
          "endDate",
          activityFilters.dateRange.endDate.toISOString().split("T")[0]
        );
      }

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_NEXT_URL
        }api/dashboard/active-resellers-count?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.success) {
        setActiveResellerStats(response.data.data);
      } else {
        toast.error("Failed to load active reseller stats.");
      }
    } catch (error) {
      toast.error("Error fetching active reseller stats.");
    }
  };

  const fetchResumeAnalytics = async () => {
    setLoading(true);
    try {
      if (!session) return;
      const token = session?.token;

      let queryParams = new URLSearchParams();
      queryParams.append("period", resumeFilters.timePeriod);

      if (
        resumeFilters.timePeriod === "monthly" &&
        resumeFilters.dateRange.startDate &&
        resumeFilters.dateRange.endDate
      ) {
        queryParams.append(
          "startDate",
          `${resumeFilters.dateRange.startDate.getFullYear()}-${String(
            resumeFilters.dateRange.startDate.getMonth() + 1
          ).padStart(2, "0")}-${String(
            resumeFilters.dateRange.startDate.getDate()
          ).padStart(2, "0")}`
        );
        queryParams.append(
          "endDate",
          `${resumeFilters.dateRange.endDate.getFullYear()}-${String(
            resumeFilters.dateRange.endDate.getMonth() + 1
          ).padStart(2, "0")}-${String(
            resumeFilters.dateRange.endDate.getDate()
          ).padStart(2, "0")}`
        );
      }

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_NEXT_URL
        }api/dashboard/resume-analytics?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.data) {
        setResumeData(response.data.data);
      } else {
        toast.error("Failed to load resume analytics.");
      }
    } catch (error) {
      toast.error("Error fetching resume analytics.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSignupAnalytics = async () => {
    setLoading(true);
    try {
      if (!session) return;
      const token = session?.token;

      let queryParams = new URLSearchParams();
      queryParams.append("period", filters.timePeriod);
      queryParams.append("role", role);

      if (
        filters.timePeriod === "monthly" &&
        filters.dateRange.startDate &&
        filters.dateRange.endDate
      ) {
        queryParams.append(
          "startDate",
          `${filters.dateRange.startDate.getFullYear()}-${String(
            filters.dateRange.startDate.getMonth() + 1
          ).padStart(2, "0")}-${String(
            filters.dateRange.startDate.getDate()
          ).padStart(2, "0")}`
        );
        queryParams.append(
          "endDate",
          `${filters.dateRange.endDate.getFullYear()}-${String(
            filters.dateRange.endDate.getMonth() + 1
          ).padStart(2, "0")}-${String(
            filters.dateRange.endDate.getDate()
          ).padStart(2, "0")}`
        );
      }

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_NEXT_URL
        }api/dashboard/chart?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.result) {
        setSignupData(response.data.result);
      } else {
        toast.error("Failed to load signup analytics.");
      }
    } catch (error) {
      toast.error("Error fetching signup analytics.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsData = async () => {
    try {
      if (!session) return;
      const token = session?.token;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}api/dashboard/counters`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { users, resellers, resumes } = response.data.result;
      setStats({
        users: users,
        resellers: resellers,
        cvs: resumes,
        revenue: 0,
      });
    } catch (error) {
      toast.error("Error fetching stats data.");
    }
  };

  useEffect(() => {
    if (session) {
      fetchStatsData();
      fetchSignupAnalytics();
    }
  }, [session, role, filters]);
  useEffect(() => {
    if (session) {
      fetchResumeAnalytics();
    }
  }, [session, resumeFilters]);
  useEffect(() => {
    if (session) {
      fetchActiveUserStats();
      fetchActiveResellerStats();
    }
  }, [session, activityFilters]);

  // const handleActivityFilterChange = (
  //   timePeriod: "weekly" | "monthly",
  //   startDate?: Date | null,
  //   endDate?: Date | null
  // ) => {
  //   setActivityFilters({
  //     timePeriod,
  //     dateRange: {
  //       startDate: startDate || null,
  //       endDate: endDate || null,
  //     },
  //   });
  // };
  // const handleResumeFilterChange = (
  //   timePeriod: "weekly" | "monthly",
  //   startDate?: Date | null,
  //   endDate?: Date | null
  // ) => {
  //   setResumeFilters({
  //     timePeriod,
  //     dateRange: {
  //       startDate: startDate || null,
  //       endDate: endDate || null,
  //     },
  //   });
  // };

  // const handleFilterChange = (
  //   timePeriod: "weekly" | "monthly",
  //   startDate?: Date | null,
  //   endDate?: Date | null
  // ) => {
  //   setFilters({
  //     timePeriod,
  //     dateRange: {
  //       startDate: startDate || null,
  //       endDate: endDate || null,
  //     },
  //   });
  // };

  const handleFilterChange = (
    timePeriod: "weekly" | "monthly",
    startDate?: Date | null,
    endDate?: Date | null
  ) => {
    if (!startDate || !endDate) {
      setFilters({
        timePeriod,
        dateRange: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      });
      return;
    }

    if (startDate > endDate) {
      toast.error("Start date cannot be later than end date");
      return;
    }

    setFilters({
      timePeriod,
      dateRange: {
        startDate,
        endDate,
      },
    });
  };

  const handleResumeFilterChange = (
    timePeriod: "weekly" | "monthly",
    startDate?: Date | null,
    endDate?: Date | null
  ) => {
    if (!startDate || !endDate) {
      setResumeFilters({
        timePeriod,
        dateRange: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      });
      return;
    }

    if (startDate > endDate) {
      toast.error("Start date cannot be later than end date");
      return;
    }

    setResumeFilters({
      timePeriod,
      dateRange: {
        startDate,
        endDate,
      },
    });
  };

  const handleActivityFilterChange = (
    timePeriod: "weekly" | "monthly",
    startDate?: Date | null,
    endDate?: Date | null
  ) => {
    if (!startDate || !endDate) {
      setActivityFilters({
        timePeriod,
        dateRange: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      });
      return;
    }

    if (startDate > endDate) {
      toast.error("Start date cannot be later than end date");
      return;
    }

    setActivityFilters({
      timePeriod,
      dateRange: {
        startDate,
        endDate,
      },
    });
  };

  function ActivityCard({
    title,
    activeCount,
    inactiveCount,
    color,
  }: {
    title: string;
    activeCount: number;
    inactiveCount: number;
    color: string;
  }) {
    const totalCount = activeCount + inactiveCount;
    const activePercentage =
      totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;

    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-gray-600 font-medium mb-4">{title}</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 h-2 rounded-full">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${activePercentage}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            <span className="text-sm text-gray-600">{activePercentage}%</span>
          </div>

          <div className="flex justify-between text-sm">
            <div className="text-gray-600">
              Active: {(activeCount ?? 0).toLocaleString()}
            </div>
            <div className="text-gray-600">
              Inactive: {(inactiveCount ?? 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Loader loading={loading} />
      <AdminSidebar />
      <div className="ml-64 w-full">
        <Wrapper1>
          <div className="flex flex-col items-center w-full">
            <div className="bg-white w-full rounded-lg p-6">
              <h1 className="text-2xl font-bold text-center mb-6">
                Admin Dashboard
              </h1>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card title="Total Users" count={stats.users} color="#4C82FB" />
                <Card
                  title="Total Resellers"
                  count={stats.resellers}
                  color="#FF5733"
                />
                <Card title="Total Resumes" count={stats.cvs} color="#2CC990" />
                <Card
                  title="Total Revenue"
                  count={`$${stats.revenue !== null ? stats.revenue : "N/A"}`}
                  color="#FFCC00"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex justify-center items-center gap-4 mb-6">
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

              {/* Charts */}
              <div className="grid grid-cols-1 gap-8">
                {/* Signup Analytics */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {role} Signup Analytics
                    </h2>
                    <button
                      onClick={() =>
                        setRole(role === "User" ? "Reseller" : "User")
                      }
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Switch to {role === "User" ? "Reseller" : "User"}
                    </button>
                  </div>
                  <div className="h-96">
                    <CustomBarChart
                      data={signupData}
                      color={role === "User" ? "#4C82FB" : "#FF5733"}
                    />
                  </div>
                </div>

                {/* Resume Analytics */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Resume Analytics
                  </h2>
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <select
                      value={resumeFilters.timePeriod}
                      onChange={(e) =>
                        handleResumeFilterChange(
                          e.target.value as "weekly" | "monthly"
                        )
                      }
                      className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>

                    {resumeFilters.timePeriod === "monthly" && (
                      <div className="flex gap-2">
                        <DatePicker
                          selected={resumeFilters.dateRange.startDate}
                          onChange={(date: Date | null) =>
                            handleResumeFilterChange(
                              resumeFilters.timePeriod,
                              date,
                              resumeFilters.dateRange.endDate
                            )
                          }
                          selectsStart
                          startDate={resumeFilters.dateRange.startDate}
                          endDate={resumeFilters.dateRange.endDate}
                          placeholderText="Start Date"
                          className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
                        />
                        <DatePicker
                          selected={resumeFilters.dateRange.endDate}
                          onChange={(date: Date | null) =>
                            handleResumeFilterChange(
                              resumeFilters.timePeriod,
                              resumeFilters.dateRange.startDate,
                              date
                            )
                          }
                          selectsEnd
                          startDate={resumeFilters.dateRange.startDate}
                          endDate={resumeFilters.dateRange.endDate}
                          minDate={resumeFilters.dateRange.startDate}
                          placeholderText="End Date"
                          className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-96">
                    <CustomBarChart data={resumeData} color="#2CC990" />
                  </div>
                </div>

                {/* Active Users Analytics */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Active Users Analytics
                  </h2>

                  {/* Activity Filter Controls */}
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <select
                      value={activityFilters.timePeriod}
                      onChange={(e) =>
                        handleActivityFilterChange(
                          e.target.value as "weekly" | "monthly"
                        )
                      }
                      className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>

                    {activityFilters.timePeriod === "monthly" && (
                      <div className="flex gap-2">
                        <DatePicker
                          selected={activityFilters.dateRange.startDate}
                          onChange={(date: Date | null) =>
                            handleActivityFilterChange(
                              activityFilters.timePeriod,
                              date,
                              activityFilters.dateRange.endDate
                            )
                          }
                          selectsStart
                          startDate={activityFilters.dateRange.startDate}
                          endDate={activityFilters.dateRange.endDate}
                          placeholderText="Start Date"
                          className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
                        />
                        <DatePicker
                          selected={activityFilters.dateRange.endDate}
                          onChange={(date: Date | null) =>
                            handleActivityFilterChange(
                              activityFilters.timePeriod,
                              activityFilters.dateRange.startDate,
                              date
                            )
                          }
                          selectsEnd
                          startDate={activityFilters.dateRange.startDate}
                          endDate={activityFilters.dateRange.endDate}
                          minDate={activityFilters.dateRange.startDate}
                          placeholderText="End Date"
                          className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>

                  {/* Activity Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ActivityCard
                      title="Active Users"
                      activeCount={activeUserStats.activeUsersCount}
                      inactiveCount={activeUserStats.inactiveUsersCount}
                      color="#6366F1"
                    />
                    <ActivityCard
                      title="Active Resellers"
                      activeCount={activeResellerStats.activeResellersCount}
                      inactiveCount={activeResellerStats.inactiveResellersCount}
                      color="#EC4899"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SubscriptionStatusPieChart />
                  <StackChart />
                </div>
              </div>
            </div>
          </div>
        </Wrapper1>
      </div>
    </>
  );
}

function Card({ title, count, color }: CardProps) {
  return (
    <div
      className="p-6 bg-white rounded-xl shadow-md border-l-4 transition-transform duration-200 hover:transform hover:scale-105"
      style={{ borderLeftColor: color }}
    >
      <h3 className="text-gray-600 font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2" style={{ color }}>
        {count}
      </p>
    </div>
  );
}
