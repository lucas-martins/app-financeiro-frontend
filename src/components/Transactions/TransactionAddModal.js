import React from 'react'
import { Box, Button, Layer, Form, FormField, TextInput, Spinner, Select, DateInput } from 'grommet'
import { Close } from 'grommet-icons'
import { toast } from 'react-toastify';

import { UserContext } from '../../UserContext';
import { retrieveCategories, retrieveAccounts, retrieveTransactions, addTransaction } from '../../Api';

import modalStyles from '../../shared/ModalStyle.module.css'
import styles from './TransactionAddModal.module.css'

const defaultValue = {
  date: new Date().toISOString(),
  description: '',
  category: '',
  accountName: '',
  type: '',
  value: '',
}

const user = JSON.parse(window.localStorage.getItem('user'))

export const TransactionAddModal = ({handleModalStatus}) => {
  const [formValue, setFormValue] = React.useState(defaultValue);
  const [hasEmptyValues, setHasEmptyValues] = React.useState(true)
  const [categories, setCategories] = React.useState([])
  const [accounts, setAccounts] = React.useState([])
  const [accountNames, setAccountsNames] = React.useState([])


  const {loading, setLoading, setTransactions} = React.useContext(UserContext)

  React.useEffect(() => {
    const getUserInfo = async () => {
      let response
      response = await retrieveCategories()
      if(response.status === 200) {
        const {data} = response
        const categories = data.map(category => category.categoryName)
        setCategories(categories)
      }

      response = await retrieveAccounts()
      if(response.status === 200) {
        const {data} = response
        const accountsNames = data.map(account => account.accountName)
        setAccounts(data)
        setAccountsNames(accountsNames)
      }
    }

    getUserInfo()
  }, [])

  React.useEffect(() => {
    const values = Object.values(formValue)

    const hasEmptyValues = values.some(value => value.length === 0)

    setHasEmptyValues(hasEmptyValues || loading)
  }, [formValue, setHasEmptyValues, loading])

  const handleFormSubmit = async (formValue) => {
		setLoading(true)
    const account = accounts.find(account => {
      if(account.accountName === formValue.accountName) return account._id
      else return null
    })

    const {date, description, category, type, value} = formValue

    const payload = {
      userId: user.id,
      accountId: account._id,
      date,
      description,
      category,
      type: type === 'Despesa' ? -1 : 1,
      value: Number(value)
    }

		const response = await addTransaction(payload)
		const {data, error} = response

		if(response.status === 200) {
			const response = await retrieveTransactions()
      setTransactions(response.data.reverse())
			toast.success(data.message);
			setFormValue(defaultValue)
		} else {
			toast.error(error.response.data.message,);
		}

		setLoading(false)
		handleModalStatus(false)
	}

  return (
    <Layer
      onEsc={() => handleModalStatus(false)}
      onClickOutside={() => handleModalStatus(false)}
      full="horizontal"
      margin="large"
      hoverIndicator
      className={modalStyles.modalBox}
	  >
      <Button 
        icon={<Close />} 
        onClick={() => handleModalStatus(false)}
        className={modalStyles.closeButton}
      />
      <h1>Adicionar Transação</h1>
      <Form
			value={formValue}
			onChange={nextValue => setFormValue(nextValue)}
			onReset={() => setFormValue(defaultValue)}
			onSubmit={({ value }) => {handleFormSubmit(value)}}
		>
      <div className={styles.container}>
        <FormField name="type" htmlFor="type" label="Tipo">
          <Select
            options={['Despesa', 'Receita']}
            id="type"
            placeholder="Informe o tipo da transação"
            name="type"
          />
        </FormField>
        <FormField name="description" htmlFor="description" label="Descrição">
          <TextInput
            type="text"
            id="description"
            placeholder="Informe a descrição da transação"
            name="description"
          />
        </FormField>
        <FormField name="category" htmlFor="category" label="Categoria">
          <Select
            options={categories}
            id="category"
            placeholder="Informe a categoria da transação"
            name="category"
          />
        </FormField>
        <FormField name="accountName" htmlFor="accountName" label="Conta">
          <Select
            options={accountNames}
            id="accountName"
            placeholder="Informe a conta da transação"
            name="accountName"
          />
        </FormField>
        <FormField name="date" htmlFor="date" label="Data">
          <DateInput
            format="dd/mm/yyyy"
            id="date"
            placeholder="Informe a data da transação"
            name="date"
            calendarProps={
              {
                locale: "pt-br",
                alignSelf: "center",
                daysOfWeek: true,
                fill: true
              }
            }
          />
        </FormField>
        <FormField name="value" htmlFor="value" label="Valor">
          <TextInput
            type="number"
            id="value"
            placeholder="Informe o valor da transação"
            name="value"
          />
        </FormField>
      </div>

			<Box className="buttonBox" direction="row" justify="between">
				<Button 
					type="submit"
          disabled={hasEmptyValues}
					primary
					label={loading ? <Spinner color="#eee" /> : 'Adicionar'}
					color="#7D4CDB"
					style={{width: '40%', display: 'flex', justifyContent: 'center'}}
				/>
				<Button 
					type="reset"
					label="Limpar"
					color="#7D4CDB"
					style={{width: '40%'}}
				/>
			</Box>
		</Form>
    </Layer>
  )
}
