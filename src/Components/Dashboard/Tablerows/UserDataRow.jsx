import React from "react";

const UserDataRow = ({ user, onUpdateRole, onDelete }) => {
  const { _id, email, role, created_at, last_loggedIn } = user;

  return (
    <tr>
      <td className="border px-2 py-1">{email}</td>
      <td className="border px-2 py-1">{role}</td>
      <td className="border px-2 py-1">{new Date(created_at).toLocaleString()}</td>
      <td className="border px-2 py-1">{new Date(last_loggedIn).toLocaleString()}</td>
      <td className="border px-2 py-1 space-x-2">
        {/* Promote to Admin if not already admin */}
        {role !== "Admin" && (
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => onUpdateRole(_id, "Admin")}
          >
            Promote to Admin
          </button>
        )}

        {/* Demote to Moderator if not already moderator */}
        {role !== "Moderator" && role !== "Admin" && (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => onUpdateRole(_id, "Moderator")}
          >
            Promote to Moderator
          </button>
        )}

        {role !== "Student" && (
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded"
            onClick={() => onUpdateRole(_id, "Student")}
          >
            Demote to Student
          </button>
        )}

        {/* Delete User */}
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => onDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserDataRow;


