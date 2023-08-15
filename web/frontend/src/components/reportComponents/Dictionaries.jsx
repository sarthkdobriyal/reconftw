import React from 'react'
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'
import ReportModal from './ReportModal'

const Dictionaries = ({params, values, words, paths, passwords}) => {


    const paramsColumns = [
        {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1
        },
        {
            header: 'Params',
            accessorFn: info => info
        }
    ]

    const valuesColumns = [
        {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1
        },
        {
            header: 'Values',
            accessorFn: info => info
        }
    ]

    const wordsColumns = [
        {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1
        },
        {
            header: 'Words',
            accessorFn: info => info
        }
    ]

    const pathsColumns = [
        {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1
        },
        {
            header: 'Paths',
            accessorFn: info => info
        }
    ]


  return (
    <ReportContainer heading='Dictionaries'>
        <TableComponent 
            data={params}
            columns={paramsColumns}
        />
        <TableComponent 
            data={values}
            columns={valuesColumns}
        />
        <TableComponent 
            data={words}
            columns={wordsColumns}
        />
        <TableComponent 
            data={paths}
            columns={pathsColumns}
        />

        <div className='w-full mt-10 flex flex-wrap'>
        <ReportModal 
            id='passwordsModal'
            heading="Passwords for Brute Force"
            data={passwords}
        />
        </div>
    </ReportContainer>
  )
}

export default Dictionaries