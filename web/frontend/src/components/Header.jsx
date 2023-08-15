import React, { useContext, useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import ReportHeader from './reportComponents/ReportHeader';
import UserActions from './UserActions';
import NewScanForm from './NewScanForm';


const Header = () => {

    const { user, logoutUser } = useContext(AuthContext)

    if (!user) return <Navigate to='/login' replace />

    const location = useLocation()

    const isReport = location.pathname.includes('report')

    return (
        <>
            {
                isReport ? (
                    <ReportHeader
                        user={user}
                        logoutUser={logoutUser}
                        location={location}
                    />
                ) : (

                    <div className='w-full px-10 py-3  bg-base-200 flex justify-between items-center text-base-content'>
                        <Link to='/' >
                            <img src="/images/logo.png" alt="logo" className='h-12 object-contain' />
                        </Link>
                        <div className='join '>
                            <div className='join-item btn btn-ghost rounded-xl ' htmlFor='my_modal_6'>
                                
                                <label htmlFor="my_modal_6" className='flex gap-1 items-center'>
                                <IoMdAddCircleOutline size={32} color='lightgray' />
                                    New Scan</label>
                                
                            </div>
                            <div className='join-item btn btn-ghost rounded-xl ' >Recon List</div>
                            <UserActions
                                user={user}
                                logoutUser={logoutUser}
                            />
                        </div>


                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                        <div className="modal">
                            <div className="flex flex-col px-4 py-5 bg-base-200 text-base-content w-[60%]  relative  rounded-lg">
                            <h3 className="font-bold text-lg border-b py-4">New Scan</h3>

                                <div className="modal-action">
                                         <NewScanForm />
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }


        </>
    )
}

export default Header