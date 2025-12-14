import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const CustomerOrderDataRows = ({ application }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
 const axiosSecure = useAxiosSecure()

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
    const result = await axiosSecure.post(
      `/reviews`,
      reviewData
    );

    setIsReviewOpen(false);
    setRating("");
    setComment("");
    toast.success("Review submitted successfully!");
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 400) {
      toast.error(  "Review already added!");
    } else {
      toast.error("Failed to submit review. Please try again.");
    }
  }
  }
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* University Name */}
      <td>{universityName}</td>

      {/* Address */}
      <td>{city}, {country}</td>

      {/* Subject */}
      <td>{subjectCategory}</td>

      {/* Fees */}
      <td>${applicationFees}</td>

      {/* Status */}
      <td>
        <span
          className={`px-3 py-1 rounded-full text-white ${
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
      <td>{paymentStatus}</td>

      {/* Actions */}
      <td className="space-x-2">

        {/* DETAILS */}
        <button
          onClick={() => setIsDetailsOpen(true)}
          className="btn btn-xs bg-blue-500 text-white"
        >
          Details
        </button>

        {/* EDIT */}
        {status === "pending" && (
          <button className="btn btn-xs bg-indigo-500 text-white">
            Edit
          </button>
        )}

        {/* PAY */}
        {status === "pending" && paymentStatus === "unpaid" && (
          <button className="btn btn-xs bg-green-500 text-white">
            Pay
          </button>
        )}

        {/* DELETE */}
        {status === "pending" && (
          <>
            <button
              className="btn btn-xs bg-red-500 text-white"
            >
              Delete
            </button>
      
          </>
        )}

        {/* ADD REVIEW */}
        {status === "Completed" && (
          <button
            onClick={() => setIsReviewOpen(true)}
            className="btn btn-xs bg-yellow-500 text-white"
          >
            Add Review
          </button>
        )}
      </td>

      {/* DETAILS MODAL */}
      {isDetailsOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Application Details</h3>
            <p><strong>StudentEmail:</strong>{studentEmail}</p>
            <p><strong>StudentName:</strong>{studentName}</p>
            <p><strong>University:</strong> {universityName}</p>
            <p><strong>Subject:</strong> {subjectCategory}</p>
            <p><strong>Location:</strong> {city}, {country}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Fees:</strong> ${applicationFees}</p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* REVIEW MODAL */}
      {isReviewOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Add Review</h3>

           <form onSubmit={handleReviewSubmit}>
  {/* Rating */}
  <div className="mb-3">
    <label className="block mb-1">Rating (1–5)</label>
    <input
      type="number"
      min="1"
      max="5"
      required
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="input input-bordered w-full"
    />
  </div>

  {/* Comment */}
  <div className="mb-3">
    <label className="block mb-1">Comment</label>
    <textarea
      required
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="textarea textarea-bordered w-full"
    />
  </div>

  <div className="modal-action">
    <button
      type="button"
      className="btn"
      onClick={() => setIsReviewOpen(false)}
    >
      Cancel
    </button>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </div>
</form>

          </div>
        </dialog>
      )}
    </tr>
  );
};

export default CustomerOrderDataRows;