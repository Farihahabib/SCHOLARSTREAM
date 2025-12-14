import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AdminManageDataRows from "../../../Components/Dashboard/Tablerows/AdminManageDataRows"; // Or UserDataRow
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import UserDataRow from "../../../Components/Dashboard/Tablerows/UserDataRow";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      return result.data;
    },
  });

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) =>
      axios.patch(`${import.meta.env.VITE_API_URL}/users/${id}/role`, { role }),
    onSuccess: () => {
      toast.success("Role updated!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to update role"),
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (id) => axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`),
    onSuccess: () => {
      toast.success("User deleted!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to delete user"),
  });

  const handleUpdateRole = (id, role) => updateRoleMutation.mutate({ id, role });
  const handleDelete = (id) => deleteUserMutation.mutate(id);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal table-fixed">
              <thead>
                <tr>
                  <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Email
                  </th>
                  <th className="px-5 w-32 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Role
                  </th>
                  <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Created At
                  </th>
                  <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Last Logged In
                  </th>
                  <th className="px-5 py-3 w-28 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
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


