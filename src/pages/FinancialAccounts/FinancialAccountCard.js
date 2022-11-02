import React from 'react'
import { Card, CardBody, Button} from 'grommet'
import {Edit, Trash} from 'grommet-icons'

import styles from './FinancialAccountCard.module.css'
import { EditFinancialAccountModal } from './EditFinancialAccountModal'
import { RemoveFinancialAccountModal } from './RemoveFinancialAccountModal'

export const FinancialAccountCard = ({data, editingModal, removingModal, handleEditingCard, handleRemovingCard, setAccountUpdated}) => {
  const editAccount = () => handleEditingCard(data._id)

  const removeAccount = () => handleRemovingCard(data._id)

  const handleEditingCardModal = (data) => handleEditingCard(data)
  const handleRemovingCardModal = (data) => handleRemovingCard(data)

  return (
    <Card className={styles.card}  background="dark-1">
      <CardBody>
        <div className={styles.card}>
          <div className={styles.buttonContainer}>
            <Button icon={<Edit />} hoverIndicator onClick={() => editAccount()} />
            <Button icon={<Trash />} className={styles.icons} hoverIndicator onClick={() => removeAccount()} />
          </div>
          {
            editingModal === data._id ? 
              <EditFinancialAccountModal 
                data={data} 
                handleEditingCardModal={handleEditingCardModal}
                setAccountUpdated={setAccountUpdated}
              />
            : removingModal === data._id ? 
              <RemoveFinancialAccountModal
                data={data}
                handleRemovingCardModal={handleRemovingCardModal}
                setAccountUpdated={setAccountUpdated}
              />
            :
            <>
              <h2>{data.accountName}</h2>
              <div className={`${styles.accounts} ${styles.items}`}>
                <span className={styles.title}>Saldo: </span>
                <span>{`R$ ${data.accountBalance}`}</span>
              </div>
            </>
          }
        </div>
      </CardBody>
    </Card>
  )
}
