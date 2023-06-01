import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.12.6:3333'
})

api.interceptors.response.use(response => response, error => {
  //verificando se o backend tem essa menssagem de erro pronta
  if(error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(new AppError(error))
  }
})


export { api };

