import axios from 'axios'
import { baseUrl } from './Helpers/BaseUrl'

export const login = async (payload) => {
    return axios.post(`${baseUrl}/login`, payload)
    .then((response) => response)
    .catch((error) => error)
}


