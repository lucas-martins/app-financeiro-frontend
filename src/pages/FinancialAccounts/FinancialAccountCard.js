import React from 'react'
import { Card, CardBody, Button } from 'grommet'
import {Edit, Trash} from 'grommet-icons'

import styles from './FinancialAccountCard.module.css'

export const FinancialAccountCard = ({data}) => {
  const editAccount = () => {
    console.log('edit')
  }

  const removeAccount = () => {
    console.log('remove')
  }

  return (
    <Card className={styles.card}  background="dark-1">
      <CardBody>
        <div className={styles.card}>
          <div className={styles.accounts}>
            <h2>{data.accountName}</h2>
            <div >
              <Button icon={<Edit />} hoverIndicator onClick={() => editAccount()} />
              <Button icon={<Trash />} className={styles.icons} hoverIndicator onClick={() => removeAccount()} />
            </div>
          </div>
          <div className={`${styles.accounts} ${styles.items}`}>
            <span className={styles.title}>Saldo: </span>
            <span>{`R$ ${data.accountBalance}`}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
