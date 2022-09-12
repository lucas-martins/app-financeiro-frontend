import React from 'react'
import styles from './Register.module.css'
import {Card, CardHeader, CardBody, Button, Form, FormField, TextInput, Box} from 'grommet'

export const Register = () => {
  const [formValue, setFormValue] = React.useState({});

  // const formSubmitted = (formValue) => {
  //   console.log(formValue)
  // }

  return (
    <div className={styles.container}>
      <Card height="large" width="large" background="dark-2">
        <CardHeader pad="medium" background="dark-1">
          <h1>Cadastro de Usuário</h1>
        </CardHeader>
        <CardBody pad="medium">
          <Form
            value={formValue}
            onChange={nextValue => setFormValue(nextValue)}
            onReset={() => setFormValue({})}
            onSubmit={({ value }) => {console.log(value)}}
          >
            <FormField name="fullName" htmlFor="fullName" label="Nome">
              <TextInput id="fullName" placeholder="Ex: João da Silva" name="fullName" />
            </FormField>
            <FormField name="email" htmlFor="email" label="E-mail">
              <TextInput id="email" placeholder="Ex: joao.silva@gmail.com" name="email" />
            </FormField>
            <FormField name="userName" htmlFor="userName" label="Nome de Usuário">
              <TextInput id="userName" placeholder="Ex: joao.silva" name="userName" />
            </FormField>
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
