import React from 'react'
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'

const Nuclei = ({
    nuclei_outputs_critical,
    nuclei_outputs_high,
    nuclei_outputs_medium,
    nuclei_outputs_low,
    nuclei_outputs_info
}) => {


    const nucleiInfoColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Type',
            accessorFn: (info) => info[0]
        },
        {
            header: 'Protocol',
            accessorFn: (info) => info[1]
        },
        {
            header: 'URL',
            accessorFn: (info) => info[3]
        }

    ]
    const nucleiLowColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Type',
            accessorFn: (info) => info[0]
        },
        {
            header: 'Protocol',
            accessorFn: (info) => info[1]
        },
        {
            header: 'URL',
            accessorFn: (info) => info[3]
        }

    ]
    const nucleiMediumColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Type',
            accessorFn: (info) => info[0]
        },
        {
            header: 'Protocol',
            accessorFn: (info) => info[1]
        },
        {
            header: 'URL',
            accessorFn: (info) => info[3]
        }

    ]
    const nucleiHighColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Type',
            accessorFn: (info) => info[0]
        },
        {
            header: 'Protocol',
            accessorFn: (info) => info[1]
        },
        {
            header: 'URL',
            accessorFn: (info) => info[3]
        }

    ]
    const nucleiCriticalColumns = [
        {
            header: 'S.No',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Type',
            accessorFn: (info) => info[0]
        },
        {
            header: 'Protocol',
            accessorFn: (info) => info[1]
        },
        {
            header: 'URL',
            accessorFn: (info) => info[3]
        }

    ]
    



  return (
    <ReportContainer >
        <h1 className='text-3xl font-bold tracking-wider  shadow-gray-600  text-lime-400 my-1'>NUCLEI - 
        <span className='text-gray-500'>{' '}Info</span>
        </h1>
        <TableComponent
            data={nuclei_outputs_info}
            columns={nucleiInfoColumns}
        />
        <h1 className='text-3xl font-bold tracking-wider  shadow-gray-600  text-lime-400 my-1'>NUCLEI - 
        <span className='text-green-500'> {' '}Low</span>
        </h1>
        <TableComponent
            data={nuclei_outputs_low}
            columns={nucleiLowColumns}
        />
        <h1 className='text-3xl font-bold tracking-wider  shadow-gray-600  text-lime-400 my-1'>NUCLEI -
        <span className='text-orange-500'>{' '}Medium</span>
        </h1>
        <TableComponent
            data={nuclei_outputs_medium}
            columns={nucleiMediumColumns}
        />
        <h1 className='text-3xl font-bold tracking-wider  shadow-gray-600  text-lime-400 my-1'>NUCLEI - 
        <span className='text-red-400'>{' '}High</span>
        </h1>
        <TableComponent
            data={nuclei_outputs_high}
            columns={nucleiHighColumns}
        />
        <h1 className='text-3xl font-bold tracking-wider  shadow-gray-600  text-lime-400 my-1'>NUCLEI - 
        <span className='text-red-700'>{' '}Critical</span>
        </h1>
        <TableComponent
            data={nuclei_outputs_critical}
            columns={nucleiCriticalColumns}
        />


    </ReportContainer>
  )
}

export default Nuclei