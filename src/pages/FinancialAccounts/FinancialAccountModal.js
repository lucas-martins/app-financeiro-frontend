import React from 'react'
import { Box, Button, Layer, Form, FormField, TextInput, Spinner } from 'grommet'
import { Close } from 'grommet-icons'
import { toast } from 'react-toastify';
import { toastConfig } from '../../config/ToastConfig';

import { addAccount, retrieveAccounts } from '../../Api'

import { UserContext } from '../../UserContext'
import { accountInputs } from './AccountInputs'

import styles from './FinancialAccountModal.module.css'

const defaultValue = {
  accountName: '',
  accountBalance: '',
}

export const FinancialAccountModal = ({handleModalStatus}) => {
	const [formValue, setFormValue] = React.useState(defaultValue);
  const [hasEmptyValues, setHasEmptyValues] = React.useState(true)

	const {loading, setLoading, setAccounts} = React.useContext(UserContext)

	React.useEffect(() => {
    const values = Object.values(formValue)

    const hasEmptyValues = values.some(value => !value.length)

    setHasEmptyValues(hasEmptyValues || loading)
  }, [formValue, setHasEmptyValues, loading])

	const handleFormSubmit = async (formValue) => {
		setLoading(true)

		const response = await addAccount(formValue)
		const {data, error} = response

		if(response.status === 200) {
			const response = await retrieveAccounts()
      if(response.status === 200) setAccounts(response.data)

      toast.success(data.message, toastConfig);
      setFormValue(defaultValue)
    } else {
      toast.error(error.response.data.message, toastConfig);
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
			className={styles.modalBox}
 		>
    	<Button 
				icon={<Close />} 
				onClick={() => handleModalStatus(false)}
				className={styles.closeButton}
			/>
    	<h1>Adicionar Conta</h1>
			<Form
				value={formValue}
				onChange={nextValue => setFormValue(nextValue)}
				onReset={() => setFormValue(defaultValue)}
				onSubmit={({ value }) => {handleFormSubmit(value)}}
			>
				{
					accountInputs.map(input => {
						return (
							<FormField key={input.name} name={input.name} htmlFor={input.name} label={input.label}>
								<TextInput 
									type={input.type}
									id={input.name}
									placeholder={input.placeholder}
									name={input.name}
								/>
							</FormField>
						)
					})
				}
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
			{/* <div className={styles.addAccount}>
				<Button
					primary
					label="Adicionar"
					onClick={() => addAccount()}
				/>
			</div> */}
  	</Layer>
  )
}
