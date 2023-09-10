
import ReportContainer from './ReportContainer'
import OsintModal from './OsintModal'
import PDFDownload from './PDFDownload'
import { osintResouircePDF } from '../../utils/generatePDF'

const OsintResources = ({data}) => {

  return (
    <ReportContainer heading='OSINT RESOURCES'>
        <div className='grid grid-cols-4 gap-4 my-6'>
            {
                data.map((item) => (
                    <OsintModal
                        key={item.id}
                        id={item.id} 
                        title={item.title}
                        count={item.count}
                        data={item.data}    
                    />
                ))
            }

        </div>
        <div className='my-1 w-full flex justify-end'>
                <PDFDownload handleDownload={() => osintResouircePDF(data)} />
              </div>
    </ReportContainer>
  )
}

export default OsintResources