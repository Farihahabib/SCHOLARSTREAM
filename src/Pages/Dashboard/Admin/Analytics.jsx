import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const Analytics = () => {
const axiosSecure = useAxiosSecure()

  // Total Users
  const { data: totalUsersData } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/total-users`);
      return res.data;
    },
  });

  // Total Scholarships
  const { data: totalScholarshipsData } = useQuery({
    queryKey: ["totalScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/total-scholarships`);
      return res.data;
    },
  });

  // Total Fees
  const { data: totalFeesData } = useQuery({
    queryKey: ["totalFees"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/total-fees`);
      return res.data;
    },
  });

  // Chart data
  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["applicationsChart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/applications-chart`);
      // Transform data for Recharts
      return res.data.map(item => ({ name: item._id, applications: item.applications }));
    },
  });

  if (!totalUsersData || !totalScholarshipsData || !totalFeesData || chartLoading)
    return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Platform Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-gray-500 uppercase text-sm">Total Users</h3>
          <p className="text-xl font-bold">{totalUsersData.totalUsers}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-gray-500 uppercase text-sm">Total Scholarships</h3>
          <p className="text-xl font-bold">{totalScholarshipsData.totalScholarships}</p>
        </div>
        <div className="bg-white shadow p-4 rounded text-center">
          <h3 className="text-gray-500 uppercase text-sm">Total Fees Collected</h3>
          <p className="text-xl font-bold">${totalFeesData.totalFees}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-gray-800 font-semibold mb-4 text-center">Applications per University</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications" fill="#1f77b4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
