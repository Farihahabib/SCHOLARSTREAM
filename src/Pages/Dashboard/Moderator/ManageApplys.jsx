import axios from 'axios'
import SellerOrderDataRow from '../../../Components/Dashboard/Tablerows/ModeratorOrderDataRow'
import useAuth from '../../../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import ModeratorOrderDataRow from '../../../Components/Dashboard/Tablerows/ModeratorOrderDataRow'
import useAxiosSecure from '../../../Hooks/useAxiosSequire'
import { useState, useEffect } from 'react'

const ManageApplys = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
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

  const { data: applications = [], isLoading, isError } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const result = await axiosSecure(`/applications`)
      console.log(result.data)
      return result.data
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className={`container mx-auto px-4 sm:px-8 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className='py-8'>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-blue-400' : 'text-blue-900'
        }`}>
          Manage Applications
        </h2>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className={`inline-block min-w-full shadow-lg rounded-lg overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className={`px-5 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    Applicant Name
                  </th>
                  <th
                    scope='col'
                    className={`px-5 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    Applicant Email
                  </th>
                  <th
                    scope='col'
                    className={`px-5 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    University Name
                  </th>
                  <th
                    scope='col'
                    className={`px-5 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    Application Feedback
                  </th>
                  <th
                    scope='col'
                    className={`px-5 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    Payment Status
                  </th>
                  <th
                    scope='col'
                    className={`px-5 py-3 border-b text-left text-sm uppercase font-semibold ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200' 
                        : 'bg-gray-50 border-gray-200 text-gray-800'
                    }`}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              {applications && applications.length > 0 ? (
                <tbody className={isDark ? 'bg-gray-800' : 'bg-white'}>
                  {applications.map((application) => (
                    <ModeratorOrderDataRow
                      key={application._id}
                      application={application}
                    />
                  ))}
                </tbody>
              ) : (
                <tbody className={isDark ? 'bg-gray-800' : 'bg-white'}>
                  <tr>
                    <td colSpan="6" className={`text-center py-8 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      No applications found.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageApplys