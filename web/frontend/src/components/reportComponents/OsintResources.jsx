import React from 'react'
import ReportContainer from './ReportContainer'
import OsintModal from './OsintModal'

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

    </ReportContainer>
  )
}

export default OsintResources