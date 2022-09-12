import React from 'react'
import { Header, Button } from 'grommet'
import {Home} from 'grommet-icons'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../UserContext'

export const HeaderApp = () => {
  const {userToken} = React.useContext(UserContext)
  const navigate = useNavigate()
  return (
    <>
    {
      userToken ? 
      <Header background="dark-1" sticky= "scrollUp">
        <Button icon={<Home />} hoverIndicator onClick={() => navigate('/')} />
      </Header>
      : 
      null
    }
    </>
  )
}