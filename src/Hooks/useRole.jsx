
import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSequire'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      try {
        const result = await axiosSecure(`/user/role/`)
        console.log('Role API Response:', result.data)
        
        // Return the role or default to 'Student' if no role is found
        return result.data?.role || 'Student'
      } catch (error) {
        console.error('Error fetching user role:', error)
        // Return default role if there's an error
        return 'Student'
      }
    },
  })

  return [role, isRoleLoading]
}

export default useRole