import React from 'react'

import styles from './FinancialAccountCard.module.css'

export const FinancialAccountCard = ({data}) => {
  return (
    <div className={styles.card}>
        <div className={styles.accounts}>
          <span>Conta</span>
          <span>Saldo</span>
        </div>
        <div className={`${styles.accounts} ${styles.items}`}>
          <span>{data.accountName}</span>
          <span>{`R$ ${data.accountBalance}`}</span>
        </div>
    </div>
  )
}
