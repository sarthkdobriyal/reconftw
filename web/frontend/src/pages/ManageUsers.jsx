import  { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import AdminUserManagement from '../components/AdminUserManagement'
import ClientUserManagement from '../components/ClientUserManagement'

const ManageUsers = () => {



  const { user } = useContext(AuthContext)

  if (!user.is_superuser && !user.is_staff) {
    return (
      <div className='w-full flex justify-center'>
        <p className='text-center text-2xl text-error my-10 '>
          You are not authorized to access this page.
        </p>
      </div>
    )
  }

  else if (user.is_superuser) {

    return (
      <div>
        
                <div>

                  {
                    <AdminUserManagement />

                  }

                </div>


             
      </div>
    )




  }
  else {


  




  return (
    <div>

                    <ClientUserManagement />
                
    </div>
  )

    }

}

export default ManageUsers