import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import createUrl from '../utils/createUrl'


import UserDetails from './UserDetails'

const ClientUserManagement = ({users, refetch}) => {
    
    const { user, authToken } = useContext(AuthContext)
    const queryClient = useQueryClient()
//     const employeesUrl = createUrl(user.tenant.schema_name, `/accounts/employees`)
//   const { isLoading, isError, data, refetch } = useQuery(['employees'], () => axios.get(`${employeesUrl}`, {
//     headers: {
//       'Authorization': `Bearer ${authToken.access}`,
//       'x-request-id': user.tenant.tenant_uuid

//   },
//   }))

//   console.log(data)
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


    const handleToggleIsActive = useMutation( {
      mutationFn: (id) => {   
        let toggelActiveUrl = createUrl(`${user.tenant.schema_name }`, `/accounts/employee/${id}/toggle_is_active`)
        console.log(toggelActiveUrl)    
            return axios.patch(toggelActiveUrl , {
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
            console.log("success")
            queryClient.invalidateQueries(['employees'])
            refetch();
        },

        onError: (e) => {
            alert(e.response.data.message)
        },
    })



    return (
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
                    users.map((user, i) => (
                        <UserDetails key={user.id} user={user} i={i} handleDelete={handleDelete} handleToggleIsActive={null}/>
                    ))
                }
            </div>


        </div>
    )
}

export default ClientUserManagement