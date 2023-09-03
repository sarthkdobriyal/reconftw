import React from 'react'

import UserDetails from './UserDetails'

const ClientUserManagement = ({ users, handleDelete }) => {
    console.log(users)

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