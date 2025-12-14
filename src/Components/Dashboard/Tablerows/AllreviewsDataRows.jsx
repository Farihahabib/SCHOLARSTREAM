import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const AllreviewsDataRows = ({ review ,refetch}) => {
  const { _id,studentName, studentEmail, universityName, rating, comment } = review;
  const axiosSecure = useAxiosSecure();
   console.log(review)
    const handleDelete = async () => {
      try {
        await axiosSecure.delete(`/reviews/${_id}`);
        toast.success("Review deleted successfully!");
        refetch(); // refetch the data after deletion
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete review");
    }
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* Reviewer Name */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {studentName}
      </td>

      {/* Reviewer Email */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {studentEmail}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {universityName}
      </td>

      {/* Review (Rating + Comment) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div>
          <p>
            <strong>Rating:</strong> {rating} / 5
          </p>
          <p>
            <strong>Comment:</strong> {comment}
          </p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
                onClick={handleDelete}
        className="btn btn-xs bg-red-500 text-white">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AllreviewsDataRows;
