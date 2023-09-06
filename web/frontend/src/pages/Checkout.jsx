
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import createUrl from '../utils/createUrl';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import QueryString from 'query-string';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import PaymentSuccess from '../components/PaymentSuccess';





const Checkout = () => {

    const location = useLocation()
    const { user, authToken } = useContext(AuthContext)


    const paymentResult = QueryString.parse(location.search)

    console.log(paymentResult)


    const checkoutUrl = createUrl('', '/payments/create-checkout-session')
    console.log(checkoutUrl)
    const { isLoading, isError, data, refetch } = useQuery(['checkout'], () => axios.post(`${checkoutUrl}`, {
        headers: {
            'Authorization': `Bearer ${authToken.access}`,
            // 'x-request-id': user.tenant.tenant_uuid
        },

    }))

    console.log(user)



    return (
        <div className='relative'>
            <div className='fixed top-10 left-7'>
                <Link to='/' >
                    <img src="/images/logo.png" alt="logo" className='h-12 object-contain' />
                </Link>
            </div>

            <div className='w-full mt-24 text-center'>

                <span className='text-3xl font-bold tracking-widest border-b border-spacing-1 '>BUY SUBSCRIPTION</span>

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
                        <div className='w-full flex flex-col  gap-4 justify-center items-center mt-20'>
                            <div className='text-left  mx-auto'>

                                <span className='text-3xl font-bold'>Your Plan</span>
                                <div>
                                    <span className='text-xl mr-5'>Monthly Subscription: </span>
                                    <span className='text-2xl tracking-widest text-sky-300'>₹ {data.data.amount}/-</span>
                                </div>

                            </div>

                            {
                                paymentResult.success ? (

                                   <PaymentSuccess />
                                ) : paymentResult.cancel ? (<>
                                    <div className='flex flex-col gap-4 items-center'>
                                        <span className='text-3xl font-bold text-error'>Payment Canceled</span>
                                        <Link className='text-base-content text-lg hover:underline flex items-center gap-1 ' to='/'>
                                            <BsFillArrowLeftCircleFill size={24} color='gray' />
                                            Return Home</Link>
                                    </div>
                                </>) : (
                                    <Link className="btn btn-success text-white w-[30%] rounded-lg" to={`${data.data.redirectTo}`}>
                                        Proceed to PAYMENTT
                                    </Link>
                                )


                            }


                        </div>
                    )
                }


            </div>

        </div>
    )
}

export default Checkout