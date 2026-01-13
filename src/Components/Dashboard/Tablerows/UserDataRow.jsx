import React, { useState, useEffect } from "react";

const UserDataRow = ({ user, onUpdateRole, onDelete }) => {
  const { _id, email, role, created_at, last_loggedIn } = user;
  const [isDark, setIsDark] = useState(false)

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

  return (
    <tr className={`border-b transition-colors duration-200 ${
      isDark 
        ? 'border-gray-600/50 hover:bg-gray-700/50' 
        : 'border-gray-200/50 hover:bg-gray-50/50'
    }`}>
      <td className={`px-5 py-5 border-b text-sm ${
        isDark 
          ? 'border-gray-600/50 bg-transparent text-gray-200' 
          : 'border-gray-200/50 bg-transparent text-gray-900'
      }`}>
        {email}
      </td>
      <td className={`px-5 py-5 border-b text-sm ${
        isDark 
          ? 'border-gray-600/50 bg-transparent text-gray-200' 
          : 'border-gray-200/50 bg-transparent text-gray-900'
      }`}>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          role === 'Admin' 
            ? 'bg-red-100 text-red-800 dark:bg-red-900/80 dark:text-red-200'
            : role === 'Moderator'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200'
            : 'bg-green-100 text-green-800 dark:bg-green-900/80 dark:text-green-200'
        }`}>
          {role}
        </span>
      </td>
      <td className={`px-5 py-5 border-b text-sm ${
        isDark 
          ? 'border-gray-600/50 bg-transparent text-gray-200' 
          : 'border-gray-200/50 bg-transparent text-gray-900'
      }`}>
        {new Date(created_at).toLocaleDateString()}
      </td>
      <td className={`px-5 py-5 border-b text-sm ${
        isDark 
          ? 'border-gray-600/50 bg-transparent text-gray-200' 
          : 'border-gray-200/50 bg-transparent text-gray-900'
      }`}>
        {new Date(last_loggedIn).toLocaleDateString()}
      </td>
      <td className={`px-5 py-5 border-b text-sm ${
        isDark 
          ? 'border-gray-600/50 bg-transparent' 
          : 'border-gray-200/50 bg-transparent'
      }`}>
        <div className="flex flex-wrap gap-2">
          {/* Promote to Admin if not already admin */}
          {role !== "Admin" && (
            <button
              className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-green-500 hover:bg-green-600 text-white shadow-lg"
              onClick={() => onUpdateRole(_id, "Admin")}
            >
              Make Admin
            </button>
          )}

          {/* Promote to Moderator if not already moderator or admin */}
          {role !== "Moderator" && role !== "Admin" && (
            <button
              className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
              onClick={() => onUpdateRole(_id, "Moderator")}
            >
              Make Moderator
            </button>
          )}

          {/* Demote to Student if not already student */}
          {role !== "Student" && (
            <button
              className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
              onClick={() => onUpdateRole(_id, "Student")}
            >
              Make Student
            </button>
          )}

          {/* Delete User */}
          <button
            className="px-3 py-1 text-xs rounded-lg font-medium transition-all duration-200 bg-red-500 hover:bg-red-600 text-white shadow-lg"
            onClick={() => onDelete(_id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserDataRow;


