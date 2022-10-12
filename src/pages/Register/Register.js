import React from 'react'
import styles from './Register.module.css'
import {Card, CardHeader, CardBody, Button, Form, FormField, TextInput, Box, Tip, Spinner} from 'grommet'
import { LinkPrevious, FormView, Hide } from 'grommet-icons'
import { toast } from 'react-toastify';

import { registerInputs } from './RegisterInputs'
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
  const [showFields, setShowFields] = React.useState([])

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
      setShowFields([])
      navigate('/login')
    })
    .catch((error) => {
      toast.error(error.response.data.message, toastConfig);
    })
    .finally(() => setLoading(false))
  }

  const handlePasswordButton = (field) => {
    showFields.includes(field) ? setShowFields(showFields.filter(x => x !== field)) : setShowFields([...showFields, field])
  }

  return (
    <div className="global-container user-container user-not-logged">
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
              registerInputs.map(input => {
                return (
                  <FormField key={input.name} name={input.name} htmlFor={input.name} label={input.label}>
                    <TextInput 
                      type={showFields.includes(input.name) ? 'text' : input.type}
                      id={input.name}
                      placeholder={input.placeholder}
                      name={input.name}
                    />
                    <div className={styles.password}>
                      {input.type === 'password' && 
                        <Button 
                          className={styles.passwordButton}
                          icon={showFields.includes(input.name) ? <Hide /> : <FormView />}
                          onClick={() => handlePasswordButton(input.name)}
                        />
                      }
                    </div>
                  </FormField>
                )
              })
            }
            <Box className={styles.buttonBox} direction="row" justify="between">
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
