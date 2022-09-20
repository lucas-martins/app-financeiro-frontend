import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const userToken = window.localStorage.getItem('token')
  console.log(userToken)
  return userToken ? children : <Navigate to='/login' />
}

export default ProtectedRoute