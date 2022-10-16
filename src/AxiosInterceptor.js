import axios from 'axios'

const endpoints = ['addAccount']

const checkEndpoint = (url) => {
    return endpoints.some(endpoint => url.includes(endpoint))
}

// Add a request interceptor
export const api = axios.create()
api.interceptors.request.use(
  config => {
    const {id} = JSON.parse(window.localStorage.getItem('user'))

    if (id && checkEndpoint(config.url)) {
      config.data['userId'] = id
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)