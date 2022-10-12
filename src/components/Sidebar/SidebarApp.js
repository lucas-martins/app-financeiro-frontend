import React from 'react'
import { Button } from 'grommet'
import { Menu } from 'grommet-icons'

import styles from './SidebarApp.module.css'
import { UserContext } from '../../UserContext'
import { SideBarBody } from './SideBarBody'

export const SidebarApp = () => {
  const {token} = React.useContext(UserContext)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const closeSideBar = (status) => {
    setMenuOpen(status)
  }

  return (
    <>
      {
        token ?
        <div>
          {menuOpen && <SideBarBody closeSideBar={closeSideBar} />}
          <div className={menuOpen ? `${styles.sideBarMenuOpen}` : `${styles.sideBarMainButton}`}>
            <Button 
              primary={menuOpen ? false : true}
              className={menuOpen ? `${styles.buttonMenu} animeRight` : `animeLeft`}
              icon={<Menu />} 
              color={menuOpen ? '#F8F8F8' : '#7D4CDB'}
              onClick={() => setMenuOpen(!menuOpen)}
            /> 
          </div>
        </div>
        : 
        null
      }
    </>
  )
}
