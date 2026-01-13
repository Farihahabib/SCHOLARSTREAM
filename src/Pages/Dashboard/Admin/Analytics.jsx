import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const Analytics = () => {
  const axiosSecure = useAxiosSecure()
  const [isDark, setIsDark] = useState(false)

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Create observer to watch for class changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

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
      <h2 className={`text-3xl font-bold mb-8 text-center ${
        isDark ? 'text-blue-400' : 'text-blue-900'
      }`}>Platform Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`shadow-lg p-6 rounded-lg text-center transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`uppercase text-sm font-semibold mb-2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>Total Users</h3>
          <p className={`text-3xl font-bold ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>{totalUsersData.totalUsers}</p>
        </div>
        <div className={`shadow-lg p-6 rounded-lg text-center transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`uppercase text-sm font-semibold mb-2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>Total Scholarships</h3>
          <p className={`text-3xl font-bold ${
            isDark ? 'text-purple-400' : 'text-purple-600'
          }`}>{totalScholarshipsData.totalScholarships}</p>
        </div>
        <div className={`shadow-lg p-6 rounded-lg text-center transition-colors duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`uppercase text-sm font-semibold mb-2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>Total Fees Collected</h3>
          <p className={`text-3xl font-bold ${
            isDark ? 'text-green-400' : 'text-green-600'
          }`}>${totalFeesData.totalFees}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className={`shadow-lg rounded-lg p-6 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`font-semibold mb-6 text-center text-xl ${
          isDark ? 'text-gray-200' : 'text-gray-800'
        }`}>Applications per University</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis 
              dataKey="name" 
              tick={{ fill: isDark ? '#e5e7eb' : '#374151' }}
              axisLine={{ stroke: isDark ? '#6b7280' : '#d1d5db' }}
            />
            <YAxis 
              tick={{ fill: isDark ? '#e5e7eb' : '#374151' }}
              axisLine={{ stroke: isDark ? '#6b7280' : '#d1d5db' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#374151' : '#ffffff',
                border: `1px solid ${isDark ? '#6b7280' : '#d1d5db'}`,
                borderRadius: '8px',
                color: isDark ? '#e5e7eb' : '#374151'
              }}
            />
            <Legend 
              wrapperStyle={{
                color: isDark ? '#e5e7eb' : '#374151'
              }}
            />
            <Bar 
              dataKey="applications" 
              fill={isDark ? '#3b82f6' : '#1f77b4'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
