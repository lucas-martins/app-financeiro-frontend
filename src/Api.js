import { baseUrl } from './Helpers/BaseUrl'
import { api } from './AxiosInterceptor'

const user = JSON.parse(window.localStorage.getItem('user'))

export const login = async (payload) => {
  return api.post(`${baseUrl}/login`, payload)
  .then((response) => response)
  .catch((error) => error)
}

export const retrieveAccounts = async () => {
  return api.get(`${baseUrl}/retrieveAccounts/${user.id}`)
  .then((response) => response)
  .catch((error) => error)
}

export const addAccount = async (payload) => {
  return api.post(`${baseUrl}/addAccount`, payload)
  .then((response) => response)
  .catch((error) => error)
}

export const updateAccount = async (payload) => {
  return api.put(`${baseUrl}/updateAccount`, payload)
  .then((response) => response)
  .catch((error) => error)
}

export const removeAccount = async (accountId) => {
  console.log(accountId)

  return api.delete(`${baseUrl}/removeAccount/${accountId}`, {data: {userId: user.id}})
  .then((response) => response)
  .catch((error) => error)
}


