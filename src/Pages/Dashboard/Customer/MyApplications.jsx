import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import CustomerOrderDataRows from "../../../Components/Dashboard/Tablerows/CustomerOrderDataRows";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSequire";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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
  const {
    data: applications = [],
    isLoading,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-applications/` );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className={`text-2xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            My Applications
          </h2>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 ">
            <div className={` min-w-full shadow-lg rounded-lg overflow-hidden ${
              isDark ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white'
            }`}>
             <table className="min-w-full leading-normal ">

                <thead>
                  <tr>
                    <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                       University Name
                    </th>

                    <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                 University Address
                    </th>
                    <th className={`px-5 w-40 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                 Subject Category
                    </th>

                    <th className={`px-5 w-32 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                      Application Fees
                    </th>

                    <th className={`px-5 w-28 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                      Status
                    </th>
                    <th className={`px-5 w-28 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                     Payment Status
                    </th>

                    <th className={`px-5 py-3 w-28 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700/80 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className={isDark ? 'bg-gray-800/60' : 'bg-white'}>
                  {applications.map((application) => (
                    <CustomerOrderDataRows
                      key={application._id}
                      application={application}
                      isDark={isDark}
                    />
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyApplications;

