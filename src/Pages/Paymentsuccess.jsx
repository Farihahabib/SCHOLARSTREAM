import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { CheckCircle, Award, University, GraduationCap, BookOpen, DollarSign } from 'lucide-react';
import MyLink from '../Components/Shared/MyLink';
import useAxiosSecure from '../Hooks/useAxiosSequire';

const Paymentsuccess = () => {
  const axiosSequire = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentData, setPaymentData] = useState({});
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

  console.log('Payment Data:', paymentData)
  console.log('Is Dark:', isDark)

  useEffect(() => {
    if (sessionId) {
      axiosSequire.post(`/payment-success`, {
        sessionId,   
      }).then((res) => {
        setPaymentData(res.data);
      })
    }
  }, [sessionId])

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`shadow-xl rounded-xl p-8 w-full max-w-2xl text-center ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-green-500">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className={`text-3xl font-bold mb-4 ${
          isDark ? 'text-green-400' : 'text-green-700'
        }`}>
          🎉 Payment Successful!
        </h2>
        
        <p className={`mb-8 text-lg ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Congratulations! Your scholarship application payment has been completed successfully.
        </p>

        {/* Payment Amount */}
        <div className={`p-6 rounded-lg mb-8 ${
          isDark ? 'bg-gray-700' : 'bg-green-50'
        }`}>
          <p className={`text-2xl font-bold ${
            isDark ? 'text-green-400' : 'text-green-700'
          }`}>
            Amount Paid: ${paymentData.applicationFees || '13'}
          </p>
        </div>

        {/* Action Button */}
        <MyLink 
          to='/dashboard/my-applications' 
          className={`inline-block px-8 py-3 rounded-lg font-semibold ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Go to MyApplications
        </MyLink>

      </div>
    </div>
  )
};

export default Paymentsuccess;