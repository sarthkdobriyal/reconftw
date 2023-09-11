
import { GoProjectRoadmap } from 'react-icons/go'
import { FaPowerOff } from 'react-icons/fa'
import { BiSolidUser } from 'react-icons/bi'
import { BsFillCreditCard2FrontFill } from 'react-icons/bs'

const DashboardButtons = ({heading, icon}) => {
  return (
    <div className=' flex flex-col gap-10 items-center bg-base-100 shadow-inner px-10 py-10 lg:px-20 lg:py-20 rounded-xl shadow-gray-600  hover:shadow-gray-400  transition-transform hover:scale-105 ease-in duration-100 group '>
                <div className='rounded-full border-8 border-gray-800 p-6 border-opacity-90 group-hover:border-gray-500 '>

                    
                    {icon === 'logout' ? <FaPowerOff size={70} color='gray' /> :
                    icon === 'project' ? <GoProjectRoadmap size={70} color='gray' />:
                    icon === 'create' ? <BiSolidUser size={70} color='gray' />:
                    icon === 'BsFillCreditCard2FrontFill' ? <BsFillCreditCard2FrontFill size={70} color='gray' />
                    : null}


                </div>
                <span className='tecking-widest font-thin text-3xl border-b rounded-md border-gray-700 pb-2 px-2 group-hover:border-gray-300'>{heading}</span>
                

            </div>
  )
}

export default DashboardButtons