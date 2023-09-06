import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';

const EditProfile = () => {
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {user,  authToken } = useContext(AuthContext);

  const {
    register, isLoading , handleSubmit, reset, formState: { errors }, getValues
  } = useForm()


  const onSubmit = handleSubmit((formData) => {
    editProfile.mutate(formData);
    reset();
  })

  const editProfile = useMutation({
    mutationFn: (formData) => {
        return axios.post(`${import.meta.env.VITE_API_URL}/edit_profile/`, formData, {
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
            'x-request-id': user.tenant.tenant_uuid
        },

            
        })
    },
    onSuccess: () => {
        queryClient.invalidateQueries(['projects'])
        navigate('/')
    },

    onError: (e) => {
        alert(e.message)
        reset();
    },
})


  return (
    <div className='px-10 h-full'>
      <h1 className='text-3xl m-5 font-bold tracking-wide'>Edit Your Profile: </h1>
      <div className=' w-full h-full px-2 py-2 flex '>
        {/* Upload image */}
        <div className='w-[40%] pb-20 rounded-xl bg-base-200  h-full  bg-base flex flex-col items-center'>
          <h1 className='text-xl font-bold text-sky-600 tracking-widest text-center mt-16 mb-5'>Profile Image</h1>

          <img src="/images/Defult.png" alt="user image" className='h-48 w-48 rounded-xl my-5' />

          <input type="file" className="file-input file-input-bordered  w-full max-w-xs rounded-xl" />
          <span className="text-xs tracking-wide font-semibold text-left w-full pl-24 my-2">* Only png/jpg &lt; 5MB</span>
        </div>

        {/* Enter User Details */}
        <div className='w-[60%] px-10  py-4 h-full bg-base-200 flex justify-center items-center rounded-xl'>
          <div className='h-full w-full bg-base-300 rounded-xl shadow-inner shadow-gray-600'>
            <h1 className='text-2xl font-bold text-sky-600 tracking-widest text-center my-8'>Enter Your Credentials</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-1 items-center text-base  py-1 px-9' action="">
              <input {...register('username')}  type="text" placeholder="Enter Username" className="input input-bordered w-full rounded-xl placeholder:tracking-widest " />
              <p className='my-1 tracking-wide text-xs   font-medium text-red-500'>{errors.username?.message}</p>
              <input {...register('email')} type="email" placeholder="Enter Email" className="input input-bordered w-full rounded-xl placeholder:tracking-widest" />
              <p className='my-1 tracking-wide text-xs  font-medium text-red-500'>{errors.email?.message}</p>
              <input {...register('oldPassword')}  type="password" placeholder="Current Password" className="input input-bordered w-full rounded-xl placeholder:tracking-widest" />
              <p className='my-1 tracking-wide text-xs  font-medium text-red-500'>{errors.oldPassword?.message}</p>
              <input {...register('newPassword')} type="password" placeholder="New Password" className="input input-bordered w-full rounded-xl placeholder:tracking-widest" />
              <p className='my-1 tracking-wide text-xs  font-medium text-red-500'>{errors.newPassword?.message}</p>
              <input {...register('confirmPassword', {
                validate : {
                  
                  validatePassword: value =>  getValues().newPassword === value   || "Passwords do not match",

                }
              })  } type="password" placeholder="Confirm Password" className="input input-bordered w-full rounded-xl placeholder:tracking-widest" />
              <p className='my-1 tracking-wide text-xs  font-medium text-red-500'>{errors.confirmPassword?.message}</p>

              <div className='w-full mt-1 flex justify-center'>
                <button type='submit' disabled={isLoading} className="btn btn-success rounded-xl btn-wide flex justify-center gap-2">
                  {
                    isLoading && <span className="loading loading-spinner loading-xs"></span>
                  }
                  <span className='text-xl font-bold text-white'>
                  Submit
                  </span>
                  
                  </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile