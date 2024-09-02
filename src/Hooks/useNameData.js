import axios from 'axios'
import { useQuery } from 'react-query'
import { data } from '../Components/Api/Api'

const fetchDataById = async (id) => {
    const response = await axios.get(`${data}/${id}`)
    return response.data
}

export const Queries = (id) => {
    return useQuery(['nameData', id], () => fetchDataById(id), {
    })
}
