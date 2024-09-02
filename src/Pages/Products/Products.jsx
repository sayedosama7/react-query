/* eslint-disable no-mixed-operators */
import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { Loading } from '../../Components/Loading/Loading';
import Footer from '../Footer/Footer';
import { useProductsData } from '../../Hooks/useProductsData';
import { Link } from 'react-router-dom';

const Products = () => {

  const onSuccess = (data) => {
    console.log('data is fetched', data);
  }

  const onError = (error) => {
    console.log('error', error);
  }

  // eslint-disable-next-line no-unused-vars
  const { isLoading, data, error, isError, refetch, isFetching } = useProductsData(onSuccess, onError)

  return (
    <div>
      <NavBar />
      <h2 className='p-3 text-center'>Products</h2>
      <div className="container">
        <div className="row">
          <div>
            {/* <button onClick={refetch}   className='btn btn-info mb-3'>fetch products</button>  */}
          </div>
          {isLoading || isFetching && <h2 className='pt-4 p-2'><Loading /></h2>}
          {isError && <h2 className='text-danger'>Error: {error.message}</h2>}
          {!isLoading && !isError && (
            data.data.slice(3, 31).map((product) => (
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
