import React from 'react'
import { Button } from 'grommet'

import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()

  return (
    <div className='global-container'>
      <Button primary color="#6FFFB0" hoverIndicator label="Cadastre-se" onClick={() => navigate('/register')} />
    </div>
  )
}
