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
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();

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
    <div className="max-w-3xl mx-auto p-9 bg-white shadow-xl rounded mb-9">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">Update Scholarship</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Scholarship Name</label>
          <input {...register("scholarshipName")} placeholder="Scholarship Name" className="border border-blue-900 text-blue-900 p-2 rounded" required />
        </div>

        {/* University Name */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">University Name</label>
          <input {...register("universityName")} placeholder="University Name" className="border p-2 rounded border-blue-900 text-blue-900" required />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Image URL</label>
          <input {...register("image")} placeholder="Image URL" type="text" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Country</label>
          <input {...register("country")} placeholder="Country" className="border p-2 rounded border-blue-900 text-blue-900" required />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">City</label>
          <input {...register("city")} placeholder="City" className="border p-2 rounded border-blue-900 text-blue-900" required />
        </div>

        {/* World Rank */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">World Rank</label>
          <input {...register("worldRank")} placeholder="World Rank" type="number" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Subject Category */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Subject Category</label>
          <input {...register("subjectCategory")} placeholder="Subject Category" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Scholarship Category */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Scholarship Category</label>
          <select {...register("scholarshipCategory")} className="border p-2 rounded border-blue-900 text-blue-900">
            <option value="" disabled>Select Scholarship Category</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        {/* Degree */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Degree</label>
          <select {...register("degree")} className="border p-2 rounded border-blue-900 text-blue-900">
            <option value="" disabled>Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* Tuition Fees */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Tuition Fees</label>
          <input {...register("tuitionFees")} placeholder="Tuition Fees" type="number" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Application Fees */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Application Fees</label>
          <input {...register("applicationFees")} placeholder="Application Fees" type="number" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Service Charge */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Service Charge</label>
          <input {...register("serviceCharge")} placeholder="Service Charge" type="number" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Deadline */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Deadline</label>
          <input {...register("deadline")} type="date" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Post Date */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">Post Date</label>
          <input {...register("postDate")} type="date" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* User Email */}
        <div className="flex flex-col">
          <label className="text-blue-900 font-semibold mb-1">User Email</label>
          <input {...register("userEmail")} placeholder="User Email" type="email" className="border p-2 rounded border-blue-900 text-blue-900" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="col-span-1 md:col-span-2 bg-blue-600 text-white p-2 rounded btn hover">
          {isPending ? <FaSpinner className="animate-spin m-auto" /> : "Update Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default UpdateScholarship;

