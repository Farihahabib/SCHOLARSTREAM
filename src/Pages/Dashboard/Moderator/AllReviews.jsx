import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AllreviewsDataRows from '../../../Components/Dashboard/Tablerows/AllreviewsDataRows';
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure()
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

  const { data: reviews = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews`);
      return result.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={`container mx-auto px-4 sm:px-8 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="py-8">
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-blue-400' : 'text-blue-900'
        }`}>
          All Reviews
        </h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className={`inline-block min-w-full shadow-lg rounded-lg overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <table className="min-w-full leading-normal table-fixed">
              <thead>
                <tr>
                  <th className={`px-5 py-3 w-40 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    Reviewer
                  </th>
                  <th className={`px-5 py-3 w-40 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    Reviewer Email
                  </th>
                  <th className={`px-5 py-3 w-40 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    University Name
                  </th>
                  <th className={`px-5 py-3 w-40 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    Review
                  </th>
                  <th className={`px-5 py-3 w-28 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-gray-50 border-gray-200 text-gray-800'
                  }`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className={isDark ? 'bg-gray-800' : 'bg-white'}>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <AllreviewsDataRows key={review._id} review={review} refetch={refetch} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={`text-center py-8 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No reviews found.
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

export default AllReviews;
