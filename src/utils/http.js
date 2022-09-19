import axios from 'axios'

const http = axios.create({
  baseURL: 'https://sandbox.sdk.pagseguro.com/checkout-sdk',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_PUBLIC_KEY_SANDBOX}`,
    'Accept': 'application/json'
  }
})

axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000'

export default http