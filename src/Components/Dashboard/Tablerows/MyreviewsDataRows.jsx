import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';

const MyreviewsDataRows = ({ review, refetch, isDark, userEmail }) => {
  const { _id, studentEmail, universityName, rating, comment } = review;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(rating);
  const [newComment, setNewComment] = useState(comment);
  const axiosSecure = useAxiosSecure();

  const handleDelete = async () => {
    try {
      // Use the correct endpoint for users to delete their own reviews
      await axiosSecure.delete(`/my-reviews/${_id}/${userEmail}`);
      toast.success("Review deleted successfully!");
      refetch();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Delete error:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 404) {
        toast.error("Review not found or you don't have permission to delete it");
      } else if (error.response?.status === 403) {
        toast.error("You can only delete your own reviews");
      } else {
        toast.error("Failed to delete review. Please try again.");
      }
      
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.patch(`/reviews/${_id}`, {
        rating: newRating,
        comment: newComment,
      });
      toast.success("Review updated successfully!");
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update review");
    }
  };

  return (
    <>
      <tr className={`border-b transition-colors duration-200 ${
        isDark 
          ? 'border-gray-600/50 hover:bg-gray-700/50' 
          : 'border-gray-200 hover:bg-gray-50'
      }`}>
        <td className={`px-5 py-5 text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {studentEmail}
        </td>
        <td className={`px-5 py-5 text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {universityName}
        </td>
        <td className={`px-5 py-5 text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          <div className="space-y-1">
            <p className="flex items-center">
              <strong className={isDark ? 'text-yellow-400' : 'text-yellow-600'}>Rating:</strong>
              <span className="ml-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating 
                        ? 'text-yellow-400' 
                        : isDark ? 'text-gray-600' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm">({rating}/5)</span>
              </span>
            </p>
            <p>
              <strong className={isDark ? 'text-blue-400' : 'text-blue-600'}>Comment:</strong>
              <span className="ml-2">{comment}</span>
            </p>
          </div>
        </td>
        <td className="px-5 py-5 text-sm space-x-2">
          <button 
            onClick={() => setIsDeleteModalOpen(true)} 
            className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-red-500 hover:bg-red-600 text-white shadow-lg"
          >
            Delete
          </button>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
          >
            Edit
          </button>
        </td>
      </tr>

      {/* Edit Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className={`relative transform overflow-hidden rounded-xl shadow-2xl transition-all w-full max-w-md ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
            }`}>
              <div className="p-6">
                <h2 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  Edit Review
                </h2>
                
                <div className="mb-4">
                  <label className="block mb-2 font-semibold text-sm">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newRating}
                    onChange={(e) => setNewRating(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-300 focus:border-blue-300'
                    }`}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 font-semibold text-sm">Comment</label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="4"
                    className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 resize-none ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-300 focus:border-blue-300'
                    }`}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpdate} 
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className={`relative transform overflow-hidden rounded-xl shadow-2xl transition-all w-full max-w-md ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
            }`}>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                    <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>

                <h3 className={`text-xl font-bold text-center mb-2 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  Delete Review
                </h3>

                <p className={`text-center mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Are you sure you want to delete your review for <strong>{universityName}</strong>? This action cannot be undone.
                </p>

                {/* Review Info */}
                <div className={`p-4 rounded-lg mb-6 border ${
                  isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className="font-semibold">{universityName}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Rating: {rating}/5 • {comment}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default MyreviewsDataRows;








// import axios from 'axios';
// import React from 'react';
// import toast from 'react-hot-toast';

// const MyreviewsDataRows = ({review, refetch}) => {
//      const { _id,studentEmail, universityName, rating, comment } = review;
//   const handleDelete = async () => {
//     try {
//       // Call All Reviews delete API
//       await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${_id}`);
//       toast.success("Review deleted successfully!");
//       refetch(); // Refresh My Reviews page
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete review");
//     }
//   };
//  return (
//     <tr className="border-b border-gray-200 hover:bg-gray-100">
//       {/* Reviewer Email */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {studentEmail}
//       </td>
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {universityName}
//       </td>

//       {/* Review (Rating + Comment) */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <div>
//           <p>
//             <strong>Rating:</strong> {rating} / 5
//           </p>
//           <p>
//             <strong>Comment:</strong> {comment}
//           </p>
//         </div>
//       </td>

//       {/* Action (Optional: Delete/Edit Review) */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {/* For now, just a placeholder button */}
//        <button
//           onClick={handleDelete}
//           className="btn btn-xs bg-red-500 text-white"
//         >
//           Delete
//         </button>
//        <button
       
//           className="btn btn-xs bg-red-500 text-white"
//         >
//          Edit
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default MyreviewsDataRows;