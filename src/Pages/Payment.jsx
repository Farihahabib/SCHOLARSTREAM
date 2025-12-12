// import { useQuery } from '@tanstack/react-query';
import axios, { Axios } from 'axios';

// import { useParams } from 'react-router';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useAuth from '../Hooks/useAuth';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const {data:scholarship={},isLoading,isError} =useQuery({
      queryKey: ['scholarship',id],
      queryFn: async () =>{
const result = await axios.get(`${import.meta.env.VITE_API_URL}/scholarships/${id}` )
// console.log(result);
return result.data

      }
    })
    if(isLoading) return <LoadingSpinner />
    const {_id,universityName,degree,scholarshipCategory,scholarshipName,city,country,applicationFees,image,postDate,serviceCharge,subjectCategory,tuitionFees,userEmail,deadline} = scholarship || {};
const handlePayment = async () => {
  try {
   const paymentInfo = {
      scholarshipId: _id,
     universityName,
    degree,
    scholarshipCategory,
    scholarshipName,
    city,
    country,
    applicationFees,
    image,
    postDate,
    serviceCharge,
    subjectCategory,
    tuitionFees,
    userEmail,
    deadline,
      Student: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      }
    };
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    )
    console.log(result.data.url);
    // redirect user to Stripe checkout:
    window.location.href = result.data.url;

  } catch (error) {
    console.log(error);
  }
};
     return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Scholarship Payment</h1>
      {/* <p className="text-gray-700 mb-4">
        You are applying for scholarship ID: <strong>{id}</strong>
      </p> */}
<p className="text-gray-700 mb-4 leading-relaxed text-center">
  You are applying at <strong>{universityName}</strong> located in 
  <strong> {city}, {country}</strong> for the 
  <strong> {degree}</strong> program under the 
  <strong>{scholarshipCategory}</strong> category —  
  <strong>{scholarshipName}</strong>.
</p>

      {/* Payment Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
     <div className='mt-2'>
              <p className='text-sm text-gray-500'>Students Name : {user?.displayName}</p>
            </div>

            <div className='mt-2'>
              <p className='text-sm text-gray-500'>Students Email : {user?.email}</p>
            </div>

 
        <button
            onClick={handlePayment}
          className="w-full py-2  rounded-lg  transition my-5 btn hover"
        >
          Pay Now
        </button>
      </div>
      </div>
  );
};

export default Payment;