import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const userToken = window.localStorage.getItem('userToken')
  //TODO Alterar rota para login
  return userToken ? children : <Navigate to='/register' />
}

export default ProtectedRoute