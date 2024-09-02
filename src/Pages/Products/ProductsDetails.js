/* eslint-disable no-mixed-operators */
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDetailsData } from '../../Hooks/useDetailsData'
import { Loading } from '../../Components/Loading/Loading'
import Footer from '../Footer/Footer'
import NavBar from '../../Components/NavBar/NavBar'

export const ProductsDetails = () => {
  const { id } = useParams()
  const { isLoading, data, error, isError, isFetching } = useDetailsData(id)

  return (
    <div>
      <NavBar />
      <Link className='btn btn-info m-2 pi pi-arrow-circle-left' style={{ fontSize: "1.5rem" }} to='/products'></Link>
      <h2 className='p-3 text-center'>Product details</h2>
      <h5 className='text-center text-info'>{data?.data.title}</h5>
      <div className="container">
        <div className="row">
          <div>
          </div>
          {isLoading || isFetching && <h2 className='pt-4 p-2'><Loading /></h2>}
          {isError && <h2 className='text-danger'>Error: {error.message}</h2>}
          {!isLoading && !isError && (
            <div className='col-lg-4 col-md-6 mb-4 m-auto mt-3'>
              <div className='p-3 border rounded h-100'>
                <p className='text-danger'>
                  <span className='fw-bold text-dark'>id : </span>
                  {data?.data.id}
                </p>
                {data.data.images && data.data.images.length > 0 && (
                  <img className='img-fluid mb-3' src={data.data.images[0]} alt="product" />
                )}
                <p className='text-danger mb-0'>
                  <span className='fw-bold text-dark'>title : </span>
                  {data?.data.title}
                </p>
                <p className='text-danger'>
                  <span className='fw-bold text-dark'>price : </span>
                  {data?.data.price}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
