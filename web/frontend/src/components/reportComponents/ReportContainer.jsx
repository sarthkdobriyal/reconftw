import React from 'react'

const ReportContainer = ({children, heading}) => {
  return (
    <div className='w-[95%] mx-auto rounded-lg shadow-inner shadow-gray-600 py-6 px-20 bg-base-200 my-2 relative overflow-x-auto scrollbar-design '>
        <h1 className='text-3xl font-bold tracking-wider  shadow-gray-600  text-lime-400 my-1'>{heading}</h1>
    {children}
    </div>
  )
}

export default ReportContainer