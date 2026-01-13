// import { useQuery } from '@tanstack/react-query';
import axios, { Axios } from 'axios';
import { useState, useEffect } from 'react';

// import { useParams } from 'react-router';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useAuth from '../Hooks/useAuth';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSequire';

const Payment = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isDark, setIsDark] = useState(false);

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
  const {data:scholarship={},isLoading,isError} = useQuery({
      queryKey: ['scholarship',id],
      queryFn: async () => {
        const result = await axiosSecure.get(`/scholarships/${id}`)
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
    const result = await axiosSecure.post(
      `/create-checkout-session`,
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
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <h1 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
        isDark ? 'text-blue-400' : 'text-blue-900'
      }`}>
        Scholarship Payment
      </h1>
      
      <p className={`mb-4 leading-relaxed text-center max-w-2xl transition-colors duration-300 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        You are applying at <strong className={isDark ? 'text-blue-400' : 'text-blue-700'}>{universityName}</strong> located in 
        <strong className={isDark ? 'text-purple-400' : 'text-purple-700'}> {city}, {country}</strong> for the 
        <strong className={isDark ? 'text-green-400' : 'text-green-700'}> {degree}</strong> program under the 
        <strong className={isDark ? 'text-indigo-400' : 'text-indigo-700'}> {scholarshipCategory}</strong> category — 
        <strong className={isDark ? 'text-blue-400' : 'text-blue-700'}> {scholarshipName}</strong>.
      </p>

      {/* Payment Form */}
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-md transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700 shadow-gray-900/50' 
          : 'bg-white shadow-gray-200/50'
      }`}>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Student Name
            </p>
            <p className={`font-semibold transition-colors duration-300 ${
              isDark ? 'text-blue-400' : 'text-blue-900'
            }`}>
              {user?.displayName}
            </p>
          </div>

          <div className={`p-4 rounded-lg border transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Student Email
            </p>
            <p className={`font-semibold transition-colors duration-300 ${
              isDark ? 'text-blue-400' : 'text-blue-900'
            }`}>
              {user?.email}
            </p>
          </div>

          <div className={`p-4 rounded-lg border transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-green-50 border-green-200'
          }`}>
            <p className={`text-sm font-medium transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Application Fee
            </p>
            <p className={`text-2xl font-bold transition-colors duration-300 ${
              isDark ? 'text-green-400' : 'text-green-700'
            }`}>
              {applicationFees ? `$${applicationFees}` : 'Free'}
            </p>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg mt-6 ${
            isDark
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
          }`}
        >
          Pay Now
        </button>
      </div>
      </div>
  );
};

export default Payment;