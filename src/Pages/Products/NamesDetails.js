/* eslint-disable no-mixed-operators */
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loading } from '../../Components/Loading/Loading'
import Footer from '../Footer/Footer'
import NavBar from '../../Components/NavBar/NavBar'
import { Queries } from '../../Hooks/useNameData'

export const NamesDetails = () => {
    const { id } = useParams()
    const { isLoading, data: names, error, isError, isFetching } = Queries(id)

    return (
        <div>
            <NavBar />
            <Link className='btn btn-info m-2 pi pi-arrow-circle-left' style={{ fontSize: "1.5rem" }} to='/queries'></Link>
            <h2 className='p-3 text-center'>data details</h2>
            <div className="container">
                <div className="row">
                    {isLoading || isFetching && <h2 className='pt-4 p-2'><Loading /></h2>}
                    {isError && <h2 className='text-danger'>Error: {error.message}</h2>}
                    {!isLoading && !isError && names && (
                        <div className='col-lg-4 col-md-6 mb-4 m-auto mt-3'>
                            <div className='p-3 border rounded h-100'>
                                <p className='text-danger'>
                                    <span className='fw-bold text-dark'>id : </span>
                                    {names.id}
                                </p>
                                <p className='text-danger mb-0'>
                                    <span className='fw-bold text-dark'>title : </span>
                                    {names.title}
                                </p>
                                <p className='text-danger'>
                                    <span className='fw-bold text-dark'>completed : </span>
                                    {names.completed ? 'true' : 'false'}
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
