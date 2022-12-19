import React from 'react'
import { TransactionTable } from '../../components/Transactions/TransactionTable'
import { TransactionAddModal } from '../../components/Transactions/TransactionAddModal'

import { Button } from 'grommet'
import { Add } from 'grommet-icons'
import styles from './Transactions.module.css'

export const Transactions = () => {
  const [transctionModal, setTransactionModal] = React.useState(false);

  const handleModalStatus = (status) => setTransactionModal(status)

  return (
    <div className='user-container user-logged'>
       <div className='user-inside-container'>
          <Button
            primary
            icon={<Add />}
            a11yTitle="Adicionar"
            className={styles.addTransaction}
            onClick={() => setTransactionModal(true)}
          />
          {transctionModal &&
            (
              <TransactionAddModal handleModalStatus={handleModalStatus} />
            )
          }
          <h3>Transações</h3>
          <TransactionTable />
       </div>
    </div>
  )
}
