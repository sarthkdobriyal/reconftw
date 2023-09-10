import TableComponent from '../TableComponent'
import ReportModal from './ReportModal'
import ReportContainer from './ReportContainer'
import {subdomainsPDF} from '../../utils/generatePDF'
import PDFDownload from './PDFDownload'

const Subdomains = ({ data }) => {
    // Table
    const { dnsRegistry, donZoneTransfer, subdomainsTable } = data


    const subdomainsColumns = [

        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        }
        ,
        {
            header: 'Subdomains',
            accessorKey: 'subdomain',
        },
        {
            header: 'IP Address',
            accessorKey: 'ip_address',
            cell: info => info.getValue().slice(2, -2)
        },
        {
            header: 'Ports',
            accessorKey: 'ports',
        },
        {
            header: 'Subtakeover',
            accessorKey: 'subtakeover',
        }
    ]




    return (
        <ReportContainer heading='SUBDOMAINS'>

            {data ?

                (
                    <div>
                        <TableComponent
                            data={subdomainsTable}
                            columns={subdomainsColumns}
                        />


                        <div className='w-full gap-4 mt-10 flex flex-wrap'>
                            {/* DNS Zone Transfers */}
                            <ReportModal
                                id='dnsZonetransferModal'
                                heading="DNS Zone Transfers"
                                data={donZoneTransfer}
                            />
                            {/* DNS Registry */}

                            <ReportModal
                                id='dnsRegistryModal'
                                heading="DNS Registry"
                                data={dnsRegistry}
                                modalClassName='w-[95%] h-[80%] max-w-full max-h-full'
                            />

                            {/* CMS */}
                            <ReportModal
                                id="cmsModal"
                                heading='CMS'
                                data={''}
                            />


                        </div>
                        <div className='my-1 w-full flex justify-end'>
                            <PDFDownload handleDownload={() => subdomainsPDF(subdomainsTable)} />
                        </div>
                    </div>
                ) : (
                    <p className='text-xl font-bold text-center text-red-500 mt-5'>No Subdmains Found</p>
                )}


        </ReportContainer>
    )
}

export default Subdomains