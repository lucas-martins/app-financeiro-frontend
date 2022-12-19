import React from 'react'

import { Table, TableHeader, TableBody, TableRow, TableCell, Spinner, Card } from 'grommet'

import { transactionsFields } from './TransactionTableFields'
import { retrieveTransactions } from '../../Api'
import { UserContext } from '../../UserContext'

import styles from './TransactionTable.module.css'

export const TransactionTable = () => {
  const {transactions, setTransactions} = React.useContext(UserContext)
  const [transactionsUpdated, setTransactionsUpdated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function getTransactions() {
      setLoading(true)
      const response = await retrieveTransactions()
      if(response.status === 200) {
        const {data} = response
        setTransactions(data.reverse())
        setTransactionsUpdated(true)
      }
      setLoading(false)
    }
    if(!transactionsUpdated)
      getTransactions()
  }, [setTransactions, transactionsUpdated, setTransactionsUpdated])

  return (
    <>
        {
          loading && 
          <Spinner />
        }
        {
            !transactions.length && !loading &&
            <p>Você ainda não possui transações nas suas contas. Clique no botão "+" a direita para incluir uma transação.</p>
        }
        {
            transactions.length > 0 && !loading &&
            <Card>
              <Table>
                <TableHeader>
                    <TableRow>
                        {
                            transactionsFields.map(field => {
                                return (
                                    <TableCell 
                                        key={field.field}
                                        scope="col"
                                        border="bottom"
                                        size="large"
                                        align="center"
                                    >
                                        {field?.label}
                                    </TableCell>
                                )
                            })
                        }

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        transactions.map(transaction => {
                            return (
                                <TableRow key={transaction._id}>
                                    {
                                        transactionsFields.map(field => {
                                            return (
                                                <TableCell
                                                    key={field.field} 
                                                    scope="row"
                                                    size="large"
                                                    align="center"
                                                >
                                                    {
                                                        field.field === 'type' &&
                                                        <p>{transaction.type > 0 ? 'Receita' : 'Despesa'}</p>
                                                    }
                                                    {
                                                        field.field === 'date' ?
                                                        <p>{new Date(transaction.date).toLocaleDateString()}</p> :
                                                        <p 
                                                          className={
                                                            field.field === 'value' ?
                                                              transaction.type > 0 ? `${styles.revenue}` : `${styles.expense}`
                                                            : ''
                                                          }
                                                        >
                                                          {field.field !== 'type' && transaction[field.field]}
                                                        </p>
                                                    }
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
              </Table>
            </Card>
        }
    </>
  )
}
