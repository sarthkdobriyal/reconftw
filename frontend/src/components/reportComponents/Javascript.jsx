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
            accessorKey: 'live_links',
        }
    ]
    const urlExtractsColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Live Links',
            accessorKey: 'live_links',
        }
    ]
    const endpointsColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Live Links',
            accessorKey: 'live_links',
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
        <TableComponent 
            data={secrets}
            columns={secretsColumns}
        />
    </ReportContainer>
  )
}

export default Javascript