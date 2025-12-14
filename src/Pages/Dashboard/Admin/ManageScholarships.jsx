import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminManageDataRows from '../../../Components/Dashboard/Tablerows/AdminManageDataRows';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';

const ManageScholarships = () => {
const queryClient = useQueryClient();
const axiosSecure = useAxiosSecure()
const { data = {}, isLoading } = useQuery({
  queryKey: ['scholarships'],
  queryFn: async () => {
    const res = await axiosSecure.get(`/scholarships`);
    return res.data;
  },
});

const scholarships = data.scholarships || [];
//delete mutation
const deleteMutation = useMutation({
  mutationFn: async (id) => {
    await axiosSecure.delete(`/scholarships/${id}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['scholarships']); // refetch list
    toast.success('Scholarship deleted successfully!');
  },
  onError: () => {
    toast.error('Failed to delete scholarship');
  },
});


        if(isLoading) return <LoadingSpinner />
    return (
    
           <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
             <table className="min-w-full leading-normal table-fixed">

                <thead>
                  <tr>
                    <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                       University Name
                    </th>

                    <th className="px-5 w-40 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal ">
                 University Address
                    </th>

                    <th className="px-5 w-32 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Application Fees
                    </th>

               

                    <th className="px-5 py-3 w-28 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal gap-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                     {scholarships.map((scholarship) => (
                                    <AdminManageDataRows
                                      key={scholarship._id}
                                      scholarship={scholarship}
                                      onDelete={() => deleteMutation.mutate(scholarship._id)}
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

export default ManageScholarships;