import React from 'react';
import { useNavigate } from 'react-router-dom';


const AdminManageDataRows = ({ scholarship, onDelete }) => {
  const { _id, city, applicationFees, country, universityName } = scholarship;
  const navigate = useNavigate();

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
  onClick={onDelete}
  className="bg-red-500 text-white px-2 py-1 rounded"
>
  Delete
</button>

      </td>
    </tr>
  );
};

export default AdminManageDataRows;


