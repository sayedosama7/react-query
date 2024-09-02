/* eslint-disable no-mixed-operators */
import axios from 'axios'
import React, { Fragment } from 'react'
import { data } from '../Components/Api/Api'
import { useInfiniteQuery } from 'react-query'
import { Loading } from '../Components/Loading/Loading'
import NavBar from '../Components/NavBar/NavBar'

const fetchData = ({ pageParam = 1 }) => {
    return axios.get(`${data}?_limit=4&_page=${pageParam}`)
}

export const InfiniteQueries = () => {

    const { data, isLoading, isFetching, isError, error, hasNextPage, fetchNextPage } = useInfiniteQuery('alldata', fetchData, {
        // keepPreviousData: true,
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < 100) {
                return pages.length + 1
            } else {
                return undefined
            }
        }
    })
    return (
        <div>

            <NavBar />
            <h2 className='p-3 text-center'>Products</h2>
            <div className="container">
                <div className="row">
                    {isLoading || isFetching && <h2 className='pt-4 p-2'><Loading /></h2>}
                    {isError && <h2 className='text-danger'>Error: {error.message}</h2>}

                    {/*  data loop   */}
                    <h2 className='p-3 text-center'>toodos</h2>
                    {data?.pages.map((group, index) => (
                        <Fragment key={index}>
                            {group.data.map(data => (
                                <div key={data.id} className=' col-lg-3 col-md-6 mb-4'>
                                    <div className='p-3 border rounded h-100'>
                                        <h5 className='mt-2'><span className='text-info'>Id : </span> {data.id}</h5>
                                        <h5 className='mt-2'>{data.title}</h5>
                                        <p>
                                            <span>completed : </span>
                                            {data.completed ? 'true' : 'false'}
                                        </p>
                                    </div>
                                </div>
                            ))
                            }
                        </Fragment>
                    ))}

                </div>
                <button className='btn btn-info w-25 m-auto mb-5 d-block' disabled={!hasNextPage} onClick={fetchNextPage}>load more</button>
            </div>
        </div>
    )
}
