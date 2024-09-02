/* eslint-disable no-mixed-operators */
import axios from 'axios'
import React, { useState } from 'react'
import { baseURL, data } from '../Components/Api/Api'
import { useQuery } from 'react-query'
import { Loading } from '../Components/Loading/Loading'
import NavBar from '../Components/NavBar/NavBar'
import { Link } from 'react-router-dom'


const fetchProducts = () => {
    return axios.get(`${baseURL}`)
}

const fetchData = (pageNumber) => {
    return axios.get(`${data}?_limit=5&_page=${pageNumber}`)
}

export const Queries = () => {

    const [pageNumber, setPageNumber] = useState(1)
    const { data: products, isLoading, isError, error, isFetching } = useQuery('allproduct', fetchProducts)
    const { data: names } = useQuery(['alldata', pageNumber], () => fetchData(pageNumber), {
        keepPreviousData: true,
    })

    
    return (
        <div>

            <NavBar />
            <h2 className='p-3 text-center'>Products</h2>
            <div className="container">
                <div className="row">
                    {isLoading || isFetching && <h2 className='pt-4 p-2'><Loading /></h2>}
                    {isError && <h2 className='text-danger'>Error: {error.message}</h2>}
                    {!isLoading && !isError && (
                        products.data.slice(3, 7).map((product) => (
                            <div key={product.id} className='col-lg-3 col-md-6 mb-4'>
                                <div className='p-3 border rounded h-100'>
                                    <img className='img-fluid' src={product.images[0]} alt="product" />
                                    <h5 className='mt-2'>{product.title}</h5>
                                    <p>
                                        <span>price : </span>
                                        {product.price}
                                    </p>
                                    <Link to={`/products-details/${product.id}`}>details</Link>
                                </div>
                            </div>
                        ))
                    )}


                    {/* names data loop   */}
                    <h2 className='p-3 text-center'>toodos</h2>
                    {names && names.data.slice(1, 5).map((name, index) => (
                        <div key={name.id} className='col-lg-3 col-md-6 mb-4'>
                            <div className='p-3 border rounded h-100'>
                                <h5 className='mt-2'><span className='text-info'>Id : </span> {name.id}</h5>
                                <h5 className='mt-2'>{name.title}</h5>
                                <p>
                                    <span>completed : </span>
                                    {name.completed ? 'true' : 'false'}
                                </p>
                                <Link to={`/name-details/${name.id}`}>details</Link>
                            </div>
                        </div>
                    ))}

                    {/* btn pagination  */}
                    <div className="d-flex">

                        <button className='btn btn-info mr-2'
                            onClick={() => setPageNumber((page) => page - 1)}
                            disabled={pageNumber === 1}>
                            prev page
                        </button>

                        <button className='btn btn-info'
                            onClick={() => setPageNumber((page) => page + 1)}
                            disabled={pageNumber === 5}>
                            next page
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}
