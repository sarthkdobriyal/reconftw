import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { GoProjectRoadmap } from 'react-icons/go'
import { Link } from 'react-router-dom'
import DashboardButtons from '../components/DashboardButtons'

const Dashboard = () => {

    const {user, logoutUser} = useContext(AuthContext)


  return (
    <div className='h-screen w-full flex flex-col bg-base-200'>
        <div className='w-full px-20 py-2'>

        <span className='text-8xl text-gray-600 font-mono font-bold tracking-tighter opacity-30 mr-5'>WELCOME</span>
        <span className='text-5xl text-lime-600 font-bold opacity-40 border-b rounded-md px-2 '>{user.username}</span>


        <div className='my-5 flex justify-center items-center w-full gap-10'>
            <Link to='/scanslist'>
           <DashboardButtons heading="PROJECTS" icon='project' />
            </Link>

            {
                user.is_staff && (
                    <Link to='/manageusers'>
                        <DashboardButtons heading={`Manage Users` } icon='create' />
                    </Link>
                ) 
                
            }





            <button onClick={() => logoutUser()}>
            <DashboardButtons heading="LOGOUT" icon="logout" />
            </button>




        </div>




        </div>
    </div>
  )
}

export default Dashboard