import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncProductsOfCategory, getAllProductsByCategory, getCategoryProductsStatus } from '../../store/categorySlice';
import { STATUS } from '../../utils/status';

const CategoryProduct = () => {
  const { category } = useParams(); 
  const dispatch = useDispatch();

  const products = useSelector(getAllProductsByCategory);
  const status = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    if (category) {
      dispatch(fetchAsyncProductsOfCategory(category));
    }
  }, [dispatch, category]);

  return (
    <div className="category-products container py-5">
      <h2 className='text-capitalize mb-4'>Products in "{category}"</h2>

      {status === STATUS.LOADING && <p>Loading products...</p>}
      {status === STATUS.FAILED && <p>Failed to load products.</p>}
      {status === STATUS.SUCCEEDED && products.length === 0 && <p>No products found in this category.</p>}

      <div className='product-list grid'>
        {
          products.map(product => (
            <div key={product.id} className='product-card'>
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default CategoryProduct;
