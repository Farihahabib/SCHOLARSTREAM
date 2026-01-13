import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../Hooks/useAuth'
import logo from '../../../assets/logo-flat.png'
// Icons
import { GrLogout } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'

// User Menu
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import StudentsMenu from './Menu/StudentsMenu'
import useRole from '../../../Hooks/useRole'
import ModeratorMenu from './Menu/ModeratorMenu'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isRoleLoading] = useRole();
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

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className={`flex justify-between md:hidden transition-all duration-300 ${
        isDark 
          ? 'bg-linear-to-r from-slate-800 to-gray-800 text-gray-200' 
          : 'bg-linear-to-r from-blue-50 to-indigo-50 text-gray-800'
      }`}>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' className='rounded-xl' />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`mobile-menu-button p-4 focus:outline-none transition-all duration-200 rounded-lg ${
            isDark 
              ? 'focus:bg-gradient-to-r focus:from-gray-700 focus:to-slate-700 hover:bg-gray-700/50' 
              : 'focus:bg-gradient-to-r focus:from-blue-100 focus:to-indigo-100 hover:bg-blue-50'
          }`}
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out ${
          isActive && '-translate-x-full'
        } md:translate-x-0 ${
          isDark 
            ? 'bg-linear-to-b from-slate-800 via-gray-800 to-slate-900' 
            : 'bg-linear-to-b from-blue-50 via-indigo-50 to-purple-50'
        }`}
      >
        {/* Subtle overlay for depth */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10' 
            : 'bg-gradient-to-br from-white/30 via-transparent to-blue-100/30'
        }`} />
        
        <div className='flex flex-col h-full relative z-10'>
          <div>
            {/* Logo */}
            <div className={`w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-gray-700/80 to-slate-700/80 shadow-gray-900/50 backdrop-blur-sm border border-gray-600/30' 
                : 'bg-gradient-to-r from-white/80 to-blue-50/80 shadow-blue-200/50 backdrop-blur-sm border border-blue-100/50'
            }`}>
              <Link to='/' className='flex gap-2 justify-center items-center'>
                <img src='/logo.png' alt='logo' width='50' height='50' className='h-full w-50% rounded-5xl' />
                <span className={`font-bold ${
                  isDark ? 'text-blue-400' : 'text-blue-900'
                }`}>ScholarStream</span>
              </Link>
            </div>
          </div>
          {/* Top Content */}
          <div className={`border-b-4 transition-colors duration-300 ${
            isDark ? 'border-gray-600/50' : 'border-blue-200/50'
          }`}>
            <hr className={`${isDark ? 'border-gray-600/50' : 'border-blue-200/50'} my-4`} />

            <MenuItem
              icon={CgProfile}
              label='Profile'
              address='/dashboard/profile'
            />
            <button
              onClick={logOut}
              className={`flex cursor-pointer w-full items-center px-4 py-2 mt-5 transition-all duration-300 transform rounded-lg ${
                isDark 
                  ? 'text-gray-300 hover:bg-gradient-to-r hover:from-red-900/30 hover:to-red-800/30 hover:text-red-200 hover:shadow-lg' 
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 hover:shadow-md'
              }`}
            >
              <GrLogout className='w-5 h-5' />
              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
          {/* Middle Content */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/*  Menu Items */}
            <nav>
              {/* Debug info - remove this after fixing */}
              {process.env.NODE_ENV === 'development' && (
                <div className={`p-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Role: {role || 'No role'} | Loading: {isRoleLoading ? 'Yes' : 'No'}
                </div>
              )}
              
              {/* Show loading state */}
              {isRoleLoading && (
                <div className={`p-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Loading menu...
                </div>
              )}
              
              {/* Role-Based Menu */}
              {!isRoleLoading && (role === 'Admin' || role === 'admin') && <AdminMenu />}   
              {!isRoleLoading && (role === 'Moderator' || role === 'moderator') && <ModeratorMenu />}   
              {!isRoleLoading && (role === 'Student' || role === 'student' || !role) && <StudentsMenu />}   
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

