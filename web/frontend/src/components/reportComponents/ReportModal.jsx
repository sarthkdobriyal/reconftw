
import { PiCaretUpBold } from 'react-icons/pi'
import TableComponent from '../TableComponent';
import { twMerge } from 'tailwind-merge'

const ReportModal = ({ id, heading, data, modalClassName }) => {


    let registryColumns = [];

    if (id === 'dnsRegistryModal') {
        registryColumns = [
            {
                header: 'S.NO',
                accessorFn: (info, index) => index + 1,
            },
            {
                header: 'HOST',
                accessorKey: 'host',
            },
            {
                header: 'RESOLVER',
                accessorKey: 'resolver',
                cell: info => info.getValue().slice(2, -2)
            },
            {
                header: 'CNAME',
                accessorKey: 'cname',
            },
            {
                header: 'A_RECORD',
                accessorKey: 'a_record',
                cell: info => info.getValue().slice(2, -2)
            },
            {
                header: 'AAAA_RECORD',
                accessorKey: 'aaaa_record',
            },
            {
                header: 'MX_RECORD',
                accessorKey: 'mx_record',
            },
            {
                header: 'SOA_RECORD',
                accessorKey: 'soa_record',
            },
            {
                header: 'NS_RECORD',
                accessorKey: 'ns_record',
            },
            {
                header: 'INTERNAL_IPS_RECORD',
                accessorKey: 'internal_ips_record',
            },



        ]
    }




    return (
        <div>

            <label className="rounded-md text-sm  shadow-inner shadow-gray-800 flex items-center btn btn-ghost hover:bg-transparent  hover:border-b-sky-600" htmlFor={id} >
                <span className='text-sky-600 text-2xl text-center flex justify-center '>
                    <PiCaretUpBold size={16} />
                </span>

                {heading}

            </label>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal backdrop-blur-sm">
                <div className={twMerge("modal-box relative overflow-auto scrollbar-design ", modalClassName)}>
                    <h3 className="font-bold text-lg border-b border-gray-500 mb-10 pb-1">{heading}</h3>
                    {
                        data &&
                        (
                            <div>
                                {
                                    id === 'passwordsModal' && typeof data != 'string'  ? (
                                        <div className=''>
                                        {
                                            data.map((password) => (
                                                <p key={password} className="">{password}</p>
                                            ))
                                        }
                                        </div>
                                    )
                                    
                                    :
                                    id === 'dnsZonetransferModal' ? (
                                        <p>
                                            {data}
                                        </p>
                                    ) :
                                        id === 'dnsRegistryModal' ? (
                                            <div>
                                                <TableComponent
                                                    data={data}
                                                    columns={registryColumns}
                                                />
                                            </div>
                                        ) :
                                            id === 'cmsModal' ? (
                                                <></>
                                            ) :
                                            id === 'smuggling' ? (
                                                <div className='w-full flex flex-wrap gap-5'>
                                                    {
                                                        Object.keys(data).map(url => {
                                                            
                                                            const urlData = data[url]
                                                            return (
                                                                <div key={url} className="collapse collapse-arrow bg-base-200">
                                                                    <input type="checkbox" name="my-accordion-2" />
                                                                    <div className="collapse-title text-2xl  font-bold ">
                                                                        {url}
                                                                    </div>
                                                                    <div className="collapse-content">

                                                                        <div className='w-full  px-10 py-2 flex gap-10 ' >

                                                                            <div className='flex flex-col '>
                                                                                {
                                                                                    Object.keys(urlData).map((key) => (
                                                                                        <div key={key} className='border-b border-opacity-20 border-gray-500 py-3 font-bold'>
                                                                                            {
                                                                                                key
                                                                                            }
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </div>



                                                                            <div>
                                                                                {
                                                                                    Object.keys(urlData).map((key) => (
                                                                                        <div key={key} className='border-b border-opacity-20 border-gray-500 py-3 font-semibold'>
                                                                                            {
                                                                                                urlData[key]
                                                                                            }
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                            </div>

                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            ) : null
                                }
                            </div>
                        )
                    }
                    <div className="modal-action absolute -top-4 right-2">
                        <label htmlFor={id} className="btn btn-ghost rounded-xl text-red-500 text-xl font-bold ">X</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportModal