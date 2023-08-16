
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'
import { useMemo } from 'react';

const CloudAssets = ({data}) => {

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
            data ? (
                <>
                <TableComponent 
                  data={data}
                  columns={cloudAssetsColumns}
                />
                </>
            ) : (
                <p className='text-xl font-bold text-center text-red-500 mt-5'>No Cloud Assets Found</p>
            )
        }

    </ReportContainer>     
        
    </>
  )
}

export default CloudAssets