import React from 'react'
import styles from './Register.module.css'
import {Card, CardHeader, CardBody, Button, Form, FormField, TextInput, Box, Tip} from 'grommet'
import { LinkPrevious } from 'grommet-icons'

import { inputs } from './Inputs'


export const Register = () => {
  const [formValue, setFormValue] = React.useState({
    fullName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: ''
  });

  const formSubmitted = (formValue) => {
    console.log(formValue)
  }

  return (
    <div className={styles.container}>
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
            <Button icon={<LinkPrevious color="#eee" />} hoverIndicator />
          </Tip>
          <h1>Cadastro de Usuário</h1>
        </CardHeader>
        <CardBody pad="medium">
          <Form
            value={formValue}
            onChange={nextValue => setFormValue(nextValue)}
            onReset={() => setFormValue({})}
            onSubmit={({ value }) => {formSubmitted(value)}}
          >
            {
              inputs.map(input => {
                return (
                  <FormField key={input.name} name={input.name} htmlFor={input.name} label={input.label}>
                    <TextInput type={input.type} id={input.name} placeholder={input.placeholder} name={input.name} />
                  </FormField>
                )
              })
            }
            <Box direction="row" justify="between">
              <Button type="submit" primary label="Cadastrar" />
              <Button type="reset" label="Limpar" />
            </Box>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
