import { useContext } from 'react'
import {useForm} from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Login = () => {

  const {user, loginUser} = useContext(AuthContext)

  const {
    register, handleSubmit,  formState: { errors }
  } = useForm()

  if(user) return <Navigate to='/' replace />



  const onSubmit = handleSubmit((formData) => {
    // console.log(formData);
    loginUser(formData)

  })


  return (
    <form onSubmit={onSubmit} className='h-screen w-screen  flex justify-center items-center '>
        <div className= 'h-[70%] w-[90%]     md:max-w-[50%] md:max-h-[70%]  lg:max-w-[30%]  shadow-inner bg-sky-950 shadow-gray-400 form-control rounded-lg flex justify-start flex-col py-10 px-10 gap-1'>
        {/* <h1 className='text-4xl text-slate-500 text-center font-bold mb-10 tracking-widest '>Login</h1> */}
        <img src="/images/logo.png" alt="logo" className='w-44 mx-auto mb-16  object-contain '/>
        <label htmlFor="username" className="label tracking-widest"> Username: 
        </label>
        <input {...register('username')} type="text" placeholder="Enter Username" id="username" className="input py-2 px-5 outline-none  focus:border-green-600 rounded-xl w-full max-w-full" />
        <p className='m-2 tracking-wide text-base font-baloo font-semibold text-red-800'>{errors.username?.message}</p>
        <label htmlFor="username" className="label tracking-widest"> Password: 
        </label>
        <input {...register('password')} type="password" placeholder="Enter Password" id="password" className="input py-2 px-5 outline-none focus:border-green-600 rounded-xl w-full max-w-full" />
        <p className='m-2 tracking-wide text-base font-baloo font-semibold text-red-800'>{errors.password?.message}</p>
        <button type='submit' className='btn mt-5 tracking-wider text-blue-950 font-bold text-lg bg-sky-600 hover:bg-sky-800 hover:text-white rounded-xl w-full'>
            Login
        </button>

        </div>

    </form>
  )
}

export default Login