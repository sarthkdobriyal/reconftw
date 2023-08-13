import React from 'react'
import { PiCaretUpBold } from 'react-icons/pi'
import TableComponent from '../TableComponent';
import { twMerge } from 'tailwind-merge'

const ReportModal = ({ id,heading, data, modalClassName }) => {


    let registryColumns = [];

    if(id === 'dnsRegistryModal'){
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

            <label className="rounded-md text-sm  shadow-inner shadow-gray-800 flex items-center btn btn-ghost hover:bg-transparent  hover:border-b-lime-600" htmlFor={id} >
                <span className='text-lime-600 text-2xl text-center flex justify-center '>
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