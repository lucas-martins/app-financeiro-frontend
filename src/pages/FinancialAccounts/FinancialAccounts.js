import React from 'react'
import { Button } from 'grommet'
import { FinancialAccountCard } from './FinancialAccountCard'
import { retrieveAccounts } from '../../Api'

import styles from './FinancialAccounts.module.css'

export const FinancialAccounts = () => {

  const [accounts, setAccounts] = React.useState([])

  const addAccount = () => {
    console.log('added')
  }

  React.useEffect(() => {
    async function getAccounts() {
      const response = await retrieveAccounts()
      if(response.status === 200) {
        const {data} = response
        setAccounts(data)
      }
    }

    getAccounts()
  }, [])

  return (
    <div className='user-container user-logged'>
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
        {
          accounts.map(account => <FinancialAccountCard key={account._id} data={account} />)
        }
      </div>
    </div>
  )
}
