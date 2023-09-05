import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

        <App />

    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)


// {
//   defaultOptions: {
//     queries: {
//       queryFn:  ({queryKey}) =>  axios.get(`${import.meta.env.VITE_API_URL}/${queryKey}/`, {
//         headers: {
//           Authorization: `Bearer ${authToken.access}`
//         }
//       }).then(res => res.data)
//     }
//   }
// }