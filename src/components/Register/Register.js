import React from 'react'
import styles from './Register.module.css'
import {Card, CardHeader, CardBody, Button, Form, FormField, TextInput, Box, Tip, Spinner} from 'grommet'
import { LinkPrevious } from 'grommet-icons'
import { toast} from 'react-toastify';

import { inputs } from './Inputs'
import { baseUrl } from '../../Helpers/BaseUrl'
import { toastConfig } from '../../config/ToastConfig';
import { UserContext } from '../../UserContext';

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const defaultValue = {
  fullName: '',
  email: '',
  userName: '',
  password: '',
  confirmPassword: ''
}


export const Register = () => {
  const [formValue, setFormValue] = React.useState(defaultValue);
  const [hasEmptyValues, setHasEmptyValues] = React.useState(true)
  const {loading, setLoading} = React.useContext(UserContext)

  const navigate = useNavigate()

  React.useEffect(() => {
    const values = Object.values(formValue)

    const hasEmptyValues = values.some(value => !value.length)
    const passwordMinLength = formValue.password.length < 6 
    const confirmPasswordMinLength = formValue.password.length < 6 
    const equalPasswords = formValue.password !== formValue.confirmPassword

    setHasEmptyValues(hasEmptyValues || passwordMinLength || confirmPasswordMinLength || equalPasswords || loading)
  }, [formValue, setHasEmptyValues, loading])

  const formSubmitted = (formValue) => {
    setLoading(true)
    axios.post(`${baseUrl}/registerUser`, formValue)
    .then((response) => {
      toast.success(response.data.message, toastConfig);
      setFormValue(defaultValue)
      navigate('/login')
    })
    .catch((error) => {
      toast.error(error.response.data.message, toastConfig);
    })
    .finally(() => setLoading(false))
  }

  return (
    <div className={`${styles.container} global-container`}>
      <Card height="large" width="large" background="dark-2">
        <CardHeader className={styles.header} pad="medium" background="dark-1">
          <Tip 
            content={
              <div className='tooltip'>
                <span>Voltar</span>
              </div>
            }
            dropProps={{
              align: { left: "right" }, 
            }}
          >
            <Button 
              icon={<LinkPrevious color="#eee" />}
              hoverIndicator
              onClick={() => navigate('/login')}
            />
          </Tip>
          <h1>Cadastro de Usuário</h1>
        </CardHeader>
        <CardBody pad="medium">
          <Form
            value={formValue}
            onChange={nextValue => setFormValue(nextValue)}
            onReset={() => setFormValue(defaultValue)}
            onSubmit={({ value }) => {formSubmitted(value)}}
          >
            {
              inputs.map(input => {
                return (
                  <FormField key={input.name} name={input.name} htmlFor={input.name} label={input.label}>
                    <TextInput type={input.type} id={input.name} placeholder={input.placeholder} name={input.name}/>
                  </FormField>
                )
              })
            }
            <Box direction="row" justify="between">
              <Button 
                type="submit"
                disabled={hasEmptyValues}
                primary
                label={loading ? <Spinner color="#eee" /> : 'Cadastrar'}
                color="#7D4CDB"
              />
              <Button type="reset" label="Limpar" color="#7D4CDB" />
            </Box>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
