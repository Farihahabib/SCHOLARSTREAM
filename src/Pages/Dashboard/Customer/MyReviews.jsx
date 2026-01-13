import React, { useState, useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import MyreviewsDataRows from '../../../Components/Dashboard/Tablerows/MyreviewsDataRows';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';

const MyReviews = () => {
  const { user } = useAuth();
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

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-reviews/`);
      return result.data;
    },
  });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          My Reviews
        </h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className={`min-w-full shadow-lg rounded-lg overflow-hidden ${
            isDark ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white'
          }`}>
            <table className="min-w-full leading-normal table-fixed">
              <thead>
                <tr>
                  <th className={`px-5 py-3 w-40 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    Reviewer Email
                  </th>
                  <th className={`px-5 py-3 w-40 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    University Name
                  </th>
                  <th className={`px-5 py-3 w-40 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    Review
                  </th>
                  <th className={`px-5 py-3 w-28 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className={isDark ? 'bg-gray-800/60' : 'bg-white'}>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <MyreviewsDataRows 
                      key={review._id} 
                      review={review}  
                      userEmail={user?.email}
                      refetch={refetch}
                      isDark={isDark}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={`text-center py-8 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <div className="flex flex-col items-center">
                        <svg className={`w-12 h-12 mb-4 ${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7m5 5v4" />
                        </svg>
                        <p className="text-lg font-medium">No reviews added by you</p>
                        <p className="text-sm mt-1">Your reviews will appear here once you add them</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;