import React from 'react';
import { useNavigate } from 'react-router-dom';


const AdminManageDataRows = ({ scholarship, onDelete, isDark }) => {
  const { _id, city, applicationFees, country, universityName } = scholarship;
  const navigate = useNavigate();

  // UPDATE FUNCTION (just navigate to the update page)
  const handleUpdate = () => {
  navigate(`/dashboard/updatescholarship/${_id}`);
};


  return (
    <tr className={`border-b transition-colors duration-200 ${
      isDark 
        ? 'border-gray-600 hover:bg-gray-700 text-gray-200' 
        : 'border-gray-200 hover:bg-gray-50 text-gray-800'
    }`}>
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        {universityName}
      </td>
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        {country}, {city}
      </td>
      <td className={`px-5 py-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        ${applicationFees}
      </td>
      <td className="px-5 py-3 space-x-2">
        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          className={`px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${
            isDark
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          Update
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={onDelete}
          className={`px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 ${
            isDark
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          Delete
        </button>

      </td>
    </tr>
  );
};

export default AdminManageDataRows;


