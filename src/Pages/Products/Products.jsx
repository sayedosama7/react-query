import React from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Loading } from '../../Components/Loading/Loading';
import Footer from '../Footer/Footer';
import { baseURL } from '../../Components/Api/Api';

const Products = () => {
  const fetchData = () => {
    return axios.get(`${baseURL}`);
  };

  const { isLoading, data, error } = useQuery('products', fetchData);

  return (
    <div>
      <NavBar />
      <h2 className='p-3'>Products</h2>
      <div className="container">
        <div className="row">
          {isLoading && <h2 className='pt-4 p-2'><Loading /></h2>}
          {error && <h2>Error: {error.message}</h2>}
          {!isLoading && !error && (
            data?.data.slice(1, 29).map((product) => (
              <div key={product.id} className='col-lg-3 col-md-6 mb-4'>
                <div className='p-3 border rounded h-100'>
                  <img className='img-fluid' src={product.images[0]} alt="product" />
                  <h5 className='mt-2'>{product.title}</h5>
                  <p>{product.price}</p>
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
