import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button} from 'grommet'


export const Home = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('user_id')
    window.localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      Home
      <Button 
        primary 
        color="#FF4040" 
        hoverIndicator 
        label="Sair"
        style={{width: '40%'}}
        onClick={() => handleLogout()}
      />
    </div>

  )
}
