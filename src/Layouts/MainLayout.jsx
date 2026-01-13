import { Outlet } from 'react-router'
import Navbar from '../Components/Shared/Navbar'
import Footer from '../Components/Shared/Footer'
import { useState, useEffect } from 'react'

const MainLayout = () => {
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar />
      <div className={`pt-24 min-h-[calc(100vh-68px)] transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout