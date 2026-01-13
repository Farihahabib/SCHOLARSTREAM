import axios from "axios";
import DetailsModal from "../../Modal/DetailsModal"
import FeedbackModal from "../../Modal/FeedbackModal"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const ModeratorOrderDataRow = ({ application }) => {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { _id, studentName, studentEmail, universityName } = application
  const [currentStatus, setCurrentStatus] = useState('pending')
  const axiosSecure = useAxiosSecure();

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

  console.log(application);

  const handleStatusUpdate = async (newStatus) => {
    await axiosSecure.patch(
      `/applications/status/${_id}`,
      { status: newStatus }
    )

    setCurrentStatus(newStatus);
    toast.success('Status updated successfully');
  }

  const handleCancel = async () => {
    await axiosSecure.patch(`/applications/status/${_id}`, {
      status: "rejected",
    });
    setCurrentStatus("rejected");
    toast.success("Application rejected successfully!");
  };

  return (
    <>
      <tr className={`border-b transition-colors duration-200 ${
        isDark 
          ? 'border-gray-600 hover:bg-gray-700' 
          : 'border-gray-200 hover:bg-gray-50'
      }`}>
        <td className={`px-5 py-5 border-b text-sm ${
          isDark 
            ? 'border-gray-600 bg-gray-800 text-gray-200' 
            : 'border-gray-200 bg-white text-gray-900'
        }`}>
          {studentName}
        </td>
        <td className={`px-5 py-5 border-b text-sm ${
          isDark 
            ? 'border-gray-600 bg-gray-800 text-gray-200' 
            : 'border-gray-200 bg-white text-gray-900'
        }`}>
          {studentEmail}
        </td>
        <td className={`px-5 py-5 border-b text-sm ${
          isDark 
            ? 'border-gray-600 bg-gray-800 text-gray-200' 
            : 'border-gray-200 bg-white text-gray-900'
        }`}>
          {universityName}
        </td>
        <td className={`px-5 py-5 border-b text-sm ${
          isDark 
            ? 'border-gray-600 bg-gray-800 text-gray-200' 
            : 'border-gray-200 bg-white text-gray-900'
        }`}>
          {application.status || 'Pending'}
        </td>
        <td className={`px-5 py-5 border-b text-sm ${
          isDark 
            ? 'border-gray-600 bg-gray-800 text-gray-200' 
            : 'border-gray-200 bg-white text-gray-900'
        }`}>
          {application.paymentStatus || 'Pending'}
        </td>
        <td className={`px-5 py-5 border-b text-sm ${
          isDark 
            ? 'border-gray-600 bg-gray-800' 
            : 'border-gray-200 bg-white'
        }`}>
          <div className="flex gap-2 flex-wrap">
            {/* Details */}
            <button
              onClick={() => setDetailsOpen(true)}
              className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Details
            </button>

            {/* Feedback */}
            <button
              onClick={() => setFeedbackOpen(true)}
              className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-purple-500 hover:bg-purple-600 text-white"
            >
              Feedback
            </button>

            {/* Status */}
            <select
              value={currentStatus}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className={`px-2 py-1 text-xs border rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'border-gray-600 bg-gray-700 text-gray-200' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Cancel */}
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>

      {/* MODALS (outside tr) */}
      <DetailsModal
        isOpen={detailsOpen}
        closeModal={() => setDetailsOpen(false)}
        data={application}
      />

      <FeedbackModal
        isOpen={feedbackOpen}
        closeModal={() => setFeedbackOpen(false)}
        applicationId={_id}
      />
    </>
  )
}

export default ModeratorOrderDataRow