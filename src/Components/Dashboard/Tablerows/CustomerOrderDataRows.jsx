const CustomerOrderDataRows = ({ application }) => {
  const {
    universityName,
 subjectCategory
,            // subject category
    country,
    city,
    status,
    applicationFees,
  
  } = application;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 my-3">
      {/* Scholarship / University Name */}
      <td>{universityName}</td>

      {/* University Address */}
      <td className="flex flex-col ">{city}, {country}</td>

      {/* Subject Category */}
      <td>{subjectCategory
}</td>

      {/* Application Fees */}
      <td>${applicationFees}</td>

      {/* Status */}
      <td>
        <span
          className={`px-3 py-1 rounded-full text-white ${
            status === "Approved"
              ? "bg-green-600"
              : status === "Rejected"
              ? "bg-red-600"
              : "bg-yellow-600"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

  {/* DETAILS BUTTON — always visible */}
  <button
    onClick={() => handleOpenDetails(application)}
    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
  >
    Details
  </button>

  {/* EDIT BUTTON — only if status === "pending" */}
  {application.status === "pending" && (
    <button
      onClick={() => handleEdit(application)}
      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
    >
      Edit
    </button>
  )}

  {/* PAY BUTTON — only if pending AND payment === unpaid */}
  {application.status === "pending" && application.paymentStatus === "unpaid" && (
    <button
      onClick={() => handlePayment(application)}
      className="bg-purple-600 text-white px-3 py-1 rounded mr-2"
    >
      Pay
    </button>
  )}

  {/* DELETE BUTTON — only if pending */}
  {application.status === "pending" && (
    <button
      onClick={() => handleDelete(application._id)}
      className="bg-red-600 text-white px-3 py-1 rounded mr-2"
    >
      Delete
    </button>
  )}

  {/* ADD REVIEW — only if completed */}
  {application.status === "completed" && (
    <button
      onClick={() => handleOpenReviewModal(application)}
      className="bg-yellow-600 text-white px-3 py-1 rounded"
    >
      Add Review
    </button>
  )}

</td>

    </tr>
  );
};

export default CustomerOrderDataRows;
