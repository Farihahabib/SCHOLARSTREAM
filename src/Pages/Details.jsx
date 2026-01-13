import React, { useState, useEffect } from 'react';
import Container from '../Components/Shared/Container';
import MyLink from '../Components/Shared/MyLink';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import useAxiosSequire from '../Hooks/useAxiosSequire';

const DetailBox = ({ label, value, pre, isDark }) => (
  <div className={`p-4 rounded-lg border transition-colors duration-300 ${
    isDark 
      ? 'bg-gray-700/50 border-gray-600 backdrop-blur-sm' 
      : 'bg-blue-50 border-blue-200'
  }`}>
    <p className={`font-semibold ${
      isDark ? 'text-blue-400' : 'text-blue-900'
    }`}>
      {label}
    </p>

    {pre ? (
      <pre className={`whitespace-pre-wrap transition-colors duration-300 ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {value}
      </pre>
    ) : (
      <p className={`transition-colors duration-300 ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {value}
      </p>
    )}
  </div>
);

const Details = () => {
  const {id} = useParams();
  const axiosSecure = useAxiosSequire();
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
  const {data:scholarship=[],isLoading,isError,refetch} = useQuery({
      queryKey: ['scholarship',id],
      queryFn: async () => {
        const result = await axiosSecure(`/scholarships/${id}`)
        return result.data
      }
  })

  console.log(scholarship)
  
  if(isLoading) return <LoadingSpinner />
  
  const {scholarshipName,image,applicationFees,city,country,deadline,degree,postDate,scholarshipCategory,serviceCharge,subjectCategory,tuitionFees,universityName,userEmail,worldRank,_id} = scholarship || {};
  
  return (
    <Container>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* University Image */}
          <div className={`w-full h-64 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
            isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-gray-300 shadow-gray-400/50'
          }`}>
            <img
              src={image}
              alt="University"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header Info */}
          <div className={`mt-8 shadow-xl rounded-xl p-9 transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
              : 'bg-white shadow-gray-200/50'
          }`}>
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDark ? 'text-blue-400' : 'text-blue-900'
            }`}>
              {scholarshipName}
            </h1>

            <p className={`mt-2 text-lg transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <strong>University:</strong> {universityName}
            </p>

            <p className={`mt-1 text-lg transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <strong>World Rank:</strong> {worldRank}
            </p>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <DetailBox 
                label="Deadline" 
                value={new Date(deadline).toLocaleDateString()} 
                isDark={isDark}
              />
              <DetailBox 
                label="Location" 
                value={`${city}, ${country}`}
                isDark={isDark}
              />
              <DetailBox 
                label="Application Fees" 
                value={applicationFees ? `$${applicationFees}` : "Free"} 
                isDark={isDark}
              />
              <DetailBox 
                label="Scholarship Category" 
                value={scholarshipCategory}
                isDark={isDark}
              />
              <DetailBox 
                label="Degree Level" 
                value={degree}
                isDark={isDark}
              />
              <DetailBox 
                label="Subject Category" 
                value={subjectCategory}
                isDark={isDark}
              />
              <DetailBox 
                label="Tuition Fees" 
                value={tuitionFees ? `$${tuitionFees}` : "Not specified"}
                isDark={isDark}
              />
              <DetailBox 
                label="Service Charge" 
                value={serviceCharge ? `$${serviceCharge}` : "No charge"}
                isDark={isDark}
              />
            </div>

            {/* Additional Information */}
            <div className="mt-10">
              <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                isDark ? 'text-blue-400' : 'text-blue-900'
              }`}>
                Scholarship Information
              </h2>
              
              <div className={`p-6 rounded-lg border transition-colors duration-300 ${
                isDark 
                  ? 'bg-gray-700/30 border-gray-600 backdrop-blur-sm' 
                  : 'bg-blue-50/50 border-blue-200'
              }`}>
                <p className={`leading-relaxed transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {scholarship.description || "This scholarship provides excellent opportunities for students to pursue their academic goals. For more detailed information about eligibility criteria, application requirements, and selection process, please proceed with the application."}
                </p>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-8 text-center">
              <MyLink 
                to={`/payment/${id}`} 
                scholarship={scholarship} 
                id={id} 
                className={`inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
                }`}
              >
                Apply For Scholarship
              </MyLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Details;