import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../ErrorPage";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const UpdateScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();

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

  // Fetch scholarship data 
  const { data, isLoading, isError } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Pre-fill the form when data is loaded
  useEffect(() => {
    if (data) {
      reset({
        scholarshipName: data.scholarshipName || "",
        universityName: data.universityName || "",
        image: data.image || "",
        country: data.country || "",
        city: data.city || "",
        worldRank: data.worldRank || "",
        subjectCategory: data.subjectCategory || "",
        scholarshipCategory: data.scholarshipCategory || "",
        degree: data.degree || "",
        tuitionFees: data.tuitionFees || "",
        applicationFees: data.applicationFees || "",
        serviceCharge: data.serviceCharge || "",
        deadline: data.deadline ? data.deadline.split("T")[0] : "",
        postDate: data.postDate ? data.postDate.split("T")[0] : "",
        userEmail: data.userEmail || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    setIsPending(true);
      await axiosSecure.put(`/scholarships/${id}`, formData);
      toast.success("Scholarship updated successfully!");
      navigate("/dashboard/manage-scholarship");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className={`max-w-3xl mx-auto p-9 shadow-xl rounded mb-9 transition-colors duration-300 ${
      isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
    }`}>
      <h2 className={`text-2xl font-bold mb-4 text-center ${
        isDark ? 'text-blue-400' : 'text-blue-900'
      }`}>
        Update Scholarship
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Scholarship Name
          </label>
          <input 
            {...register("scholarshipName")} 
            placeholder="Scholarship Name" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
            required 
          />
        </div>

        {/* University Name */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            University Name
          </label>
          <input 
            {...register("universityName")} 
            placeholder="University Name" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
            required 
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Image URL
          </label>
          <input 
            {...register("image")} 
            placeholder="Image URL" 
            type="text" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Country
          </label>
          <input 
            {...register("country")} 
            placeholder="Country" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
            required 
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            City
          </label>
          <input 
            {...register("city")} 
            placeholder="City" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
            required 
          />
        </div>

        {/* World Rank */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            World Rank
          </label>
          <input 
            {...register("worldRank")} 
            placeholder="World Rank" 
            type="number" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Subject Category */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Subject Category
          </label>
          <input 
            {...register("subjectCategory")} 
            placeholder="Subject Category" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Scholarship Category */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Scholarship Category
          </label>
          <select 
            {...register("scholarshipCategory")} 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-300'
            }`}
          >
            <option value="" disabled>Select Scholarship Category</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        {/* Degree */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Degree
          </label>
          <select 
            {...register("degree")} 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-300'
            }`}
          >
            <option value="" disabled>Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* Tuition Fees */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Tuition Fees
          </label>
          <input 
            {...register("tuitionFees")} 
            placeholder="Tuition Fees" 
            type="number" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Application Fees */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Application Fees
          </label>
          <input 
            {...register("applicationFees")} 
            placeholder="Application Fees" 
            type="number" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Service Charge */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Service Charge
          </label>
          <input 
            {...register("serviceCharge")} 
            placeholder="Service Charge" 
            type="number" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Deadline */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Deadline
          </label>
          <input 
            {...register("deadline")} 
            type="date" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Post Date */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            Post Date
          </label>
          <input 
            {...register("postDate")} 
            type="date" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* User Email */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-1 ${
            isDark ? 'text-blue-400' : 'text-blue-900'
          }`}>
            User Email
          </label>
          <input 
            {...register("userEmail")} 
            placeholder="User Email" 
            type="email" 
            className={`border p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-900 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
            }`}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isPending}
          className={`col-span-1 md:col-span-2 p-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
            isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : isDark
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
          }`}
        >
          {isPending ? <FaSpinner className="animate-spin mr-2" /> : null}
          {isPending ? "Updating..." : "Update Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default UpdateScholarship;

