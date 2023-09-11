import React from 'react'
import { BiSolidDownload } from 'react-icons/bi'

const PDFDownload = ({handleDownload}) => {
  return (
    <button onClick={handleDownload} className='btn rounded-xl shadow-inner shadow-gray-400 '> 
        <BiSolidDownload color='skyblue' size={30} />
     </button>
  )
}

export default PDFDownload