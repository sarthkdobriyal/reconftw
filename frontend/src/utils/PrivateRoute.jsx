import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router'

const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)
    if(!user) {
        return <Navigate to='/login' replace />
    }
  return children
  
}

export default PrivateRoute
