import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

const UserDetails = ({ user, i, handleDelete, admin, handleToggleIsActive }) => {
    let date = new Date(user.created_date).toLocaleDateString()
    let time = new Date(user.created_date).toLocaleTimeString()
    return (
        <div className='flex text-xl rounded-md w-full bg-slate-400 py-2 text-black font-semibold shadow-inner shadow-black'>
            <div className='  w-[10%] flex justify-center items-center border-r border-gray-700'>
                {i + 1}
            </div>
            <div className='  w-[50%] gap-1 flex justify-start px-10 items-center border-r border-gray-700'>
                {user.name}
                <span className='text-sm font-light'>
                    {`(${user.username})`}
                </span>
            </div>
            <div className='text-sm  w-[20%] flex flex-col gap-1 justify-center items-center border-r border-gray-700'>
                <span >
                    {date}
                </span>
                <span>
                    {time}
                </span>
            </div>
            <div className='  w-[20%] flex justify-center  border-gray-700 items-center gap-4'>
                <button onClick={() => handleDelete.mutate(user.id, admin)} disabled={handleDelete.isLoading} data-tip='delete' className='tooltip outline-none border-none bg-transparent  flex justify-center items-center active:translate-y-2 transition duration-150 z-10'>
                    <AiOutlineDelete size={24} color={`${handleDelete.isLoading ? 'gray' : 'red'}`} />
                </button>
                {handleToggleIsActive === false ? null:  <input type="checkbox" className="z-10 toggle toggle-success rounded-full " onChange={() => handleToggleIsActive?.mutate(user.id)}  checked={user.is_active} disabled={handleToggleIsActive?.isLoading}/>}

            </div>

        </div>
    )
}

export default UserDetails