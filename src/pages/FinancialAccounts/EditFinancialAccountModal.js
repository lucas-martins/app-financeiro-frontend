import React from 'react'
import {Layer, Form, FormField, TextInput, Box, Button, Spinner } from 'grommet'
import {Close} from 'grommet-icons'
import { toast } from 'react-toastify';
import { UserContext } from '../../UserContext';

import styles from './EditFinancialAccountModal.module.css'

import { updateAccount } from '../../Api';

export const EditFinancialAccountModal = ({data, handleEditingCardModal, setAccountUpdated}) => {
  const [formValue, setFormValue] = React.useState({
    accountName: data.accountName,
    accountBalance: data.accountBalance,
  });
  const [hasEmptyValues, setHasEmptyValues] = React.useState(false)
    
  const {loading, setLoading} = React.useContext(UserContext)

  React.useEffect(() => {
    const values = Object.values(formValue)

    const hasEmptyValues = values.some(value => !String(value).length)

    setHasEmptyValues(hasEmptyValues || loading)
  }, [formValue, setHasEmptyValues, loading])

  const handleFormSubmit = async ({accountName, accountBalance}) => {
    setLoading(true)

    const obj = {
      userId: data.userId,
      accountId: data._id,
      accountName,
      accountBalance
    }

    const response = await updateAccount(obj)

    if(response.status === 200) {
      setAccountUpdated(false)
      toast.success('Conta alterada com sucesso!');
    } else {
      toast.error(response.error.response.data.message);
    }

    setLoading(false)
    handleEditingCardModal(false)
  }

  return (
    <Layer
    onEsc={() => handleEditingCardModal(false)}
    onClickOutside={() => handleEditingCardModal(false)}
    full="horizontal"
    margin="large"
    hoverIndicator
    className={styles.modalBox}
   >
    <Button 
    icon={<Close />} 
    onClick={() => handleEditingCardModal(false)}
    className={styles.closeButton}
  />
    <h1>Editar Conta</h1>
    <Form
      value={formValue}
      onChange={nextValue => setFormValue(nextValue)}
      onSubmit={({ value }) => {handleFormSubmit(value)}}
    >
      <FormField name="accountName" htmlFor="accountName" label="Conta">
        <TextInput 
          type="text"
          id="accountName"
          placeholder="Informe o nome da sua conta"
          name="accountName"
        />
      </FormField>
      <FormField name="accountBalance" htmlFor="accountBalance" label="Valor">
        <TextInput 
          type="number"
          id="accountBalance"
          placeholder="Informe o saldo da sua conta"
          name="accountBalance"
        />
      </FormField>
      <Box className="buttonBox" direction="row" justify="between">
        <Button 
          type="submit"
          disabled={hasEmptyValues}
          primary
          label={loading ? <Spinner color="#eee" /> : 
            <span>
              Editar
            </span>}
          color="#7D4CDB"
          style={{width: '40%', display: 'flex', justifyContent: 'center'}}
        />
      </Box>
    </Form>
  </Layer>
  )
}
