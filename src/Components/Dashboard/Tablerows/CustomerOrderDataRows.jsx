import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const CustomerOrderDataRows = ({ application, isDark }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    _id,
    studentName,
    studentEmail,
    universityName,
    subjectCategory,
    country,
    city,
    status,
    applicationFees,
    paymentStatus, // "paid" | "unpaid"
  } = application;
console.log(application)

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      applicationId: _id,
      studentName,
      studentEmail,
      universityName,
      rating: Number(rating),
      comment,
      applicationStatus: status,
      createdAt: new Date(),
    };
    try {
      await axiosSecure.post(`/reviews`, reviewData);
      setIsReviewOpen(false);
      setRating("");
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error("Review already added!");
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axiosSecure.delete(`/applications/${_id}`);
      
      if (response.data.success) {
        toast.success(response.data.message || "Application deleted successfully!");
        setIsDeleteOpen(false);
        // Refresh the page to update the list
        window.location.reload();
      } else {
        toast.error(response.data.message || "Failed to delete application");
        setIsDeleteOpen(false);
      }
    } catch (error) {
      console.error('Delete error:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 404) {
        toast.error("Application not found or you don't have permission to delete it");
      } else if (error.response?.status === 400) {
        toast.error("Only pending applications can be deleted");
      } else {
        toast.error("Failed to delete application. Please try again.");
      }
      
      setIsDeleteOpen(false);
    }
  };

  const handlePay = () => {
    // Navigate to payment page
    navigate(`/payment/${_id}`);
  };
  return (
    <tr className={`border-b transition-colors duration-200 ${
      isDark 
        ? 'border-gray-600/50 hover:bg-gray-700/50' 
        : 'border-gray-200 hover:bg-gray-50'
    }`}>
      {/* University Name */}
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        {universityName}
      </td>

      {/* Address */}
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        {city}, {country}
      </td>

      {/* Subject */}
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        {subjectCategory}
      </td>

      {/* Fees */}
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        ${applicationFees}
      </td>

      {/* Status */}
      <td className="px-5 py-3">
        <span
          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
            status === "approved"
              ? "bg-green-600"
              : status === "rejected"
              ? "bg-red-600"
              : "bg-yellow-600"
          }`}
        >
          {status}
        </span>
      </td>
      
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          paymentStatus === 'paid' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/80 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900/80 dark:text-red-200'
        }`}>
          {paymentStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-3 space-x-2">

        {/* DETAILS BUTTON - Always visible */}
        <button
          onClick={() => setIsDetailsOpen(true)}
          className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
        >
          Details
        </button>

        {/* DELETE BUTTON - Only for pending applications */}
        {status === "pending" && (
          <button 
            onClick={() => setIsDeleteOpen(true)}
            className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-red-500 hover:bg-red-600 text-white shadow-lg"
          >
            Delete
          </button>
        )}

        {/* PAY BUTTON - Only for pending and unpaid applications */}
        {status === "pending" && paymentStatus === "unpaid" && (
          <button 
            onClick={handlePay}
            className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-green-500 hover:bg-green-600 text-white shadow-lg"
          >
            Pay
          </button>
        )}

        {/* ADD REVIEW BUTTON - Only for completed applications */}
        {status === "Completed" && (
          <button
            onClick={() => setIsReviewOpen(true)}
            className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
          >
            Add Review
          </button>
        )}
      </td>

      {/* DETAILS MODAL */}
      {isDetailsOpen && createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setIsDetailsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className={`relative transform overflow-hidden rounded-xl shadow-2xl transition-all w-full max-w-2xl ${
                isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-bold text-2xl ${
                    isDark ? 'text-blue-400' : 'text-blue-900'
                  }`}>
                    Application Details
                  </h3>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      isDark 
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Student Information
                    </p>
                    <p className="font-semibold">{studentName}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {studentEmail}
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-purple-50 border-purple-200'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      University
                    </p>
                    <p className="font-semibold">{universityName}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {city}, {country}
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-200'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}>
                      Subject Category
                    </p>
                    <p className="font-semibold">{subjectCategory}</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${
                    isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-yellow-400' : 'text-yellow-600'
                    }`}>
                      Application Status
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        status === "approved"
                          ? "bg-green-600"
                          : status === "rejected"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  
                  <div className={`p-4 rounded-lg border md:col-span-2 ${
                    isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-indigo-50 border-indigo-200'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      Application Fees
                    </p>
                    <p className="font-bold text-2xl">${applicationFees}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3">
                  <button
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* REVIEW MODAL */}
      {isReviewOpen && createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setIsReviewOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className={`relative transform overflow-hidden rounded-lg shadow-2xl transition-all w-full max-w-md ${
              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
            }`}>
              <div className="p-6">
                <h3 className={`font-bold text-xl mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  Add Review
                </h3>

                <form onSubmit={handleReviewSubmit}>
                  {/* Rating */}
                  <div className="mb-4">
                    <label className="block mb-2 font-medium text-sm">Rating (1–5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-300 focus:border-blue-300'
                      }`}
                    />
                  </div>

                  {/* Comment */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-sm">Comment</label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows="3"
                      className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 resize-none ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-300 focus:border-blue-300'
                      }`}
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isDark
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                      onClick={() => setIsReviewOpen(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setIsDeleteOpen(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className={`relative transform overflow-hidden rounded-xl shadow-2xl transition-all w-full max-w-md ${
                isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
              }`}
            >
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
                  Delete Application
                </h3>

                <p className={`text-center mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Are you sure you want to delete your application to <strong>{universityName}</strong>? This action cannot be undone.
                </p>

                {/* Application Info */}
                <div className={`p-4 rounded-lg mb-6 border ${
                  isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className="font-semibold">{universityName}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {subjectCategory} • {city}, {country}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Application Fee: ${applicationFees}
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
                    onClick={() => setIsDeleteOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </tr>
  );
};

export default CustomerOrderDataRows;