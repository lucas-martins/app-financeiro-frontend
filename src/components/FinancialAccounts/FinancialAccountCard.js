import React from 'react'

import styles from './FinancialAccountCard.module.css'

export const FinancialAccountCard = () => {
  const balance = 1000

  return (
    <div className={styles.card}>
        <div className={styles.accounts}>
          <span>Conta</span>
          <span>Saldo</span>
        </div>
        <div className={`${styles.accounts} ${styles.items}`}>
          <span>Itau</span>
          <span>{`R$ ${balance}`}</span>
        </div>
    </div>
  )
}
