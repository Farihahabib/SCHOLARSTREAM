import { Moon, Sun, Monitor } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('scholarstream-theme') || 'light';
    }
    return 'light';
  })
  const [actualTheme, setActualTheme] = useState('light')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Track actual applied theme
  useEffect(() => {
    const checkActualTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setActualTheme(isDark ? 'dark' : 'light')
    }
    
    checkActualTheme()
    
    // Create observer to watch for class changes
    const observer = new MutationObserver(checkActualTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      root.setAttribute('data-theme', systemTheme)
      setActualTheme(systemTheme)
    } else {
      root.classList.add(theme)
      root.setAttribute('data-theme', theme)
      setActualTheme(theme)
    }
    
    localStorage.setItem('scholarstream-theme', theme)
  }, [theme])

  // Listen for system theme changes when using system theme
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
        root.setAttribute('data-theme', systemTheme)
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleThemeChange = (newTheme) => {
    console.log('Changing theme to:', newTheme)
    setTheme(newTheme)
    setIsOpen(false)
  }

  const getCurrentIcon = () => {
    if (theme === 'system') {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return isSystemDark ? 
        <Moon className="h-5 w-5 text-blue-400" /> : 
        <Sun className="h-5 w-5 text-yellow-500" />
    }
    if (theme === 'dark') return <Moon className="h-5 w-5 text-blue-400" />
    return <Sun className="h-5 w-5 text-yellow-500" />
  }

  const getActualTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {getCurrentIcon()}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-12 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <Sun className="h-4 w-4" />
            Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <Moon className="h-4 w-4" />
            Dark
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 ${theme === 'system' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          >
            <Monitor className="h-4 w-4" />
            System
          </button>
        </div>
      )}
    </div>
  )
}