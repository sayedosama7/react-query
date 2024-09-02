import axios from 'axios'
import { useQuery } from 'react-query'
import { baseURL } from '../Components/Api/Api'

const fetchData = (id) => {
  return axios.get(`${baseURL}/${id}`)
}

export const useDetailsData = (id) => {
  return useQuery(['product', id], () => fetchData(id))
}















