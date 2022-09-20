import React from 'react'
import { Card, CardHeader, CardBody, Button, Form, FormField, TextInput, Box, Spinner } from 'grommet'
import { FormView, Hide } from 'grommet-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

import {loginInputs} from './LoginInputs'
import { baseUrl } from '../../Helpers/BaseUrl'
import { toastConfig } from '../../config/ToastConfig';
import { UserContext } from '../../UserContext'
import styles from './Login.module.css'

const defaultValue = {
  email: '',
  password: '',
}

export const Login = () => {
  const navigate = useNavigate()

  const [formValue, setFormValue] = React.useState(defaultValue);
  const [hasEmptyValues, setHasEmptyValues] = React.useState(true)
  const [showPassword, setShowPassword] = React.useState([])

  const {loading, setLoading} = React.useContext(UserContext)

  React.useEffect(() => {
    const values = Object.values(formValue)

    const hasEmptyValues = values.some(value => !value.length)
    const passwordMinLength = formValue.password.length < 6

    setHasEmptyValues(hasEmptyValues || passwordMinLength || loading)
  }, [formValue, setHasEmptyValues, loading])

  const formSubmitted = (formValue) => {
    setLoading(true)
    axios.post(`${baseUrl}/login`, formValue)
    .then(({data}) => {
      console.log(data)
      window.localStorage.setItem('user_id', data.user.id)
      window.localStorage.setItem('token', data.token)
      toast.success('Login realizado com sucesso!', toastConfig);
      setFormValue(defaultValue)
      setShowPassword([])
      navigate('/home')
    })
    .catch((error) => {
      toast.error(error.response.data.message, toastConfig);
    })
    .finally(() => setLoading(false))
  }

  const handlePasswordButton = (field) => {
    showPassword.includes(field) ? setShowPassword(showPassword.filter(x => x !== field)) : setShowPassword([...showPassword, field])
  }

  return (
    <div className='global-container user-container'>
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
