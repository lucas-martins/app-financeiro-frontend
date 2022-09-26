import React from 'react'
import { Button } from 'grommet'
import { useNavigate } from 'react-router-dom'

import styles from './SideBarBody.module.css'
import { buttons } from './SideBarBodyButtons'

export const SideBarBody = () => {
  const navigate = useNavigate()

  return (
    <div className={`${styles.backgroundSideBar} animeRight`}>
      <div className={styles.buttonContainer}>
        {
          buttons.map(button =>     
            <Button 
              key={button.route}
              hoverIndicator
              className={styles.button}
              label={button.label}
              onClick={() => {
                navigate(`/${button.route}`)
              }}
            />
          )
        }
      </div>
    </div>
  )
}
