import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../Hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { FaSpinner } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import  { Axios } from 'axios'
const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
//react hook
 const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  console.log(errors)
  const name1 = watch("name")
  console.log(name1)
  const onSubmit = async data => {
    const {name,image,email,password}= data;

    const imageFile = image[0];
const formData = new FormData()
formData.append('image',imageFile)
 try {
  //image Upload
const { data: imgbbResponse } = await Axios.post(
 `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
 formData
 )
 const imageUrl = imgbbResponse.data.url
  console.log(data)
     //2. User Registration
     const result = await createUser(email, password)

     //3. Save username & profile photo
     await updateUserProfile(
       name,
      imageUrl
    )


    navigate(from, { replace: true })
    toast.success('Signup Successful')
   } catch (err) {
    console.log(err)
     toast.error(err?.message)
   }
   }
  

  // form submit handler
  // const handleSubmit = async event => {
  //   event.preventDefault()
  //   const form = event.target
  //   const name = form.name.value
  //   const email = form.email.value
  //   const password = form.password.value

  //   try {
  //     //2. User Registration
  //     const result = await createUser(email, password)

  //     //3. Save username & profile photo
  //     await updateUserProfile(
  //       name,
  //       'https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c'
  //     )
  //     console.log(result)

  //     navigate(from, { replace: true })
  //     toast.success('Signup Successful')
  //   } catch (err) {
  //     console.log(err)
  //     toast.error(err?.message)
  //   }
  // }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle()

      navigate(from, { replace: true })
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold text-blue-900'>Sign Up</h1>
          <p className='text-sm text-blue-800'>Welcome to ScholarsStream</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter Your Name '
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-900 bg-gray-200 text-gray-900'
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
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Profile Image
              </label>
              <input
                name='image'
                type='file'
                id='image'
                accept='image/*'
                className='block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-150 file:text-blue-700
      hover:file:bg-blue-200
      bg-blue-50 border border-dashed border-blue-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-400
      py-2'
      {...register('image')}
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-900 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                {...register('email',{required: 'Email is required',
               })}
                />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
            
                autoComplete='new-password'
                id='password'
                required
                placeholder='******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-900 bg-gray-200 text-gray-900'
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
              className='btn w-full hover '
            >
              {loading ? (
                <FaSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-blue-950 text-gray-600'
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
