import axios from 'axios'

const endpoints = ['addAccount']

const checkEndpoint = (url) => {
    return endpoints.some(endpoint => url.includes(endpoint))
}

// Add a request interceptor
export const api = axios.create()
api.interceptors.request.use(
  config => {
    const user = JSON.parse(window.localStorage.getItem('user'))

    if (user?.id && checkEndpoint(config.url)) {
      config.data['userId'] = user.id
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)