import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import createUrl from '../utils/createUrl';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateUser = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { user, authToken } = useContext(AuthContext);
    if (!user.is_superuser && !user.is_staff) {
        return (
            <div className='w-full flex justify-center'>
                <p className='text-center text-2xl text-error my-10 '>
                    You are not authorized to access this page.
                </p>
            </div>
        )
    }

    const {
        register, isLoading, handleSubmit, reset, formState: { errors }, getValues
    } = useForm()

    // console.log("user --> ", user)
    const onSubmit = handleSubmit((formData) => {
        const newFormData = {
            ...formData,
            'is_active': true,
            'is_staff': user.is_superuser ? true : false,
            'is_superuser': false,
            'tenant': user.is_staff ? user.tenant.id : null,
            'created_date': Date.now()
        }
        console.log(newFormData)

        createuser.mutate(newFormData)
        // editProfile.mutate(formData);
        reset();
    })

    const createUserUrl = createUrl(`${user.is_superuser ? '' : `${user.tenant.schema_name}`}`, '/signup/')

    const createuser = useMutation({
        mutationFn: (formData) => {
            console.log('muattion', formData)
            return axios.post(createUserUrl, formData, {
                headers: {
                    'Authorization': `Bearer ${authToken.access}`,
                    'x-request-id': user.tenant.tenant_uuid
                    
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['employees'])
            navigate('/manageusers')
        },

        onError: (e) => {
            alert(e.message)
            reset();
        },
    })

    return (
        <div className='px-10 h-full w-screen'>
            <h1 className='text-8xl text-gray-500 text-center font-mono font-bold tracking-tighter opacity-30 mr-5'>Create A User</h1>

            {
                createuser.isSuccess &&
                <p className='tracking-widest text-lime-600 text-2xl font-semibold text-center'>Account Created!</p>}
            {/* Enter User Details */}
            <div className=' px-10  py-4 h-full  flex justify-center items-center rounded-xl '>
                <div className='w-[60%] h-full   rounded-xl '>
                    <form onSubmit={onSubmit} className='flex flex-col gap-1 items-center text-base  py-1 px-9' action="">
                        <input {...register('name', {
                            required: "required",

                        })} type="text" placeholder="Enter Name" className="focus:border-opacity-80 focus:border-lime-600 input input-bordered w-full rounded-xl placeholder:tracking-widest " />
                        <p className='my-1 tracking-wide text-xs   font-medium text-red-500'>{errors.name?.message}</p>
                        <input {...register('username', {
                            required: "required",
                            minLength: {
                                value: 3,
                                message: "minimum number of character for username is 3"
                            },
                            pattern: {
                                value: /^\S*$/,
                                message: "Entered value cant start/end or contain  white spacing"
                            },
                        })} type="text" placeholder="Enter Username (unique and no spaces) " className="focus:border-opacity-80 focus:border-lime-600 input input-bordered w-full rounded-xl placeholder:tracking-widest " />
                        <p className='my-1 tracking-wide text-xs   font-medium text-red-500'>{errors.username?.message}</p>

                        <input {...register('password', {
                            required: "required"
                        })} type="password" placeholder="New Password" className="focus:border-lime-600 input input-bordered w-full rounded-xl placeholder:tracking-widest" />
                        <p className='my-1 tracking-wide text-xs  font-medium text-red-500'>{errors.password?.message}</p>
                        <input {...register('confirm_password', {
                            validate: {

                                validatePassword: value => getValues().password === value || "Passwords do not match",

                            }
                        })} type="confirm_password" placeholder="Confirm Password" className="focus:border-opacity-80 focus:border-lime-600 input input-bordered w-full rounded-xl placeholder:tracking-widest" />
                        <p className='my-1 tracking-wide text-xs  font-medium text-red-500'>{errors.confirm_password?.message}</p>

                        <div className='w-full mt-1 flex justify-center'>
                            <button type='submit' disabled={isLoading} className="btn bg-base-200 hover:bg-lime-900 opacity-80 rounded-xl btn-wide flex justify-center gap-2 hover:brightness-125 shadow-inner shadow-gray-200">
                                {
                                    isLoading && <span className="loading loading-spinner loading-xs"></span>
                                }
                                <span className='texl-3xl tracking-wide text-gray-300 ' >
                                    {
                                        createuser.isLoading ? (
                                            <span className="loading loading-infinity loading-lg"></span>
                                        ) : <span className='text-xl'>
                                            CREATE
                                        </span>
                                    }
                                </span>

                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser