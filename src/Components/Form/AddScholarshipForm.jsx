import { useForm } from "react-hook-form"
import { imageUpload } from "../../utils"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useState, useEffect } from "react"

import ErrorPage from "../../Pages/ErrorPage"
import LoadingSpinner from "../Shared/LoadingSpinner"
import toast from "react-hot-toast"
import { FaSpinner } from "react-icons/fa"
import useAuth from "../../Hooks/useAuth"
import useAxiosSecure from "../../Hooks/useAxiosSequire"

const AddScholarshipForm = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();
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

  //useMutation hook use here
  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.post(`/scholarships`, payload),
    onSuccess: (data) => {
      //show success toast
      toast.success('Scholarship added successfully')
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
    onMutate: payload => {
      console.log('Adding new scholarship...', payload)
    }
  })

  //react hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  console.log(errors)

  const onSubmit = async data => {
    console.log(data)
    const {
      scholarshipName,
      universityName,
      image,
      country,
      city,
      worldRank,
      subjectCategory,
      scholarshipCategory,
      degree,
      tuitionFees,
      applicationFees,
      serviceCharge,
      deadline,
      postDate,
      userEmail
    } = data;

    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);
      const scholarshipData = {
        image: imageURL,
        scholarshipName,
        universityName,
        country,
        city,
        worldRank,
        subjectCategory,
        scholarshipCategory,
        degree,
        tuitionFees: Number(tuitionFees),
        applicationFees: Number(applicationFees),
        serviceCharge: Number(serviceCharge),
        deadline,
        postDate,
        userEmail,
        moderator: {
          image: user?.photoURL || '',
          name: user?.displayName || '',
          email: user?.email || '',
        }
      };

      // --- GET TOKEN ---
      const token = await user.getIdToken(); // Firebase JWT

      // --- SEND WITH AUTH HEADER ---
      await mutateAsync(
        scholarshipData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending) return <LoadingSpinner />
  if (isError) return <ErrorPage />

  return (
    <div className={`max-w-3xl mx-auto p-9 shadow-xl rounded-lg mb-9 transition-colors duration-300 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${
        isDark ? 'text-blue-400' : 'text-blue-900'
      }`}>Create New Scholarship</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Scholarship Name */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Scholarship Name</label>
          <input 
            {...register("scholarshipName")} 
            placeholder="Enter scholarship name" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* University Name */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>University Name</label>
          <input 
            {...register("universityName")} 
            placeholder="Enter university name" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>University Image</label>
          <input 
            {...register("image")} 
            type="file" 
            accept="image/*"
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Country</label>
          <input 
            {...register("country")} 
            placeholder="Enter country" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>City</label>
          <input 
            {...register("city")} 
            placeholder="Enter city" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* World Rank */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>World Rank</label>
          <input 
            {...register("worldRank")} 
            placeholder="Enter world rank" 
            type="number" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Subject Category */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Subject Category</label>
          <input 
            {...register("subjectCategory")} 
            placeholder="Enter subject category" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Scholarship Category */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Scholarship Category</label>
          <select
            {...register("scholarshipCategory")}
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-500'
            }`}
            required
            defaultValue=""
          >
            <option value="" disabled>Select Scholarship Category</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        {/* Degree */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Degree</label>
          <select
            {...register("degree")}
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-500'
            }`}
            required
            defaultValue=""
          >
            <option value="" disabled>Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        {/* Tuition Fees */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Tuition Fees (optional)</label>
          <input 
            {...register("tuitionFees")} 
            placeholder="Enter tuition fees" 
            type="number" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
          />
        </div>

        {/* Application Fees */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Application Fees</label>
          <input 
            {...register("applicationFees")} 
            placeholder="Enter application fees" 
            type="number" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Service Charge */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Service Charge</label>
          <input 
            {...register("serviceCharge")} 
            placeholder="Enter service charge" 
            type="number" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Deadline */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Deadline</label>
          <input 
            {...register("deadline")} 
            type="date" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Post Date */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>Post Date</label>
          <input 
            {...register("postDate")} 
            type="date" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* User Email */}
        <div className="flex flex-col">
          <label className={`font-semibold mb-2 ${
            isDark ? 'text-gray-300' : 'text-blue-900'
          }`}>User Email</label>
          <input 
            {...register("userEmail")} 
            placeholder="Enter user email" 
            type="email" 
            className={`border p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-blue-300 bg-white text-blue-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-500'
            }`} 
            required 
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25"
        >
          {isPending ? (
            <FaSpinner className='animate-spin m-auto' />
          ) : (
            'Create Scholarship'
          )}
        </button>
      </form>
    </div>
  )
}

export default AddScholarshipForm