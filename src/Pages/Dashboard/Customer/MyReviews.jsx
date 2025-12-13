import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MyreviewsDataRows from '../../../Components/Dashboard/Tablerows/MyreviewsDataRows';

const MyReviews = () => {
      const { user } = useAuth();

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/my-reviews/${user?.email}`
      );
      return result.data;
    },
  });
    return (
       <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal table-fixed">
              <thead>
                <tr>
                  <th className="px-5 py-3 w-40 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Reviewer Email
                  </th>
                  <th className="px-5 py-3 w-40 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                   University Name
                  </th>
                  <th className="px-5 py-3 w-40 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Review
                  </th>
                  <th className="px-5 py-3 w-28 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <MyreviewsDataRows key={review._id} review={review}  userEmail={user?.email}
              refetch={refetch} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                    no reviews added by you
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