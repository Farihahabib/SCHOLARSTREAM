import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminManageDataRows = ({ scholarship, onDelete }) => {
  const { _id, city, applicationFees, country, universityName } = scholarship;
  const navigate = useNavigate();

  // DELETE FUNCTION
  const handleDelete = async () => {
   
        await axios.delete(`${import.meta.env.VITE_API_URL}/scholarships/${_id}`);
        toast.success('Scholarship deleted successfully');
        if (onDelete) onDelete(_id); 
  };

  // UPDATE FUNCTION (just navigate to the update page)
  const handleUpdate = () => {
  navigate(`/dashboard/updatescholarship/${_id}`);
};


  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 my-3">
      <td>{universityName}</td>
      <td>{country}, {city}</td>
      <td>${applicationFees}</td>
      <td className="space-x-2">
        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          className="btn btn-xs bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Update
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AdminManageDataRows;


