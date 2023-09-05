import  { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { useMutation,  useQuery,  useQueryClient } from '@tanstack/react-query'
import createUrl from '../utils/createUrl'


import UserDetails from './UserDetails'
import { Link } from 'react-router-dom'

const ClientUserManagement = () => {
    
    const { user, authToken } = useContext(AuthContext)
    const queryClient = useQueryClient()
    const employeesUrl = createUrl(user.tenant.schema_name, `/accounts/employees`)
  const { isLoading, isError, data, refetch } = useQuery(['employees'], () => axios.get(`${employeesUrl}`, {
    headers: {
      'Authorization': `Bearer ${authToken.access}`,
      'x-request-id': user.tenant.tenant_uuid

  },
  }))

  console.log(data)
  const handleDelete = useMutation({
   
    mutationFn: (id) => {   
        let deleteUrl = createUrl(`${user.tenant.schema_name}`, `/accounts/employee/${id}/delete`)
        console.log(deleteUrl)    
            return axios.delete(deleteUrl, {
                headers: {
            'Authorization': `Bearer ${authToken.access}`,
            'x-request-id': user.tenant.tenant_uuid
        },
                user: {
                  'id': user.id,
                }
            })
        },
        onSuccess: () => {
            console.log("success",)
            queryClient.invalidateQueries(['employees'])
            refetch();
        },

        onError: (e) => {
            alert(e.response.data.message)
        },
    })


    // const handleToggleIsActive = useMutation( {
    //   mutationFn: (id) => {   
    //     let toggelActiveUrl = createUrl(`${user.tenant.schema_name }`, `/accounts/employee/${id}/toggle_is_active`)
    //     console.log(toggelActiveUrl)    
    //         return axios.patch(toggelActiveUrl , {
    //           headers: {
    //             'Authorization': `Bearer ${authToken.access}`,
    //             'x-request-id': user.tenant.tenant_uuid
                
    //         },
    //             user: {
    //               'id': user.id,
    //             }
    //         })
    //     },
    //     onSuccess: () => {
    //         console.log("success")
    //         queryClient.invalidateQueries(['employees'])
    //         refetch();
    //     },

    //     onError: (e) => {
    //         alert(e.response.data.message)
    //     },
    // })



    return (
        <div>
            {
        isLoading ? (
          <div className='w-full  flex justify-center mt-20 '>
            <span className="loading loading-bars  loading-lg"></span>
          </div>
        ) :
          isError ? (
            <div className="w-full flex justify-center mt-20">
              <span className='text-error text-xl font-bold'>Something Went Wrong...</span>
            </div>
          ) : data.data.length === 0 ? (
            <div className='w-full my-10 flex flex-col gap-5 items-center'>
              <span className='text-center text-xl text-warning block'>Seems like there are no users.</span>
              <Link to='/createuser'>
                <button className='btn btn-wide rounded-xl shadow-inner shadow-gray-600'>Add a User</button>
              </Link>
            </div>
          ) : (
            <div className='px-5 py-2 w-full'>
              <div className='flex justify-between items-center mb-5'>

                <span className='text-8xl text-gray-600 font-mono font-bold tracking-tighter opacity-30 mr-5'>Manage Users</span>
                <Link to='/createuser' className='btn btn-wide shadow-inner shadow-gray-600 rounded-xl font-bold text-lg'>
                  + Add user
                </Link>
              </div>
              <div>

              <div className='flex bg-base-300 w-full text-lime-500 text-lg font-bold py-4 rounded-md sticky pr-3'>
                <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                    S.no
                </div>
                <div className='  w-[50%] flex justify-start px-10 border-r border-gray-700 items-center gap-1'>
                    Name
                    <span className='text-sm font-light'>
                        (username)
                    </span>
                </div>
                <div className='  w-[20%] flex justify-center border-r border-gray-700'>
                    Created At
                </div>
                <div className='  w-[20%] flex justify-center border-gray-700'>
                    Actions
                </div>
            </div>
            <div className='my-1' >
                {
             (data?.data.map((user, i) => (
                        <UserDetails key={user.id} user={user} i={i} handleDelete={handleDelete} handleToggleIsActive={null}/>
                    )))
                }
            </div>

              </div>


            </div>
          )
      }







        </div>
    )
}

export default ClientUserManagement