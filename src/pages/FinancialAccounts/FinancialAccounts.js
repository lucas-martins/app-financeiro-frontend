import React from 'react'
import { Button } from 'grommet'
import { FinancialAccountCard } from './FinancialAccountCard'

import styles from './FinancialAccounts.module.css'

export const FinancialAccounts = () => {

  const addAccount = () => {
    console.log('added')
  }

  return (
    <div className='user-container'>
      <div className='user-inside-container'>
        <div className={styles.title}>
          <h3>Minhas Contas</h3>
          <Button
            primary 
            className={styles.button}
            label='Adicionar Conta'
            onClick={() => addAccount()}
          />
        </div>
        <FinancialAccountCard />
      </div>
    </div>
  )
}
