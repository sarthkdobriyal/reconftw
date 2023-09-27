import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { BiSolidAlarm } from 'react-icons/bi'
import AuthContext from '../context/AuthContext';
import { useMutation, useQueryClient} from '@tanstack/react-query';
import createUrl from '../utils/createUrl';
import axios from 'axios';




const ScheduleModal = ({id}) => {

    const queryClient = useQueryClient();
    const { user, authToken } = useContext(AuthContext);

    const {
        register, handleSubmit, reset,  formState: { errors }, setValue,
    } = useForm()


    const handleSchedule = handleSubmit((formData) => {
        formData['id'] = id
        addScanSchedule.mutate(formData);
        reset();
    })

    const addScanSchedule = useMutation({
        mutationFn: (formData) => {
            const url = createUrl('', '/schedules/new' )
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
            alert("success")
        },

        onError: (e) => {
            console.log(e.response.data.message);
        },
    })

    return (
        <>
            <button onClick={() => document.getElementById('schedule_modal').showModal()} data-tip='schedule' className='tooltip outline-none border-none bg-transparent  flex justify-center items-center active:translate-y-2 transition duration-150'>
                <BiSolidAlarm size={24} color='blue' />
            </button>



            <dialog id="schedule_modal" className="modal">
                <div className="modal-box bg-base-200 text-gray-400 rounded-xl backdrop-blur-sm ">
                    <form className='flex '>
                        <div className='flex flex-col gap-0.5 justify-stretch w-[50%]'>


                            <h3 className="font-bold text-lg border-b">CHOOSE DAY</h3>
                            <label className="label cursor-pointer ">
                                <span className="label-text">MONDAY</span>
                                <input {...register('Monday')}  type="checkbox" className="checkbox" />
                            </label>
                            <label className="label cursor-pointer ">
                                <span className="label-text">TUESDAY</span>
                                <input {...register('Tuesday')}  type="checkbox" className="checkbox" />
                            </label>
                            <label className="label cursor-pointer ">
                                <span className="label-text">WEDNESDAY</span>
                                <input {...register('Wednesday')}  type="checkbox" className="checkbox" />
                            </label>
                            <label className="label cursor-pointer ">
                                <span className="label-text">THURSDAY</span>
                                <input {...register('Thusrday')}  type="checkbox" className="checkbox" />
                            </label>
                            <label className="label cursor-pointer ">
                                <span className="label-text">FRIDAY</span>
                                <input {...register('Friday')}  type="checkbox" className="checkbox" />
                            </label>
                            <label className="label cursor-pointer ">
                                <span className="label-text">SATURDAY</span>
                                <input {...register('Saturday')}  type="checkbox" className="checkbox" />
                            </label>
                            <label className="label cursor-pointer ">
                                <span className="label-text">SUNDAY</span>
                                <input {...register('Sunday')}  type="checkbox" className="checkbox" />
                            </label>
                        </div>

                        <div className='flex ml-3 w-[50%] flex-col'>
                        <h3 className="font-bold text-lg border-b">CHOOSE TIME</h3>
                        <div className='px-2 h-full  flex items-center justify-center'>
                            <div className='flex gap-1 '>
                                <select {...register('hours')} className="border-none outline-none text-gray-400 text-5xl  scrollbar-design  appearance-none bg-transparent ">
                                    {
                                        Array(24).fill().map((_, i) => <option key={i} className='text-sm text-center bg-base-100' >{i<10 ? `0${i}` : i}</option>)
                                    }
                                </select>
                                <span className='text-gray-400 text-5xl'>:</span>
                                <select {...register('minutes')} className="border-none outline-none text-gray-400 text-5xl  scrollbar-design  appearance-none bg-transparent ">
                                    {
                                        Array(60).fill().map((_, i) => <option key={i} className='text-sm text-center bg-base-100' >{
                                            i<10 ? `0${i}` : i
                                        }</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        </div>

                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                        <button className='btn btn-success rounded-lg' onClick={handleSchedule}>Schedule</button>
                    </div>
                </div>
            </dialog>

        </>
    )
}

export default ScheduleModal