import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AdminManageDataRows from "../../../Components/Dashboard/Tablerows/AdminManageDataRows"; // Or UserDataRow
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import UserDataRow from "../../../Components/Dashboard/Tablerows/UserDataRow";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
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
  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users`);
      return result.data;
    },
  });

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      toast.success("Role updated!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error('Role update error:', error);
      toast.error("Failed to update role");
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      toast.success("User deleted!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error('Delete user error:', error);
      toast.error("Failed to delete user");
    },
  });

  const handleUpdateRole = (id, role) => updateRoleMutation.mutate({ id, role });
  const handleDelete = (id) => deleteUserMutation.mutate(id);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-white'
        }`}>
          Manage Users
        </h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className={`inline-block min-w-full shadow-lg rounded-lg overflow-hidden ${
            isDark ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
          }`}>
            <table className="min-w-full leading-normal table-fixed">
              <thead>
                <tr>
                  <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50/80 border-gray-200 text-gray-800'
                  }`}>
                    Email
                  </th>
                  <th className={`px-5 w-32 py-3 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50/80 border-gray-200 text-gray-800'
                  }`}>
                    Role
                  </th>
                  <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50/80 border-gray-200 text-gray-800'
                  }`}>
                    Created At
                  </th>
                  <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50/80 border-gray-200 text-gray-800'
                  }`}>
                    Last Logged In
                  </th>
                  <th className={`px-5 py-3 w-28 border-b text-left text-sm uppercase font-semibold ${
                    isDark 
                      ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                      : 'bg-gray-50/80 border-gray-200 text-gray-800'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={isDark ? 'bg-gray-800/60' : 'bg-white/80'}>
                {users.map((user) => (
                  <UserDataRow
                    key={user._id}
                    user={user}
                    onUpdateRole={handleUpdateRole}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;


