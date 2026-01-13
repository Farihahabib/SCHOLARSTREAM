import useAuth from '../../../Hooks/useAuth'
import useRole from '../../../Hooks/useRole';
import coverImg from '../../../assets/logo-flat.png'
import { useState, useEffect } from 'react'

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole()
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

  console.log(role, isRoleLoading)

  return (
    <div className={`flex justify-center items-center h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`shadow-lg rounded-2xl md:w-3/5 lg:w-3/5 mt-9 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full mb-4 rounded-t-lg h-56 object-cover'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24 border-4 border-white shadow-lg'
            />
          </a>

          <p className={`p-2 px-4 text-xs text-white rounded-full mt-4 font-semibold ${
            isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>
            {role}
          </p>
          <p className={`mt-2 text-xl font-medium ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            User ID: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-col items-center justify-between text-sm space-y-4'>
              <div className='flex flex-col text-center'>
                <span className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Name
                </span>
                <span className={`font-bold text-lg ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {user?.displayName}
                </span>
              </div>
              <div className='flex flex-col text-center'>
                <span className={`text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Email
                </span>
                <span className={`font-bold text-lg ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
