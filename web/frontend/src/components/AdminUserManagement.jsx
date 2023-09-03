import React from 'react'
import UserDetails from './UserDetails'

const AdminUserManagement = ({ users, handleDelete, handleToggleIsActive }) => {
  return (
    <div>
      <div className='flex pl-4 pr-12 bg-base-300 w-full text-lime-500 text-lg font-bold py-4 rounded-md sticky '>
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
      <div className='flex flex-col '>
        {
          users?.map((client, i) => {

            return (
              <div key={client.id}  className="collapse collapse-arrow bg-base-100 my-2  w-full text-gray-200 font-semibold  shadow-inner shadow-gray-500 rounded-xl">
                <input type="checkbox" name="my-accordion-3"  />
                <div className="collapse-title text-xl font-medium">
                <UserDetails key={client.id} user={client} i={i} handleDelete={handleDelete} admin={true} handleToggleIsActive={handleToggleIsActive}/>
                </div>
                <div className="collapse-content">
                <span className='text-3xl text-gray-600 font-mono font-bold tracking-tighter opacity-90 mr-5'>EMPLOYEES</span>
                  <div className=' w-[90%] ml-auto'>
                      {
                        client.employees.map((emp, i) => (
                          <UserDetails key={emp.id} user={emp} i={i} handleDelete={handleDelete} admin={false} handleToggleIsActive={handleToggleIsActive} />
                        ))
                      }
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>


    </div>
  )
}

export default AdminUserManagement