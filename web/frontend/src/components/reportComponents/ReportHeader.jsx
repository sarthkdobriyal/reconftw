import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import UserActions from '../UserActions';
import { BsBoxArrowLeft } from 'react-icons/bs';

const ReportHeader = ({ user, location, logoutUser }) => {
    const searchParams = new URLSearchParams(location.search);

    const id = location.pathname.split('/').pop();
    const domain = searchParams.get('domain');
    const scanMode = searchParams.get('scan_mode').split('-')[2];
    const status = searchParams.get('status').toUpperCase();

    return (
        <div className=' py-4 bg-base-300 text-base-content px-5 flex w-full pr-32 z-10 relative '>
            <div className='drawer flex gap-3'>
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <label htmlFor="my-drawer" className="btn  bg-base-300 border-none hover:bg-base-200 drawer-button"><GiHamburgerMenu size={24} color='gray' /></label>
                <Link to='/' >
                    <img src="/images/logo.png" alt="logo" className='h-12 object-contain' />
                </Link>
                {/* Sidebhar content */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay "></label>
                    <div className='h-full w-80 bg-transparent flex flex-col justify-end fixed'>
                        <div className='h-[90%] bg-base-300 flex flex-col justify-between p-4'>

                            <div className="menu  text-lime-500  font-bold flex flex-col gap-2">
                                {/* Sidebar content here */}
                                <li><Link to='#subdomains'>SUBDOMAINS</Link></li>
                                <li><Link>CLOUD ASSETS</Link></li>
                                <li><Link>SCREENSHOTS</Link></li>
                                <li><Link>OSINT OUTPUT</Link></li>
                                <li><Link>NUCLEI OUTPUT</Link></li>
                                <li><Link>VULNERABILITIES</Link></li>
                                <li><Link>FUZZING PATH</Link></li>
                                <li><Link>JAVASCRIPT</Link></li>
                                <li><Link>DICTIONARIES</Link></li>
                            </div>

                            <Link to='/'>
                                <div className='text-gray-200 font-bold text-2xl  text-center  flex gap-3 px-5 items-center'>
                                    <BsBoxArrowLeft size={32} color='green' />
                                    Go Back
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>

            <div className='join mr-3'>
                <div className='btn btn-ghost hover:bg-base-300 px-5 border-r-gray-800 hover:border-r-gray-800 p-1'>
                    {
                        status === 'SCANNING' && <span className="loading loading-spinner loading-xs"></span>
                    }
                    {status}</div>
                <div className=' btn btn-ghost hover:bg-base-300 px-5 border-r-gray-800 hover:border-r-gray-800'>
                    <span className='text-lime-600'>Scan Mode:</span>
                    {scanMode}</div>
                <div className='btn btn-ghost hover:bg-base-300 px-5 border-r-gray-800 hover:border-r-gray-800 '>
                    <span className='text-lime-600'>
                        {domain}

                    </span>
                </div>
                <UserActions
                    user={user}
                    logoutUser={logoutUser}

                />
                

            </div>


        </div>
    )
}

export default ReportHeader