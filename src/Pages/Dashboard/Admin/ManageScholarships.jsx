import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import AdminManageDataRows from '../../../Components/Dashboard/Tablerows/AdminManageDataRows';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../Hooks/useAxiosSequire';

const ManageScholarships = () => {
const queryClient = useQueryClient();
const axiosSecure = useAxiosSecure()
const [isDark, setIsDark] = useState(false);

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
const { data = {}, isLoading } = useQuery({
  queryKey: ['scholarships'],
  queryFn: async () => {
    const res = await axiosSecure.get(`/scholarships`);
    return res.data;
  },
});

const scholarships = data || [];
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
            <div className={`inline-block min-w-full shadow rounded-lg overflow-hidden ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
             <table className="min-w-full leading-normal table-fixed">

                <thead>
                  <tr>
                    <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-normal ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}>
                       University Name
                    </th>

                    <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-normal ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}>
                 University Address
                    </th>

                    <th className={`px-5 w-32 py-3 border-b text-left text-sm uppercase font-normal ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}>
                      Application Fees
                    </th>

               

                    <th className={`px-5 py-3 w-28 border-b text-left text-sm uppercase font-normal gap-2 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-white border-gray-200 text-gray-800'
                    }`}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className={isDark ? 'bg-gray-800' : 'bg-white'}>
                     {scholarships.map((scholarship) => (
                                    <AdminManageDataRows
                                      key={scholarship._id}
                                      scholarship={scholarship}
                                      onDelete={() => deleteMutation.mutate(scholarship._id)}
                                      isDark={isDark}
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