import axios from 'axios'
import { baseUrl } from './Helpers/BaseUrl'

const user = JSON.parse(window.localStorage.getItem('user'))

export const login = async (payload) => {
    return axios.post(`${baseUrl}/login`, payload)
    .then((response) => response)
    .catch((error) => error)
}

export const retrieveAccounts = async () => {
  return axios.get(`${baseUrl}/retrieveAccounts/${user.id}`)
  .then((response) => response)
  .catch((error) => error)

}


