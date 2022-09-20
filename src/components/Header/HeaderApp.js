import React from 'react'
import { Header, Button, Menu } from 'grommet'
import {Home} from 'grommet-icons'
import { useNavigate } from 'react-router-dom'

export const HeaderApp = () => {
  const userToken = window.localStorage.getItem('token')
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Minha Conta', onClick: () => handleMyAccount() },
    { label: 'Sair', onClick: () => handleLogout() },
  ]

  const handleMyAccount = () => {
    navigate('/account')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user_id')
    window.localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
    {
      userToken ? 
      <Header background="dark-1" sticky= "scrollUp">
        <Button icon={<Home />} hoverIndicator onClick={() => navigate('/')} />
        <h2>App Financeiro</h2>
        <Menu
          label="Menu"
          dropAlign= {{ top: "top", right: "right" }}
          dropBackground={{ color: "dark-3", opacity: "strong" }}
          items={menuItems}
        />
      </Header>
      : 
      null
    }
    </>
  )
}