import { useForm } from "react-hook-form"
import { imageUpload } from "../../utils"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

import ErrorPage from "../../Pages/ErrorPage"
import LoadingSpinner from "../Shared/LoadingSpinner"
import toast from "react-hot-toast"
import { FaSpinner } from "react-icons/fa"
import useAuth from "../../Hooks/useAuth"
import useAxiosSecure from "../../Hooks/useAxiosSequire"

const AddScholarshipForm = () => {
  const axiosSecure = useAxiosSecure()
//useMutation hook use here
const {user } = useAuth();
const {isPending,isError,mutateAsync} = useMutation({
  mutationFn: async (payload)=>
 await axiosSecure.post(`/scholarships`,payload
             ),
  onSuccess: (data)=>{
    //show success toast
    toast.success('Scholarship added successfully')
    console.log(data)},
  onError: (error)=>{
    console.log(error)},
    onMutate: payload=>{
    console.log('Adding new scholarship...', payload)
    }
}
  )
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

if(isPending) return <LoadingSpinner />
if(isError) return <ErrorPage />
  return (
  <div className="max-w-3xl mx-auto p-9 bg-white shadow-xl rounded mb-9">
  <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">Create New Scholarship</h2>

  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">


    {/* Scholarship Name */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Scholarship Name</label>
      <input {...register("scholarshipName")} placeholder="scholarshipName" className="border border-blue-900 text-blue-900 p-2 rounded" required />
    </div>

    {/* University Name */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">University Name</label>
      <input {...register("universityName")} placeholder="universityName" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Image */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Image</label>
      <input {...register("image")} placeholder="image" type="file" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Country */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Country</label>
      <input {...register("country")} placeholder="country" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* City */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">City</label>
      <input {...register("city")} placeholder="city" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* World Rank */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">World Rank</label>
      <input {...register("worldRank")} placeholder="worldRank" type="number" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Subject Category */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Subject Category</label>
      <input {...register("subjectCategory")} placeholder="subjectCategory" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Scholarship Category */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Scholarship Category</label>
     <select
    {...register("scholarshipCategory")}
    className="border p-2 rounded border-blue-900 text-blue-900"
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
      <label className="text-blue-900 font-semibold mb-1">Degree</label>
      <select
    {...register("degree")}
    className="border p-2 rounded border-blue-900 text-blue-900"
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
      <label className="text-blue-900 font-semibold mb-1">Tuition Fees (optional)</label>
      <input {...register("tuitionFees")} placeholder="tuitionFees" type="number" className="border p-2 rounded border-blue-900 text-blue-900" />
    </div>

    {/* Application Fees */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Application Fees</label>
      <input {...register("applicationFees")} placeholder="applicationFees" type="number" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Service Charge */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Service Charge</label>
      <input {...register("serviceCharge")} placeholder="serviceCharge" type="number" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Deadline */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Deadline</label>
      <input {...register("deadline")} placeholder="" type="date" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Post Date */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">Post Date</label>
      <input {...register("postDate")}placeholder="" type="date" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* User Email */}
    <div className="flex flex-col">
      <label className="text-blue-900 font-semibold mb-1">User Email</label>
      <input {...register("userEmail")}placeholder="User email" type="email" className="border p-2 rounded border-blue-900 text-blue-900" required />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="col-span-1 md:col-span-2 bg-blue-600 text-white p-2 rounded btn hover"
    >
      {isPending ? (
                     <FaSpinner className='animate-spin m-auto' />
                   ) : (
                     '  Create Scholarship'
                   )}
    </button>
  </form>
</div>

  )
}

export default AddScholarshipForm