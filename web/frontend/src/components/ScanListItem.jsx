import { GiCancel } from 'react-icons/gi'
import { GoDownload } from 'react-icons/go'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiSolidAlarm, BiSolidReport } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const ScanListItem = ({scan, handleCancel, handleDelete, handleDownload}) => {
    const {id,icon, domain, number, scan_mode, last_change, status } = scan

    let date = new Date(last_change).toLocaleDateString()
    let time = new Date(last_change).toLocaleTimeString()
    
  return (
    <div className={`flex my-2 rounded-md w-full bg-slate-400 py-3 text-black font-semibold  shadow-inner ${status === 'SCANNING' ? 'shadow-yellow-500': status === 'FINISHED' ? 'shadow-green-700': 'shadow-red-500'}  `}>
        <div className='  w-[10%] flex justify-center border-r border-gray-700'>
                    <img src={`${import.meta.env.VITE_IMAGES_URL}${icon}`} alt="target image" className='w-10 h-10 object-contain'/>
                </div>
                <div className='  w-[20%] flex justify-center items-center border-r border-gray-700'>
                    {domain}
                </div>
                <div className='w-[10%] flex justify-center items-center border-r border-gray-700'>
                    {number}
                </div>
                <div className='  w-[10%] flex justify-center items-center border-r border-gray-700'>
                    {scan_mode.split('-')[2]}
                </div>
                <div className='  w-[15%] flex flex-col gap-1 justify-center items-center border-r border-gray-700'>
                    <span >
                    {date} 
                    </span>
                    <span>
                    {time}
                    </span>
                </div>
                <Link to={`/report/${id}?domain=${domain}&scan_mode=${scan_mode}&status=${status}`} className='  w-[10%] flex justify-center items-center border-r border-gray-700 cursor-pointer tooltip tooltip-bottom' data-tip="report">
                    <BiSolidReport size={32} color='black' />
                </Link>
                <div className='  w-[20%] flex justify-center border-r border-gray-700 items-center gap-4'>
                    <button onClick={() => handleCancel(id)} data-tip='cancel' className=' tooltip outline-none border-none bg-transparent  rounded-full flex justify-center items-center  active:translate-y-2 transition duration-150'>
                        <GiCancel size={24} color='magenta' />
                    </button>
                    <button onClick={() => handleDelete.mutate(id)} disabled={handleDelete.isLoading}   data-tip='delete' className='tooltip outline-none border-none bg-transparent  flex justify-center items-center active:translate-y-2 transition duration-150'>
                        <AiOutlineDelete size={24} color={`${handleDelete.isLoading ? 'gray' : 'red'}`} />
                    </button>
                    <button data-tip='schedule' className='tooltip outline-none border-none bg-transparent  flex justify-center items-center active:translate-y-2 transition duration-150'>
                        <BiSolidAlarm size={24} color='blue' />
                    </button>
                    <button data-tip='download backup' className='tooltip outline-none border-none bg-transparent  flex justify-center items-center active:translate-y-2 transition duration-150'>
                        <Link to={`${import.meta.env.VITE_API_URL}/projects/${id}/backup/`} download>
                        <GoDownload size={24} color={`${handleDelete.isLoading ? 'gray' : 'green'}`} />
                        </Link>
                    </button>
                </div>
                <div className='  w-[10%] flex justify-center items-center gap-2'>
                    {
                        status === 'SCANNING' ? <span className="loading loading-spinner loading-xs"></span> : <>{status}</>
                    }
                    
                </div>
    </div>
  )
}


export default ScanListItem