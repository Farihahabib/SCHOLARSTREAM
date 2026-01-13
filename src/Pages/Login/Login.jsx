import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../Hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveorUpdateUser } from '../../utils'
import { useState, useEffect } from 'react'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isDark, setIsDark] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  const from = location.state || '/'

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

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      //User Login
 const {user} = await signIn(email, password)
 await saveorUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
 })

      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
 const {user}= await signInWithGoogle()
        await saveorUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
    }
  }

  // Handle Password Reset
  const handlePasswordReset = async (e) => {
    e.preventDefault()
    if (!resetEmail) {
      toast.error('Please enter your email address')
      return
    }

    try {
      setResetLoading(true)
      await resetPassword(resetEmail)
      toast.success('Password reset email sent! Check your inbox.')
      setShowForgotPassword(false)
      setResetEmail('')
    } catch (err) {
      console.log(err)
      toast.error(err?.message || 'Failed to send reset email')
    } finally {
      setResetLoading(false)
    }
  }
  return (
    <div className={`flex justify-center items-center min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className={`flex flex-col max-w-md p-6 rounded-md sm:p-10 shadow-lg transition-colors duration-300 ${
        isDark ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}>
        <div className='mb-8 text-center'>
          <h1 className={`my-3 text-4xl font-bold bg-gradient-to-r ${
            isDark 
              ? 'from-blue-400 to-purple-400 bg-clip-text text-transparent' 
              : 'from-blue-600 to-purple-600 bg-clip-text text-transparent'
          }`}>Log In</h1>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className={`block mb-2 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                    : 'border-gray-300 bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                }`}
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className={`text-sm mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                    : 'border-gray-300 bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                }`}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/25'
              }`}
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button 
            onClick={() => setShowForgotPassword(true)}
            className={`text-center hover:underline cursor-pointer transition-all duration-200 font-medium ${
              isDark ? 'text-blue-400 hover:text-purple-400' : 'text-blue-600 hover:text-purple-600'
            }`}
          >
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className={`flex-1 h-px sm:w-16 ${
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}></div>
          <p className={`px-3 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Or continue with
          </p>
          <div className={`flex-1 h-px sm:w-16 ${
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className={`flex justify-center items-center space-x-2 border m-3 p-3 px-4 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
            isDark 
              ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200 shadow-gray-700/25' 
              : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-gray-300/25'
          }`}
        >
          <FcGoogle size={24} />
          <p className="font-medium">Continue with Google</p>
        </div>
        <p className={`px-6 text-sm text-center ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/signup'
            className={`hover:underline transition-all duration-200 font-semibold ${
              isDark ? 'text-blue-400 hover:text-purple-400' : 'text-blue-600 hover:text-purple-600'
            }`}
          >
            Sign up
          </Link>
          .
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md p-6 rounded-lg shadow-xl transition-colors duration-300 ${
            isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
          }`}>
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-blue-400' : 'text-blue-900'
              }`}>
                Reset Password
              </h2>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label htmlFor="resetEmail" className={`block mb-2 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                      : 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                  }`}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false)
                    setResetEmail('')
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    isDark 
                      ? 'bg-gray-600 hover:bg-gray-700 text-gray-200 shadow-gray-600/25' 
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-700 shadow-gray-300/25'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:from-blue-800 disabled:to-purple-800 shadow-blue-500/25' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:from-blue-400 disabled:to-purple-400 shadow-blue-500/25'
                  }`}
                >
                  {resetLoading ? (
                    <TbFidgetSpinner className='animate-spin mx-auto' />
                  ) : (
                    'Send Reset Email'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
