import { BsGoogle, BsGithub } from 'react-icons/bs'
import { LuMonitor } from 'react-icons/lu'
import { FiUser } from 'react-icons/fi'
import { BiCoinStack } from 'react-icons/bi'
import { MdOutlineEmail } from 'react-icons/md'
import { GoUnlock, GoInfo } from 'react-icons/go'

const OsintModal = ({id,  title, count, data }) => {

    if(typeof data === 'string'){
        data = data.split('\n')
    }

    const icon  =  id === 'googleDorks' ? <BsGoogle size={50} color='gray' /> : 
                   id === 'githubDorks' ? <BsGithub size={50} color='gray' /> : 
                   id === 'softwares' ? <LuMonitor size={50} color='gray' /> : 
                   id === 'users' ? <FiUser size={50} color='gray' /> : 
                   id === 'metadata' ? <BiCoinStack size={50} color='gray' /> :
                   id === 'emails' ? <MdOutlineEmail size={50} color='gray' /> : 
                   id === 'passwords' ? <GoUnlock size={50} color='gray' /> : 
                   id === 'domain' ? <GoInfo size={50} color='gray' /> : null

    return (
        <div className=''>
            <div className='rounded-xl shadow-inner shadow-gray-600 '>
                <div className='flex items-center gap-4 relative'>

                    <div className='flex flex-2 flex-col gap-2 text-base-content  px-4 py-2'>
                        <span className='text-lime-600 font-bold text-4xl'>{count}</span>
                        <span className=''>{title}</span>
                    </div>

                    <div className='flex-1 absolute right-2 bottom-2 '>

                    {icon}
                    </div>

                </div>

            <label htmlFor={`osint_modal_${id}`} className="btn rounded-xl text-sm  w-full shadow-inner shadow-gray-600 hover:text-lime-600">
                View Details
            </label>
            </div>

            <input type="checkbox" id={`osint_modal_${id}`} className="modal-toggle" />
            <div className="modal backdrop-blur-sm">
                <div className="modal-box rounded-xl max-w-3xl max-h-full scrollbar-design">
                    <h3 className="font-bold text-lg border-b pb-3 mb-3">{title}</h3>
                    {
                        data?.map((item, i) => (
                            <p key={i} className="py-1">{item}</p>

                        ))
                    }
                    <div className="modal-action absolute -top-4 right-2">
                        <label htmlFor={`osint_modal_${id}`} className="btn btn-ghost rounded-xl text-red-500 text-xl font-bold ">X</label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor={`osint_modal_${id}`} className="btn rounded-xl ">Close</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OsintModal