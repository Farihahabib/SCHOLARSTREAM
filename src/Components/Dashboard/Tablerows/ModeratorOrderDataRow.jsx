
import axios from "axios";
import DetailsModal from "../../Modal/DetailsModal"
import FeedbackModal from "../../Modal/FeedbackModal"
import { useState } from "react";
import toast from "react-hot-toast";


const ModeratorOrderDataRow = ({application}  ) => {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
const { _id, studentName, studentEmail, universityName } = application
const [currentStatus, setCurrentStatus] = useState(application.status)

console.log(application);

  const handleStatusUpdate = async (newStatus) => {
  await axios.patch(
  `${import.meta.env.VITE_API_URL}/applications/status/${_id}`,
  { status: newStatus }
)

    setCurrentStatus(newStatus);
    toast.success('Status updated successfully');
  }

const handleCancel = async () => {

    await axios.patch(`${import.meta.env.VITE_API_URL}/applications/status/${_id}`, {
      status: "rejected",
    });
    setCurrentStatus("rejected"); 
    toast.success("Application rejected successfully!");
};


  return (
    <>
      {/* TABLE ROW */}
      <tr>
        <td className="px-5 py-5 border-b bg-white text-sm">{studentName}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">{studentEmail}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">
          {universityName}
        </td>
        <td className="px-5 py-5 border-b bg-white text-sm">{status}</td>
        <td className="px-5 py-5 border-b bg-white text-sm">
          <div className="flex gap-2 flex-wrap">
            {/* Details */}
            <button
              onClick={() => setDetailsOpen(true)}
              className="px-3 py-1 text-xs rounded bg-blue-500 text-white"
            >
              Details
            </button>

            {/* Feedback */}
            <button
              onClick={() => setFeedbackOpen(true)}
              className="px-3 py-1 text-xs rounded bg-purple-500 text-white"
            >
              Feedback
            </button>

            {/* Status */}
         <select
  value={currentStatus}
  onChange={(e) => handleStatusUpdate(e.target.value)}
  className="px-2 py-1 text-xs border rounded"
>
  <option value="Processing">Processing</option>
  <option value="Completed">Completed</option>
</select>


            {/* Cancel */}
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs rounded bg-red-500 text-white"
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






















// import { useState } from 'react'
// import axios from 'axios'
// const ModeratorOrderDataRow = ({application,user}) => {
// const [detailsOpen, setDetailsOpen] = useState(false)
// const [feedbackOpen, setFeedbackOpen] = useState(false)

// const handleStatusUpdate = async (newStatus) => {
//   await axios.patch(`/applications/status/${_id}`, {
//     status: newStatus,
//   })
// }

// const handleCancel = async () => {
//   await axios.patch(`/applications/status/${_id}`, {
//     status: "rejected",
//   })
// }


// const {name,email}= user||{};
//   const {
//     universityName,           
//     status,
//     customer,

//   } = application||{};
//   return (
//     <tr>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 '>{name}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 '>{customer}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 '>{universityName}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 '>{status}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 '>feedback</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900 '>{status}</p>
//       </td>

//        <td className="px-5 py-5 border-b bg-white text-sm">
//     <div className="flex gap-2 flex-wrap">

//       {/* Details */}
//       <button
//         onClick={() => setDetailsOpen(true)}
//         className="px-3 py-1 text-xs rounded bg-blue-500 text-white"
//       >
//         Details
//       </button>

//       {/* Feedback */}
//       <button
//         onClick={() => setFeedbackOpen(true)}
//         className="px-3 py-1 text-xs rounded bg-purple-500 text-white"
//       >
//         Feedback
//       </button>

//       {/* Status Update */}
//       <select
//         value={status}
//         onChange={(e) => handleStatusUpdate(e.target.value)}
//         className="px-2 py-1 text-xs border rounded"
//       >
//         <option value="Processing">Processing</option>
//         <option value="Completed">Completed</option>
//       </select>

//       {/* Cancel */}
//       <button
//         onClick={() => handleCancel()}
//         className="px-3 py-1 text-xs rounded bg-red-500 text-white"
//       >
//         Cancel
//       </button>

//     </div>
//   </td>
//    <DetailsModal isOpen={detailsOpen} closeModal={() => setDetailsOpen(false)} data={application} />
//   <FeedbackModal isOpen={feedbackOpen} closeModal={() => setFeedbackOpen(false)} />
//     </tr>
//   )
// }

// export default ModeratorOrderDataRow