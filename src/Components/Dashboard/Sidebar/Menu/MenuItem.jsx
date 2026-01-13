/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router'
import { useState, useEffect } from 'react'

const MenuItem = ({ label, address, icon: Icon }) => {
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

  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 transition-all duration-300 transform rounded-lg ${
          isActive 
            ? isDark 
              ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
              : 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
            : isDark
              ? 'text-gray-300 hover:bg-linear-to-r hover:from-blue-800/30 hover:to-purple-800/30 hover:text-blue-200 hover:shadow-md'
              : 'text-gray-600 hover:bg-linear-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 hover:shadow-md'
        }`
      }
    >
      <Icon className='w-5 h-5' />
      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem