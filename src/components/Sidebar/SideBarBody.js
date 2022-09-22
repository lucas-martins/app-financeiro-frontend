import React from 'react'
import { Button } from 'grommet'
import { useNavigate } from 'react-router-dom'

import styles from './SideBarBody.module.css'

export const SideBarBody = () => {
  const navigate = useNavigate()

  return (
    <div className={`${styles.backgroundSideBar} animeRight`}>
      <div className={styles.buttonContainer}>
        <Button hoverIndicator className={styles.button} label="Home" onClick={() => navigate('/home')} />
        <Button hoverIndicator className={styles.button} label="Transações" onClick={() => navigate('/transactions')} />
        <Button hoverIndicator className={styles.button} label="Gráficos" onClick={() => navigate('/graphs')} />
        <Button hoverIndicator className={styles.button} label="Calendário" onClick={() => navigate('/calendar')} />
      </div>
    </div>
  )
}
