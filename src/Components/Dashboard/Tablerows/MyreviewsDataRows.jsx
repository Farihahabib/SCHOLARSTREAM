import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';

const MyreviewsDataRows = ({ review, refetch }) => {
  const { _id, studentEmail, universityName, rating, comment } = review;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(rating);
  const [newComment, setNewComment] = useState(comment);
 const axiosSecure = useAxiosSecure()
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/reviews/${_id}`);
      toast.success("Review deleted successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete review");
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
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="px-5 py-5 border-b bg-white text-sm">{studentEmail}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">{universityName}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <p><strong>Rating:</strong> {rating} / 5</p>
          <p><strong>Comment:</strong> {comment}</p>
        </td>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <button onClick={handleDelete} className="btn btn-xs bg-red-500 text-white mr-2">Delete</button>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-xs bg-blue-500 text-white">Edit</button>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-950 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Review</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Comment</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="btn btn-sm bg-gray-400 text-white">Cancel</button>
              <button onClick={handleUpdate} className="btn btn-sm bg-blue-500 text-white">Save</button>
            </div>
          </div>
        </div>
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