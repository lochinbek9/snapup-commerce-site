import React, { useEffect } from 'react';
import "./Sidebar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  console.log("Sidebar categories:", categories); 

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button
        type="button"
        className='sidebar-hide-btn'
        onClick={() => dispatch(setSidebarOff())}
      >
        <i className='fas fa-times'></i>
      </button>

      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>

        <ul className='cat-list'>
          {
            Array.isArray(categories) && categories.length > 0 &&
            categories.map((category, idx) => (
              category && category.slug && category.name && (
                <li key={idx} onClick={() => dispatch(setSidebarOff())}>
                  <Link to={`category/${category.slug}`} className='cat-list-link text-capitalize'>
                    {category.name}
                  </Link>
                </li>
              )
            ))
          }
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
