import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useSession } from "next-auth/react";

interface SubscriptionData {
  count: number;
  status: string;
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  payload: SubscriptionData;
  value: number;
}

const SubscriptionStatusPieChart = () => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData[]>(
    []
  );
  const { data: session }: any = useSession();

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const token = session?.token;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/dashboard/subscription-status-count`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response?.data?.result) {
          setSubscriptionData(response.data.result);
        } else {
        }
      } catch (error) {
      }
    };

    if (session) {
      fetchSubscriptionData();
    }
  }, [session]);

  // Modern gradient colors
  const COLORS = [
    ["#FF6B6B", "#EE5D5D"], // Coral Red gradient for Not Subscribed
    ["#4FACFE", "#00F2FE"], // Electric Blue gradient for Subscribed
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: CustomLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Calculate percentage
    const total = subscriptionData.reduce((sum, data) => sum + data.count, 0);
    const percentage = ((value / total) * 100).toFixed(1);

    return (
      <g>
        <text
          x={x}
          y={y - 10}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-bold"
        >
          {value}
        </text>
        <text
          x={x}
          y={y + 10}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm"
        >
          {`${percentage}%`}
        </text>
      </g>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-8 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{
                background: `linear-gradient(45deg, ${COLORS[index][0]}, ${COLORS[index][1]})`,
              }}
            />
            <span className="text-gray-700 font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">User Subscription Status</h2>
      <div className="h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {subscriptionData.map((entry, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`pieGradient-${index}`}
                >
                  <stop offset="0%" stopColor={COLORS[index][0]} />
                  <stop offset="100%" stopColor={COLORS[index][1]} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={subscriptionData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {subscriptionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#pieGradient-${index})`}
                  stroke="none"
                />
              ))}
            </Pie>
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriptionStatusPieChart;
