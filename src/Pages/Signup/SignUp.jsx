import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../Hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { FaSpinner } from 'react-icons/fa'
import { useForm, Watch } from 'react-hook-form'
import { useState, useEffect } from 'react'

import { imageUpload, saveorUpdateUser } from '../../utils'
const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
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

//react hook
 const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()
  console.log(errors)
  const onSubmit = async data => {
    const {name,image,email,password}= data;

    const imageFile = image[0];
    console.log(imageFile)

 try {

  const imageURL = await imageUpload(imageFile)
     //2. User Registration
     const result = await createUser(email, password)
     console.log('usercreated',result.user.email)

      await saveorUpdateUser({ name, email, image: imageURL })
     //3. Save username & profile photo
    await updateUserProfile(name, imageURL)


    navigate(from, { replace: true })
    toast.success('Signup Successful')
   } catch (err) {
    console.log(err)
     toast.error(err?.message)
   }
   }
  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
 const {user} = await signInWithGoogle()
await saveorUpdateUser({name:user?.displayName,
  email:user?.email,
  image:user?.photoURL,
})
      navigate(from, { replace: true })
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
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
          }`}>Sign Up</h1>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-blue-700'
          }`}>Welcome to ScholarStream</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className={`block mb-2 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter Your Name '
                className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                    : 'border-gray-300 bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                }`}
                data-temp-mail-org='0'
                {...register('name',{required: 'Name is required',maxLength:{
                  value:20,
                  message:'Name must be under 20 characters'
                },})}
              />
             {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className={`block mb-2 text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Profile Image
              </label>
              <input
                name='image'
                type='file'
                id='image'
                accept='image/*'
                className={`block w-full text-sm border border-dashed rounded-md cursor-pointer py-2 transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    : 'text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-blue-50 border-blue-300 focus:ring-blue-300 focus:border-blue-400'
                }`}
                {...register('image')}
              />
              <p className={`mt-1 text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div>
              <label htmlFor='email' className={`block mb-2 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email'
                className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                    : 'border-gray-300 bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                }`}
                data-temp-mail-org='0'
                {...register('email',{required: 'Email is required',
               })}
                />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
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
                autoComplete='new-password'
                id='password'
                required
                placeholder='******'
                className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                    : 'border-gray-300 bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-300 focus:border-blue-300'
                }`}
            {...register('password',
            {required: 'Password is required',
             minLength:{
              value: 6,
              message: 'Password must be 6 character'
             },
             pattern:{
              value:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
              message: "Password must contain 1 uppercase & 1 special character "}
            })}
            />
            {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
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
                <FaSpinner className='animate-spin m-auto' />
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className={`flex-1 h-px sm:w-16 ${
            isDark ? 'bg-gray-600' : 'bg-gray-300'
          }`}></div>
          <p className={`px-3 text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Or signup with social accounts
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
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Already have an account?{' '}
          <Link
            to='/login'
            className={`hover:underline transition-colors duration-200 ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
