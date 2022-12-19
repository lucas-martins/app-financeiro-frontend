import { baseUrl } from './Helpers/BaseUrl'
import { api } from './AxiosInterceptor'

const user = JSON.parse(window.localStorage.getItem('user'))

export const login = async (payload) => {
  return api.post(`${baseUrl}/login`, payload)
  .then((response) => response)
  .catch((error) => error)
}

// ---------- Accounts Endpoints ----------
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
  return api.delete(`${baseUrl}/removeAccount/${accountId}`, {data: {userId: user.id}})
  .then((response) => response)
  .catch((error) => error)
}

// ---------- Transactions Endpoints ----------
export const retrieveTransactions = async () => {
  return api.get(`${baseUrl}/retrieveTransactions/${user.id}`)
  .then((response) => response)
  .catch((error) => error)
}

export const addTransaction = async (payload) => {
  return api.post(`${baseUrl}/addTransaction`, payload)
  .then((response) => response)
  .catch((error) => error)
}

// ---------- Categories Endpoints ----------
export const retrieveCategories = async () => {
  return api.get(`${baseUrl}/retrieveCategories/${user.id}`)
  .then((response) => response)
  .catch((error) => error)
}

