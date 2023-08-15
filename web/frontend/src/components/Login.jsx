import React, { useContext } from 'react'
import {useForm} from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Login = () => {

  const {user, loginUser} = useContext(AuthContext)


  if(user) return <Navigate to='/' replace />

  const {
    register, handleSubmit, reset, setError, formState: { errors }
  } = useForm()


  const onSubmit = handleSubmit((formData) => {
    // console.log(formData);
    loginUser(formData)

  })


  return (
    <form onSubmit={onSubmit} className='h-screen w-screen  flex justify-center items-center'>
        <div className= 'h-full w-full  lg:w-[30%] lg:h-[70%]  shadow-inner bg-green-950 shadow-green-700 form-control rounded-lg flex justify-center flex-col p-10 gap-1'>
        {/* <h1 className='text-4xl text-slate-500 text-center font-bold mb-10 tracking-widest '>Login</h1> */}
        <img src="/images/logo.png" alt="logo" className='w-32 mx-auto my-5 object-contain '/>
        <label htmlFor="username" className="label"> Username: 
        </label>
        <input {...register('username')} type="text" placeholder="Enter Username" id="username" className="input py-2 px-5 outline-none  focus:border-green-600 rounded-xl w-full max-w-full" />
        <p className='m-2 tracking-wide text-base font-baloo font-semibold text-red-800'>{errors.username?.message}</p>
        <label htmlFor="username" className="label"> Password: 
        </label>
        <input {...register('password')} type="password" placeholder="Enter Passowrd" id="password" className="input py-2 px-5 outline-none focus:border-green-600 rounded-xl w-full max-w-full" />
        <p className='m-2 tracking-wide text-base font-baloo font-semibold text-red-800'>{errors.password?.message}</p>
        <button type='submit' className='btn mt-5 tracking-wider text-green-950 font-bold text-lg btn-success rounded-xl w-full'>
            Login
        </button>

        </div>

    </form>
  )
}

export default Login