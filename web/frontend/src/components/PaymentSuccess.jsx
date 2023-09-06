import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import createUrl from '../utils/createUrl'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

const PaymentSuccess = () => {

  const { user, authToken } = useContext(AuthContext)

  const paymentSuccessUrl = createUrl('', '/payments/payment-success')
  console.log(paymentSuccessUrl)
  const { isLoading, isError, data } = useQuery(['payment-success'], () => axios.patch(`${paymentSuccessUrl}`, {
    headers: {
      'Authorization': `Bearer ${authToken.access}`,
      // 'x-request-id': user.tenant.tenant_uuid
    },
    tenant_id: user.tenant.id

  }))




  return (
    <>
      {
        isLoading ? (
          <div className='w-full  flex flex-col gap-4 justify-center items-center mt-20 '>
            <span className="loading loading-bars  loading-lg"></span>
          </div>
        ) : isError ? (
          <div className="w-full flex justify-center mt-20">
            <span className='text-error text-xl font-bold'>Something Went Wrong...</span>
          </div>
        ) : (
          <div className='flex flex-col gap-4 items-center'>
            <span className='text-3xl font-bold text-success'>Payment Successful</span>
            <Link className='text-base-content text-lg hover:underline flex items-center gap-1 ' to='/'>
              <BsFillArrowLeftCircleFill size={24} color='gray' />
              Go back</Link>
          </div>
        )
      }


    </>
  )
}

export default PaymentSuccess