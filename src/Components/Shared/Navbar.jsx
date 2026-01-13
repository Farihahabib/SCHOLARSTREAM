
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import avatarImg from '../../assets/Placeholder.png'
import logo from '/logo.png'

import Container from './Container'
import useAuth from '../../Hooks/useAuth'
import MyLink from './MyLink'
import { ThemeToggle } from '../theme-toggle'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
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
  <div className={`fixed w-full z-10 shadow-sm ${isDark ? 'navbar-dark' : 'navbar-light'}`}>
     <div className='py-4 '> 
      <Container> 
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
           {/* Logo */} 
           <Link to='/'>
             <div className='flex justify-center items-center'>
               <img src={logo} alt='logo' width='40' height='' className='rounded-xl' /> 
               <p className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-950'}`}>ScholarsStream</p> 
             </div> 
           </Link>
            
            <div className='hidden md:flex gap-2'>
               <MyLink to='/' className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}> Home </MyLink> 
               <MyLink to='/allscholarships' className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}> All Scholarships</MyLink>
               <MyLink to='/aboutus' className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}> About Us</MyLink>
               <MyLink to='/contactus' className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}> Contact</MyLink>
               <MyLink to='/terms-and-conditions' className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}> Terms</MyLink>
               <MyLink to='/privacy-policy' className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}> Privacy</MyLink>
               {/* Show Dashboard only when user is logged in */}
               {user && (
                 <MyLink to='/dashboard' className={`${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}> Dashboard</MyLink>
               )}
            </div> 
             
             {/* Theme Toggle and Dropdown Menu */}
              <div className='relative'>
                 <div className='flex flex-row items-center gap-3'>
                   {/* Theme Toggle */}
                   <ThemeToggle />
                   
                   {/* Dropdown btn */} 
                   <div onClick={() => setIsOpen(!isOpen)} className={`p-4 md:py-1 md:px-2 border ${isDark ? 'border-gray-700 bg-gray-800 hover:shadow-gray-700' : 'border-neutral-200 bg-white'} flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition`} > 
                    <AiOutlineMenu className={isDark ? 'text-gray-300' : 'text-gray-700'} />
                     <div className='hidden md:block'> 
                      {/* Avatar */} 
                      <img className='rounded-full' referrerPolicy='no-referrer' src={user && user.photoURL ? user.photoURL : avatarImg} alt='profile' height='30' width='30' /> 
                      </div> 
                      </div> 
                      </div>
                       {isOpen && ( 
                        <div className={`absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} border overflow-hidden right-0 top-12 text-sm`}> 
                        <div className='flex flex-col cursor-pointer'> 
                            <div className='md:hidden flex flex-col'>
                              <MyLink to='/' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'}`}> Home </MyLink> 
                              <MyLink to='/allscholarships' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'}`}> All Scholarships </MyLink>
                              <MyLink to='/aboutus' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'}`}> About Us </MyLink>
                              <MyLink to='/contactus' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'}`}> Contact </MyLink>
                              <MyLink to='/terms-and-conditions' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'}`}> Terms & Conditions </MyLink>
                              <MyLink to='/privacy-policy' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'}`}> Privacy Policy </MyLink>
                              {/* Show Dashboard only when user is logged in */}
                              {user && (
                                <MyLink to='/dashboard' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'}`}> Dashboard </MyLink>
                              )}
                            </div> 
                          {user ? ( 
                            <> 
                              <Link to='/dashboard' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'} transition font-semibold`} > Dashboard </Link> 
                              <div onClick={logOut} className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'} transition font-semibold cursor-pointer`} > Logout </div> 
                            </> 
                          ) : ( 
                            <> 
                              <Link to='/login' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'} transition font-semibold`} > Login </Link> 
                              <Link to='/signup' className={`px-4 py-3 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-neutral-100 text-gray-700'} transition font-semibold`} > Sign Up </Link> 
                            </> 
                          )}
                        </div>
                        </div> 
                       )} 
                       </div> 
                       </div> 
                       </Container> 
                       </div> 
                       </div>
  )
}

export default Navbar