import React from 'react'
import { Button, Box } from 'grommet'
import { FinancialAccountCard } from './FinancialAccountCard'
import { retrieveAccounts } from '../../Api'

import styles from './FinancialAccounts.module.css'
import { FinancialAccountModal } from './FinancialAccountModal'
import { UserContext } from '../../UserContext'

export const FinancialAccounts = () => {

  const [show, setShow] = React.useState(false);
  const [editingModal, setEditingModal] = React.useState('')
  const [removingModal, setRemovingModal] = React.useState('')
  const [accountUpdated, setAccountUpdated] = React.useState(false)

  const {accounts, setAccounts} = React.useContext(UserContext)

  React.useEffect(() => {
    async function getAccounts() {
      const response = await retrieveAccounts()
      if(response.status === 200) {
        const {data} = response
        setAccounts(data)
        setAccountUpdated(true)
      }
    }

    if(!accountUpdated)
      getAccounts()
  }, [setAccounts, accountUpdated, setAccountUpdated])

  const handleModalStatus = (status) => setShow(status)
  const handleEditingCard = (id) => setEditingModal(id)
  const handleRemovingCard = (id) => setRemovingModal(id)

  return (
    <div className='user-container user-logged'>
      <div className='user-inside-container'>
        <div className={styles.title}>
          <h3>Minhas Contas</h3>
          <Box>
            <Button
              primary
              className={styles.button}
              label='Adicionar Conta'
              onClick={() => setShow(true)}
            />
            {show && (
              <FinancialAccountModal handleModalStatus={handleModalStatus} />
            )}
          </Box>

        </div>
        <div className={styles.container}>
          {
            accounts.map(account => 
              <FinancialAccountCard
                key={account._id}
                data={account}
                editingModal={editingModal}
                removingModal={removingModal}
                handleEditingCard={handleEditingCard}
                handleRemovingCard={handleRemovingCard}
                setAccountUpdated={setAccountUpdated}
              />)
          }
        </div>
      </div>
    </div>
  )
}
