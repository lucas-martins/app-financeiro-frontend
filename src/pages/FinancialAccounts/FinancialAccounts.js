import React from 'react'
import { Button, Box } from 'grommet'
import { FinancialAccountCard } from './FinancialAccountCard'
import { retrieveAccounts } from '../../Api'

import styles from './FinancialAccounts.module.css'
import { FinancialAccountModal } from './FinancialAccountModal'
import { UserContext } from '../../UserContext'

export const FinancialAccounts = () => {

  const [show, setShow] = React.useState(false);

  const {accounts, setAccounts} = React.useContext(UserContext)

  React.useEffect(() => {
    async function getAccounts() {
      const response = await retrieveAccounts()
      if(response.status === 200) {
        const {data} = response
        setAccounts(data)
      }
    }

    getAccounts()
  }, [setAccounts])

  const handleModalStatus = (status) => setShow(status)

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
        {
          accounts.map(account => <FinancialAccountCard key={account._id} data={account} />)
        }
      </div>
    </div>
  )
}
