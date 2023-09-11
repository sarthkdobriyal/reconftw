import { useContext, useEffect, useState } from 'react'
import ScanListItem from './ScanListItem'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import createUrl from '../utils/createUrl'

const ScansList = () => {
    const [scans, setScans] = useState(null)

    const { user, authToken } = useContext(AuthContext);
    console.log(user.tenant.tenant_uuid)
    const queryClient = useQueryClient()
    const projectsUrl = createUrl('', `/projects/`)
    console.log(projectsUrl)
    const { isLoading, isError, data, refetch } = useQuery(['projects/'], () => axios.get(`${projectsUrl}`, {
        headers: {
            'Authorization': `Bearer ${authToken.access}`,
            'x-request-id': user.tenant.tenant_uuid
        },

    }))


    useEffect(() => {
        setScans(data?.data.projects_output)
    }, [data])

    console.log('scans ---> ', data?.data.projects_output);

    const handleDelete = useMutation({
        mutationFn: (id) => {
            const url = createUrl(user.tenant.schema_name, `/projects/${id}/delete/`)
            return axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${authToken.access}`,
                    'x-request-id': user.tenant.tenant_uuid
                },
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



    const handleCancel = useMutation({
        mutationFn: (id) => {
            const url = createUrl(user.tenant.schema_name, `/projects/${id}/cancel/`)
            return axios.post(url, {
                headers: {
                    'Authorization': `Bearer ${authToken.access}`,
                    'x-request-id': user.tenant.tenant_uuid
                },
            })
        },
        onSuccess: () => {
            console.log("Canceled")
            refetch();
        },
        OnError: (e) => {
            alert(e.response.data.message)
        }
    })


    const handleDownload = async (id, domain) => {
        const downloadUrl = createUrl('', `/projects/${id}/backup/`)
        const response = await axios.get(downloadUrl, {
            headers: {
                'Authorization': `Bearer ${authToken.access}`,
                'x-request-id': user.tenant.tenant_uuid
            },
        })
        const buffer = await response.data;
        const blob = new Blob([buffer], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${domain}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }


    return (
        <div className='w-full h-full px-3 md:px-10'>
            {/* <h2 className='text-gray-200 text-2xl font-bold tracking-wide m-2'>View All Scans Here: </h2> */}
            <div className=' w-full  pt-4 h-screen   z-10' >
                <div className='flex bg-base-300 w-full text-blue-500 text-xs md:text-lg font-bold py-4 rounded-md sticky pr-3'>
                    <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                        Target
                    </div>
                    <div className='  w-[20%] flex justify-center border-r border-gray-700'>
                        Domain
                    </div>
                    <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                        Version
                    </div>
                    <div className='  w-[20%] flex justify-center border-r border-gray-700'>
                        Scan mode
                    </div>
                    <div className='  w-[15%] flex justify-center border-r border-gray-700'>
                        Last Change
                    </div>
                    <div className='  md:w-[10%] flex justify-center border-r border-gray-700'>
                        Result
                    </div>
                    <div className='  w-[20%] flex justify-center border-r border-gray-700'>
                        Actions
                    </div>
                    <div className='  w-[16%] lg:w-[10%]  flex justify-center'>
                        Status
                    </div>
                </div>
                {
                    isError ? (
                        <div className="w-full flex justify-center mt-20">
                            <span className='text-error text-xl font-bold'>Something Went Wrong...</span>
                        </div>
                    ) :

                        isLoading ? (

                            <div className='w-full  flex justify-center mt-20 '>


                                <span className="loading loading-bars  loading-lg"></span>
                            </div>


                        ) :


                            data && data?.status === 404 || data?.data.projects_output.length === 0 ? (
                                <div className="w-full flex justify-center mt-20">
                                    <span className='text-warning text-xl font-bold  text-center flex flex-col gap-2'>
                                        <span>
                                            Nothing to show
                                        </span>
                                        <span>
                                            Try running a new scan
                                        </span>
                                    </span>
                                </div>
                            ) :

                                (<div className='w-full h-screen overflow-y-scroll mb-20 scrollbar scrollbar-w-3   scrollbar-thumb-rounded-xl scrollbar-track-black scrollbar-thumb-stone-700 '>

                                    {
                                        scans?.map((scan) => (
                                            <ScanListItem key={scan.id} scan={scan} handleDelete={handleDelete} handleCancel={handleCancel} handleDownload={handleDownload} />
                                        ))
                                    }
                                </div>)}


            </div>
        </div>
    )
}

export default ScansList