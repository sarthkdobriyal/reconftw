
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'
import { useMemo } from 'react';
import PDFDownload from './PDFDownload';
import { cloudAssetsPDF } from '../../utils/generatePDF';

const CloudAssets = ({ data }) => {

  const cloudAssetsColumns = useMemo(
    () => [
      {
        header: 'S. NO.',
        accessorFn: (info, i) => i + 1,
      },
      {
        header: 'Protected S3 Bucket',
        accessorKey: 'protected_s3bucket',
      },
      {
        header: 'Google',
        accessorKey: 'google',
      },
      {
        header: 'Azure',
        accessorKey: 'azure',
      },
      {
        header: 'Storage Account',
        accessorKey: 'storage_account',
      },
    ],
    [] // No dependencies, columns won't change
  );


  return (
    <>
      <ReportContainer heading='CLOUD ASSETS'>
        {
         data.length > 0 && data ? (
            <div>
              <TableComponent
                data={data}
                columns={cloudAssetsColumns}
              />
              <div className='my-1 w-full flex justify-end'>
                <PDFDownload handleDownload={() => cloudAssetsPDF(data)} />
              </div>

            </div>
          ) : (
            <p className='text-xl font-bold text-center text-red-500 mt-5'>No Cloud Assets Found</p>
          )
        }

      </ReportContainer>

    </>
  )
}

export default CloudAssets