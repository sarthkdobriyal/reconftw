import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import createUrl from '../utils/createUrl'
import { Link } from 'react-router-dom'
import AdminUserManagement from '../components/AdminUserManagement'
import ClientUserManagement from '../components/ClientUserManagement'

const ManageUsers = () => {


  const { user, authToken } = useContext(AuthContext)
  const queryClient = useQueryClient()

  if (!user.is_superuser && !user.is_staff) {
    return (
      <div className='w-full flex justify-center'>
        <p className='text-center text-2xl text-error my-10 '>
          You are not authorized to access this page.
        </p>
      </div>
    )
  }


  const employeesUrl = createUrl(user.tenant.schema_name, `/accounts/employees`)
  const clientsUrl = createUrl('', `/accounts/clients`)

  const { isLoading, isError, data, refetch } = useQuery(['employees'], () => axios.get(`${user.is_superuser ? clientsUrl : employeesUrl}`, {
    headers: {
      'Authorization': `Bearer ${authToken.access}`
    }
  }))

  
  const handleDelete = useMutation({
   
    mutationFn: (id) => {   
        let deleteUrl = createUrl(`${user.tenant.schema_name === 'public' || user.tenant.schema_name === ''  ? '' : user.tenant.schema_name }`, `/accounts/employee/${id}/delete`)
        console.log(deleteUrl)    
            return axios.delete(deleteUrl, {
                headers: {
                    'Authorization': `Bearer ${authToken.access}`
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
        let toggelActiveUrl = createUrl(`${user.tenant.schema_name === 'public' || user.tenant.schema_name === ''  ? '' : user.tenant.schema_name }`, `/accounts/employee/${id}/toggle_is_active`)
        console.log(toggelActiveUrl)    
            return axios.patch(toggelActiveUrl , {
                headers: {
                    'Authorization': `Bearer ${authToken.access}`
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

                {
                    user?.is_superuser ? 
                    <AdminUserManagement users={data.data} handleDelete={handleDelete} handleToggleIsActive={handleToggleIsActive} /> :
                    <ClientUserManagement users={data.data} handleDelete={handleDelete} handleToggleIsActive={handleToggleIsActive}/> 
                }

              </div>


            </div>
          )
      }

    </div>
  )



}

export default ManageUsers