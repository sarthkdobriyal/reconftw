import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

import { Link } from 'react-router-dom'
import DashboardButtons from '../components/DashboardButtons'

const Dashboard = () => {

    const { user, logoutUser } = useContext(AuthContext)


    const proFeatures = "1. Unlimited Scans!\n2. Unlimited Users\n3. No Ads!\n4. Unlimited Downloads!\n"


    console.log('user', user)
    return (
        <div className='w-full flex flex-col bg-base-200 '>
            <div className='w-full px-10 lg:px-20 py-8 '>


                <div className='flex'>
                    <span className='text-7xl text-gray-600 font-mono font-bold tracking-tighter opacity-60 mr-5'>WELCOME</span>
                    <div className='flex flex-col border-b rounded-md py-2 px-1   lg:w-[10%]'>

                        <span className='text-4xl text-sky-300 font-bold opacity-70 px-2 '>{user.username}</span>
                        <span className='text-xl text-sky-300 font-bold opacity-70 px-2 my-1'>org:
                            <span className="text-sky-100 mx-2 underline">{user.tenant.schema_name}</span>
                        </span>
                       
                    
                    </div>

                </div>


                <div className='py-5 flex flex-wrap pb-[100%] md:justify-center   justify-start items-center w-full gap-5 border-t border-white border-opacity-40 '>
                    {
                        !user.is_superuser &&
                        
                        <Link to='/scanslist'>
                        <DashboardButtons heading="PROJECTS" icon='project' />
                    </Link>}

                    {
                        user.is_staff && (
                            <>
                            <Link to='/manageusers'>
                                <DashboardButtons heading={`USERS`} icon='create' />
                            </Link>
                            <Link to='/checkout'>
                                <DashboardButtons heading={`SUBSCRIPTION`} icon='BsFillCreditCard2FrontFill' />
                            </Link>
                            
                            </>
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