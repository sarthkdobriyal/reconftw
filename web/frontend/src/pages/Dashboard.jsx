import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

import { Link } from 'react-router-dom'
import DashboardButtons from '../components/DashboardButtons'

const Dashboard = () => {

    const { user, logoutUser } = useContext(AuthContext)


    const proFeatures = "1. Unlimited Scans!\n2. Unlimited Users\n3. No Ads!\n4. Unlimited Downloads!\n"


    console.log('user', user)
    return (
        <div className='h-screen w-full flex flex-col bg-base-200'>
            <div className='w-full px-20 py-2 '>


                <div className=' flex'>
                    <span className='text-7xl text-gray-600 font-mono font-bold tracking-tighter opacity-60 mr-5'>WELCOME</span>
                    <div className='flex flex-col border-b rounded-md py-2 px-1 w-[32%]'>

                        <span className='text-4xl text-sky-300 font-bold opacity-70 px-2 '>{user.username}</span>
                        <span className='text-xl text-sky-300 font-bold opacity-70 px-2 my-1'>org:
                            <span className="text-sky-100 mx-2 underline">{user.tenant.schema_name}</span>
                        </span>
                       
                       

                    
                           
                            <div className="text-xl text-sky-300 font-bold opacity-70  flex justify-between ">
                            <span className='mx-2 my-1 '>
                                {

                                    user.is_superuser ?  <span>PAID UNTIL: 
                                    <span className='text-success ml-3'>end of time</span> 
                                </span> :    
                                    
                                    !user.tenant.paid_until ?
                                    <span className='text-red-500'>SUBSCRIBE NOW --&gt;</span>

                                        : <span>PAID UNTIL: 
                                        <span className='text-success ml-3'>{user.tenant.paid_until}</span> 
                                    </span>
                                
                                }
                            </span>
                            
                            

                            {/* <Link to='/checkout'>
                                <button className='relative hover:shadow-yellow-600  bg-yellow-800  btn shadow-inner shadow-gray-300 rounded-lg text-white opacity-90  tracking-widest' disabled={user.tenant.paid_until != null}>
                                    {
                                        user.is_superuser || user.tenant.paid_until ? <span className='text-gray-700'>SUBSCRIBED</span> :
                                            <span>subscribe to PRO!</span>
                                    }
                                   {
                                   ( !user.is_superuser && user.tenant.paid_until === null  ) ?
                                   
                                   
                                   <div className=' rounded-lg  shadow-inner shadow-yellow-200 absolute -top-[290%]  text-xs text-sky-200 font-semibold tracking-wide flex flex-col items-center px-4 pb-4'>
                                        <span className='text-warning text-base font-bold my-2'>Pro features</span>
                                        <span>Unlimited Scans</span>
                                        <span>Unlimited Users</span>
                                        <span>No Ads</span>
                                        <span>Unlimited Downloads</span>
                                    </div>
                                    : null    
                                }


                                </button>
                            </Link> */}

                        </div>



                    </div>

                </div>


                <div className='py-5 flex justify-center items-center w-full gap-10 border-t border-white border-opacity-40'>
                    {
                        !user.is_superuser &&
                        
                        <Link to='/scanslist'>
                        <DashboardButtons heading="PROJECTS" icon='project' />
                    </Link>}

                    {
                        user.is_staff && (
                            <>
                            <Link to='/manageusers'>
                                <DashboardButtons heading={`Users`} icon='create' />
                            </Link>
                            <Link to='/checkout'>
                                <DashboardButtons heading={`Subscription`} icon='BsFillCreditCard2FrontFill' />
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