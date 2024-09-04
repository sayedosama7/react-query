
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from '../Utils/axios-utils'
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
    // return axios.get('http://localhost:4000/users');
    return request({
        url: '/users'
    })

}

// mutation  and useQueryClient and invalidateQueries
const addUser = (user) => {
    // return axios.post('http://localhost:4000/users', user)
    return request({
        url: '/users',
        method: 'post',
        data: user
    })

}

export const useAddUers = () => {
    const queryClient = useQueryClient()
    return useMutation(addUser, {
        // onSuccess: (data) => {

        //دا بيعمل جت للفانكش علي طول بعد الاضافه من غير ما اعمل ريفريش للصفحه 
        // queryClient.invalidateQueries('users')

        // update data without call get data 
        // يعني لما اعمل اضافه يوزر مش هيعمل جت تاني للداتا هترجع من غير جت فانكشن
        //     queryClient.setQueriesData('users', (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         }
        //     })
        // }

        // Optimistic Updates
        onMutate: async (newUser) => {
            await queryClient.cancelQueries('users')
            const previousUserData = queryClient.getQueryData('users')
            queryClient.setQueriesData('users', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data,
                    {
                        id: oldQueryData?.data?.lenght + 1, ...newUser
                    }
                    ]
                }
            })
            return {
                previousUserData
            }
        }
        ,

        onError: (_error, _user, context) => {
            queryClient.setQueriesData('users', context.previousUserData)
        },

        onSettled: () => {
            queryClient.invalidateQueries('users')

        }
    })
}


// delete function 
const deleteUser = (userId) => {
    // return axios.delete(`http://localhost:4000/users/${userId}`);
    return request({
        url: `/users/${userId}`,
        method: 'delete'
    })

}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteUser, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('users');
        },
        onError: (error) => {
            console.error("Error deleting user: ", error);
        }
    });
}


// edit function 
const updateUser = (user) => {
    return axios.put(`http://localhost:4000/users/${user.id}`, user);
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUser, {
        onSuccess: () => {
            // تحديث البيانات بدون جلب جديد
            queryClient.invalidateQueries('users');
        }
    });
};