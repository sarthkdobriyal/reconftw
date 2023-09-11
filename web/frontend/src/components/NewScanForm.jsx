import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import  { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthContext from '../context/AuthContext'
import createUrl from '../utils/createUrl'

const NewScanForm = () => {

    const queryClient = useQueryClient();
    const { user, authToken } = useContext(AuthContext);
    
    const {
        register, handleSubmit, reset,  formState: { errors }, setValue,
    } = useForm()
    
    const [allMode, setAllMode] = useState(false)


      const performScan = useMutation({
        mutationFn: (formData) => {
            const url = createUrl('', '/scans/new/' )
            console.log(url)
            return axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${authToken.access}`,
                    'x-request-id': user.tenant.tenant_uuid
                },

                
            })
        },
        onSuccess: () => {
            // queryClient.invalidateQueries(['projects'])
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            console.log("success")
        },

        onError: (e) => {
            console.log(e.response.data.message);
        },
    })
    
      const onSubmit = handleSubmit((formData) => {
        console.log(formData);
        const newFormData = {
            ...formData,
            user: user.id
        }
        console.log(newFormData)
        performScan.mutate(newFormData);
        reset();
      })


      const handleAllMode = () => {
        setValue('switch-recon', false)
        setValue('switch-subdomains', false)
        setValue('switch-passive', false)
        setValue('switch-web', false)
        setValue('switch-osint', false)
        setAllMode((p) => !p)
      }


  return (
    <form onSubmit={onSubmit} method="dialog" className="w-full">
                    <div className='pb-2  flex flex-col gap-2'>
                        <h2 className='text-accent'> Target Options</h2>
                        <div  className='flex items-center text-sm ml-2 gap-5'>

                            <label className="label " >
                                <input {...register('typeDomain', {required: 'Target Option is required'})} type="radio"  name="typeDomain" id="single" value='0' checked className="radio"  />
                                <span className="label-text ml-2">Single</span>
                            </label>
                            <label className="label" >
                                <input  {...register('typeDomain', {required: 'Target Option is required'})}  type="radio" name="typeDomain" id="list" value='1' className="radio" />
                                <span className="label-text ml-2">List</span>
                            </label>
                        </div>
                        <input {...register('singleDomain' , { required: "Domain is required" })} type="text" placeholder="Enter domain here..." className="input input-bordered w-full max-w-full rounded-2xl" />
                        <p className='m-2 tracking-wide text-base  font-semibold text-red-500'>{errors.domain?.message}</p>
                    </div>
                    <div className='py-2 form-control  flex flex-col gap-2'>
                        <h2 className='text-accent'> Mode Options</h2>
                        <div className='grid-cols-2 grid  text-sm ml-2   place-content-between'>
                            <label className="label cursor-pointer w-40">
                                <span className="label-text">All</span>
                                <input {...register('switch-all')} type="checkbox" className="toggle rounded-2xl"  onChange={handleAllMode}/>
                            </label>
                            <label className="label cursor-pointer w-40">
                                <span className=" ">Recon</span>
                                <input {...register('switch-recon')} type="checkbox" className="toggle rounded-2xl"  disabled={allMode} />
                            </label>
                            <label className="label cursor-pointer w-40">
                                <span className="label-text">Subdomains</span>
                                <input {...register('switch-subdomains')} type="checkbox" className="toggle rounded-2xl" disabled={allMode} />
                            </label>
                            <label className="label cursor-pointer w-40">
                                <span className="label-text">Passive</span>
                                <input {...register('switch-passive')} type="checkbox" className="toggle rounded-2xl"  disabled={allMode}/>
                            </label>
                            
                            <label className="label cursor-pointer w-40">
                                <span className="label-text">Web</span>
                                <input {...register('switch-web')} type="checkbox" className="toggle rounded-2xl" disabled={allMode} />
                            </label>
                            <label className="label cursor-pointer w-40">
                                <span className="label-text">OSINT</span>
                                <input {...register('switch-osint')} type="checkbox" className="toggle rounded-2xl" disabled={allMode} />
                            </label>
                        </div>

                    </div>
                    <div className='py-2 form-control  flex flex-col gap-2'>
                        <h2 className='text-accent'> General Options</h2>
                        <div className='grid-cols-2 grid  text-sm ml-2   place-content-between'>
                            <label className="label cursor-pointer w-40">
                                <span className=" ">Deep Scan</span>
                                <input {...register('switch-deep')} type="checkbox" className="toggle rounded-2xl"  />
                            </label>
                            <label className="label cursor-pointer w-40">
                                <span className="label-text">Axiom</span>
                                <input {...register('switch-vps')} type="checkbox" className="toggle rounded-2xl "  />
                            </label>
                        </div>
                        <div className='w-full bg-base-100 h-10 mt-4 pl-2 flex items-center rounded-md'>
                            <span className='text-accent'>Command:</span>
                            <input {...register('command')} type="text" className="h-full text-sm bg-base-100 border-none outline-none text-white pl-3  w-full max-w-full" />
                        </div>
                        <div className='w-full flex justify-end items-center gap-4 mt-2'>
                        <label htmlFor="my_modal_6" className='btn btn-ghost'>Cancel</label>
                        <button type='submit' className="btn btn-success rounded-xl">Scan</button>
                        </div>
                    </div>


                    
                </form>
  )
}

export default NewScanForm