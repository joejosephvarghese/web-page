import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../assets/Search';
import SellButton from '../assets/SellButton';
import adminLogo from '../../src/logo copy.svg';
import './protectAdmin.css'

function AdminProtectedPage({ children }) {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState();

    useEffect(() => {
        if (localStorage.getItem('admintoken')){
            setAdmin(JSON.parse(localStorage.getItem('admin')));
        }else{
            navigate('/admin');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        admin && (
        <div className="headerParentDiv1">
        <div className="headerChildDiv1">
          <div className="brandName">
            <img src={adminLogo} alt='logo'></img>
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Serach user"
              />
            </div>
            <div className="searchAction">
              <Search color="#ffffff"></Search>
            </div>
          </div>
          <div className="language">
            <span style={{color: 'white'}}> ENGLISH </span>
          </div>
  
          <div  onClick={ ()=> {
             localStorage.removeItem('admintoken');
             localStorage.removeItem('admin');
             navigate('/admin');
          }} className="sellMenu">
            <SellButton></SellButton>
            <div onClick={()=> {
               localStorage.removeItem('admintoken');
               localStorage.removeItem('admin');
               navigate('/admin');
            }} className="sellMenuContent">
              <span>Logout</span>
            </div>
          </div>
        </div>
        {children}
      </div>
    )

    )
}

export default AdminProtectedPage;