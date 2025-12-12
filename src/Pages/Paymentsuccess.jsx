import axios from 'axios';
import React, { useEffect, useState,  } from 'react';
import {  useSearchParams } from 'react-router';
import MyLink from '../Components/Shared/MyLink';


const Paymentsuccess = () => {

    const [searchParams]=useSearchParams();
    const sessionId = searchParams.get('session_id');
     const [paymentData,   setPaymentData ] = useState({});
     console.log(paymentData)
useEffect(() => {
if (sessionId) {
    //
    axios.post(`${import.meta.env.VITE_API_URL}/payment-success`,{
        sessionId,   
    }).then((res) => {
          setPaymentData(res.data); // ✅ UPDATE STATE HERE
        })
 
}

}, [sessionId])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg text-center">
             <h2 className="text-3xl text-blue-800 font-bold mb-4">
          🎉 Payment Successful!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you! Your scholarship application payment is completed.
        </p>
          <div className="text-left space-y-3">
            <p><strong>Scholarship Name:</strong> {paymentData.scholarshipName}</p>
            <p><strong>University:</strong> {paymentData.universityName}</p>
            <p><strong>Degree:</strong> {paymentData.degree}</p>
            <p><strong>ScholarshipCategory:</strong> {paymentData.scholarshipCategory}</p>
            <p><strong>SubjectCategory:</strong> {paymentData.subjectCategory}</p>
              <p className="text-blue-800 font-semibold text-lg pt-4">
              💰 Amount Paid: ${paymentData.applicationFees}
            </p>
</div>


        {/* Scholarship + Payment Details */}
        {/* {sessionData && (
          
          
          </div>
        )} */}
        <MyLink to='/dashboard/my-applications' className="btn hovar py-2"> Go to MyApplications</MyLink>
        </div>
        </div>
    )
};

export default Paymentsuccess;