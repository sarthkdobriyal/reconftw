import { useContext, useEffect, useState } from 'react'
import ScanListItem from './ScanListItem'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const ScansList = () => {
    const [scans, setScans] = useState(null)


    const { authToken } = useContext(AuthContext);

    const queryClient = useQueryClient()
    const { isLoading, isError, data, refetch } = useQuery(['projects/'])


    useEffect(() => {
        setScans(data?.projects_output)
    }, [data])

    const handleDelete = useMutation({
            mutationFn: (id) => {
                return axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}/delete/`, {
                    headers: {
                        'Authorization': `Bearer ${authToken.access}`
                    }
                })
            },
            onSuccess: () => {
                console.log("success",)
                queryClient.invalidateQueries(['projects'])
                refetch();
            },

            onError: (e) => {
                alert(e.response.data.message)
            },
        })


    const handleDownload = () => {
        
    }
    // const handleCancel = (id) => { }



    return (
        <div className='w-full h-full px-10'>
            <h2 className='text-gray-200 text-2xl font-bold tracking-wide m-2'>View All Scans Here: </h2>
            <div className=' w-full  pt-4 h-screen   z-10' >
                <div className='flex bg-base-300 w-full text-lime-500 text-lg font-bold py-4 rounded-md sticky pr-3'>
                    <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                        Target
                    </div>
                    <div className='  w-[20%] flex justify-center border-r border-gray-700'>
                        Domain
                    </div>
                    <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                        Version
                    </div>
                    <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                        Scan mode
                    </div>
                    <div className='  w-[15%] flex justify-center border-r border-gray-700'>
                        Last Change
                    </div>
                    <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                        Result
                    </div>
                    <div className='  w-[20%] flex justify-center border-r border-gray-700'>
                        Actions
                    </div>
                    <div className='  w-[10%] flex justify-center'>
                        Status
                    </div>
                </div>
                {
                    isError ? (
                        <div className="w-full flex justify-center mt-20">
                            <span className='text-red-500 text-xl font-bold'>Something Went Wrong...</span>
                        </div>
                    ) :

                        isLoading ? (

                            <div className='w-full  flex justify-center mt-20 '>


                                <span className="loading loading-bars  loading-lg"></span>
                            </div>


                        ): 
                        
                        
                        data && data?.status === 404 ? (
                            <div className="w-full flex justify-center mt-20">
                            <span className='text-orange-500 text-xl font-bold  text-center flex flex-col gap-2'>
                                <span>
                                    Nothing to show
                                </span>
                                <span>
                                Try running a new scan
                                </span>
                            </span>
                            </div>
                        ):

                            (<div className='w-full h-screen overflow-y-scroll mb-20 scrollbar scrollbar-w-3   scrollbar-thumb-rounded-xl scrollbar-track-black scrollbar-thumb-stone-700 '>

                                {
                                    scans?.map((scan) => (
                                        <ScanListItem key={scan.id} scan={scan} handleDelete={handleDelete} handleCancel={() => {}} handleDownload={handleDownload} />
                                    ))
                                }
                            </div>)}


            </div>
        </div>
    )
}

export default ScansList