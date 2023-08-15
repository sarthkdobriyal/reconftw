import React from 'react'
import TableComponent from '../TableComponent'
import ReportContainer from './ReportContainer'

const Javascript = ({live_links, url_extracts, endpoints, secrets}) => {
    const liveLinksColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Live Links',
            accessorFn: info => info,
        }
    ]
    const urlExtractsColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Url Extracts',
            accessorFn: info => info,
        }
    ]
    const endpointsColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Endpoints',
            accessorFn: info => info,
        }
    ]
    const secretsColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Type',
            accessorKey: 'type',
        },
        {
            header: 'Protocol',
            accessorKey: 'protocol',
        },
        {
            header: 'Severity',
            accessorKey: 'severity',
        },
        {
            header: 'URL',
            accessorKey: 'url',
        }
    ]
  return (
    <ReportContainer heading='Javascript'>
        <TableComponent 
            data={live_links}
            columns={liveLinksColumns}
        />
        <TableComponent 
            data={url_extracts}
            columns={urlExtractsColumns}
        />
        <TableComponent 
            data={endpoints}
            columns={endpointsColumns}
        />
    </ReportContainer>
  )
}

export default Javascript