import { Outlet } from 'react-router'
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'
import { useState, useEffect } from 'react'

const DashboardLayout = () => {
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
    <div className={`relative min-h-screen md:flex transition-colors duration-300 ${
      isDark ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1 md:ml-64'>
        <div className={`p-5 min-h-screen transition-all duration-300 ${
          isDark 
            ? 'bg-linear-to-br from-gray-900 via-blue-900 to-gray-900' 
            : 'bg-linear-to-br from-blue-900 via-indigo-900 to-purple-900'
        }`}>
          {/* Content wrapper with semi-transparent background for better readability */}
          <div className={`min-h-full rounded-lg transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-800/30 backdrop-blur-sm' 
              : 'bg-white/10 backdrop-blur-sm'
          }`}>
            <div className="p-6">
              {/* Outlet for dynamic contents */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout