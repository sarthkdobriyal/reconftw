
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'
import ReportModal from './ReportModal'
import { useMemo } from 'react';
import { paramsPDF, pathsPDF, valuesPDF, wordsPDF } from '../../utils/generatePDF';
import PDFDownload from './PDFDownload';

const Dictionaries = ({ params, values, words, paths, passwords }) => {


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
      <div>
        <TableComponent
          data={params}
          columns={paramsColumns}
        />
        <div className='my-1 mb-10 w-full flex justify-end'>
          <PDFDownload handleDownload={() => paramsPDF(params)} />
        </div>
      </div>
      <div>

        <TableComponent
          data={values}
          columns={valuesColumns}
        />
        <div className='my-1 w-full flex justify-end'>
          <PDFDownload handleDownload={() => valuesPDF(values)} />
        </div>
      </div>
      <div>

        <TableComponent
          data={words}
          columns={wordsColumns}
        />
         <div className='my-1 w-full flex justify-end'>
          <PDFDownload handleDownload={() => wordsPDF(words)} />
        </div>
      </div>
      <div>

        <TableComponent
          data={paths}
          columns={pathsColumns}
        />
         <div className='my-1 w-full flex justify-end'>
          <PDFDownload handleDownload={() => pathsPDF(paths)} />
        </div>
      </div>

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