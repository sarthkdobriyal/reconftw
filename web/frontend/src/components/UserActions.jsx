import React from 'react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const UserActions = ({user, logoutUser}) => {
  return (
    <div tabIndex={0} className='join-item btn btn-ghost rounded-xl dropdown dropdown-end dropdown-bottom flex justify-center items-center z-50'>
    {
        user ? (
            <img src={user.image || '/images/avatar.svg'} alt={user.name || ''} className='w-8 h-8 rounded-full' />
        ) : (
            <HiOutlineUserCircle size={16} />
        )
    }

    <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-base-200 rounded-box mt-6 w-52 py-4">
        <li className='border-b flex flex-col items-center border-gray-700 py-2 '>
            <span className='hover:bg-base-200'>{user?.username}
            </span>
            <span className='text-xs hover:bg-base-200' >Reconnaissance Ninja</span>
        </li>
        <li className='border-b py-2 border-gray-700'>
            <Link to='/editProfile'>
                Edit Profile
            </Link>
        </li>
        <li className='border-b py-2 border-gray-700' >
            <Link to='/apikeys'>
                API Keys
            </Link>
        </li>
        <li className='py-2' onClick={logoutUser}>
            <span className=''>
                Log out

                <BsBoxArrowUpRight color='white' />
            </span>
        </li>
    </ul>
</div>
  )
}

export default UserActions