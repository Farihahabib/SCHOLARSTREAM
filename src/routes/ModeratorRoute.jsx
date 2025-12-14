import { Navigate } from 'react-router'
import useRole from '../Hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'


const ModeratorRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'Moderator') return children
  return <Navigate to='/' replace='true' />
}

export default ModeratorRoute