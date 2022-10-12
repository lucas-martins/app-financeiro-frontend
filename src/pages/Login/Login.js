import React from 'react'
import { Card, CardHeader, CardBody, Button, Form, FormField, TextInput, Box, Spinner } from 'grommet'
import { FormView, Hide } from 'grommet-icons'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import {loginInputs} from './LoginInputs'
import { toastConfig } from '../../config/ToastConfig';
import { UserContext } from '../../UserContext'
import styles from './Login.module.css'
import { login } from '../../Api'

const defaultValue = {
  email: '',
  password: '',
}

export const Login = () => {
  const navigate = useNavigate()

  const [formValue, setFormValue] = React.useState(defaultValue);
  const [hasEmptyValues, setHasEmptyValues] = React.useState(true)
  const [showPassword, setShowPassword] = React.useState([])

  const {loading, setLoading, setToken} = React.useContext(UserContext)

  React.useEffect(() => {
    const values = Object.values(formValue)

    const hasEmptyValues = values.some(value => !value.length)
    const passwordMinLength = formValue.password.length < 6

    setHasEmptyValues(hasEmptyValues || passwordMinLength || loading)
  }, [formValue, setHasEmptyValues, loading])

  const formSubmitted = async (formValue) => {
    setLoading(true)

    const response = await login(formValue)
    const {data, error} = response

    if(response.status === 200) {
      window.localStorage.setItem('user_id', JSON.stringify(data.user))
      window.localStorage.setItem('token', data.token)
      toast.success('Login realizado com sucesso!', toastConfig);
      setFormValue(defaultValue)
      setShowPassword([])
      setToken(true)
      navigate('/home')
    } else {
      toast.error(error.response.data.message, toastConfig);
    }

    setLoading(false)
  }

  const handlePasswordButton = (field) => {
    showPassword.includes(field) ? setShowPassword(showPassword.filter(x => x !== field)) : setShowPassword([...showPassword, field])
  }

  return (
    <div className='global-container user-container user-not-logged'>
      <Card height="large" width="large" background="dark-2">
        <CardHeader className={styles.header} pad="medium" background="dark-1">
            <h1>Faça Login</h1>
        </CardHeader>
        <CardBody pad="medium">
          <Form
            value={formValue}
            onChange={nextValue => setFormValue(nextValue)}
            onReset={() => setFormValue(defaultValue)}
            onSubmit={({ value }) => {formSubmitted(value)}}
          >
            {
              loginInputs.map(input => {
                return (
                  <FormField key={input.name} name={input.name} htmlFor={input.name} label={input.label}>
                    <TextInput 
                      type={showPassword.includes(input.name) ? 'text' : input.type}
                      id={input.name}
                      placeholder={input.placeholder}
                      name={input.name}
                    />
                    <div className="password">
                      {input.type === 'password' && 
                        <Button 
                          className="passwordButton"
                          icon={showPassword.includes(input.name) ? <Hide /> : <FormView />}
                          onClick={() => handlePasswordButton(input.name)}
                        />
                      }
                    </div>
                  </FormField>
                )
              })
            }
            <Box className="buttonBox" direction="row" justify="between">
              <Button 
                type="submit"
                disabled={hasEmptyValues}
                primary
                label={loading ? <Spinner color="#eee" /> : 'Entrar'}
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
          <div style={{height: '100%'}}>
            <div className={styles.lineDots}>
              <div className={styles.dotsLeft}></div>
              <span>ou</span>
              <div className={styles.dotsRight}></div>
            </div>
            <div className={styles.createAccount}>
              <h4 className={styles.title}>Crie uma Conta</h4>
              <p className={styles.description}>Ainda não tem conta no App Financeiro</p>
              <Button 
                secondary 
                color="#6FFFB0" 
                hoverIndicator 
                label="Cadastre-se"
                style={{width: '40%'}}
                onClick={() => navigate('/register')} />
            </div>
          </div>
        </CardBody>

      </Card>
    </div>
  )
}
