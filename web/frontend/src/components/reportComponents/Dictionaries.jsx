
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'
import ReportModal from './ReportModal'
import { useMemo } from 'react';

const Dictionaries = ({params, values, words, paths, passwords}) => {


    const paramsColumns = useMemo(
        () => [
          {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1,
          },
          {
            header: 'Params',
            accessorFn: (info) => info,
          },
        ],
        []
      );
    
      const valuesColumns = useMemo(
        () => [
          {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1,
          },
          {
            header: 'Values',
            accessorFn: (info) => info,
          },
        ],
        []
      );
    
      const wordsColumns = useMemo(
        () => [
          {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1,
          },
          {
            header: 'Words',
            accessorFn: (info) => info,
          },
        ],
        []
      );
    
      const pathsColumns = useMemo(
        () => [
          {
            header: 'S. NO.',
            accessorFn: (row, i) => i + 1,
          },
          {
            header: 'Paths',
            accessorFn: (info) => info,
          },
        ],
        []
      );


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