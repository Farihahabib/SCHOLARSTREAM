import axios from 'axios'
import SellerOrderDataRow from '../../../Components/Dashboard/Tablerows/ModeratorOrderDataRow'
import useAuth from '../../../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import ModeratorOrderDataRow from '../../../Components/Dashboard/Tablerows/ModeratorOrderDataRow'

const ManageApplys = () => {
//      const {data: scholarships=[],isLoading,isError} =useQuery({
//       queryKey: ['scholarships'],
//       queryFn: async () =>{
// const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships` )
// return result.data
//       } 
//     })
  const{user}=useAuth()
    const {data:applications=[],isLoading,isError} =useQuery({
      queryKey: ['applications'],
      queryFn: async () =>{
     const result = await axios(`${import.meta.env.VITE_API_URL}/applications` )
     console.log(result.data)
      return result.data
      }
  })
  if(isLoading) return <LoadingSpinner />
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Applicant Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Applicant Email
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      University Name
                    </th>
                
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Application feedback
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Payment Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
               
 {applications && applications.length > 0 ?(

  <tbody>
 {applications.map((application) => (
                   <ModeratorOrderDataRow
                      key={application._id}
                    application={application}  />))}
          </tbody>): null}

             
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageApplys