
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query";

// users 
export const useFetchUsers = (onSuccess, onError) => {
    return useQuery(
        'users',
        fetchUsers,
        {
            onError,
            onSuccess
        });

}

const fetchUsers = () => {
    return axios.get('http://localhost:4000/users');
}
// mutation  and useQueryClient and invalidateQueries
const addUser = (user) => {
    return axios.post('http://localhost:4000/users', user)
}

export const useAddUers = () => {
    const queryClient = useQueryClient()
    return useMutation(addUser, {
        onSuccess: (data) => {
            
            //دا بيعمل جت للفانكش علي طول بعد الاضافه من غير ما اعمل ريفريش للصفحه 
            // queryClient.invalidateQueries('users')

            // update data without call get data 
            // يعني لما اعمل اضافه يوزر مش هيعمل جت تاني للداتا هترجع من غير جت فانكشن
            queryClient.setQueriesData('users', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data.data]
                }
            })
        }
    })
}