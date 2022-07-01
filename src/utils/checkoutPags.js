import axios from 'axios'

const checkoutPags = axios.create({
  baseURL: 'https://ws.sandbox.pagseguro.uol.com.br/v2',
})
/*
checkoutPags.interceptors.request.use((config) => {

    //config.headers.Authorization = `Bearer ${token}`

  return config
})*/
/*
checkoutPags.defaults.headers.common['Accept'] = 'application/json';
checkoutPags.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';*/
//axios.defaults.headers.post['Content-Type'] = 'text/plain; charset=utf-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000/';

export default checkoutPags