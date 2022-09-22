import React from 'react'
import { Header, Button, Menu } from 'grommet'
import {Home} from 'grommet-icons'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../UserContext'

export const HeaderApp = () => {
  const navigate = useNavigate()

  const {token, setToken} = React.useContext(UserContext)

  const menuItems = [
    { label: 'Minha Conta', onClick: () => handleMyAccount() },
    { label: 'Sair', onClick: () => handleLogout() },
  ]

  const handleMyAccount = () => navigate('/account')

  const handleLogout = () => {
    window.localStorage.removeItem('user_id')
    window.localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <>
    {
      token ? 
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