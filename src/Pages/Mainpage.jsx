import React from 'react';
import logo from '../Images/logo.png';
import '../Mainpage.css';
import cart from '../Images/shopping_cart_PNG38.png';
import fv from'../Images/veggies.jpeg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const MainPage = () => {
  const navigate = useNavigate();
    const handleClick =()=>{
      navigate("/veggies");
    }
    const location = useLocation();
    const address = location.state?.address || "Address not found";
  
    return (
        <div className='Home'>
            <header className='Home-header'>
              <div className ="Home-navbar">
              <img src={logo} alt='logo' className='Home-logo' />
                <div>
                    <img src={cart} alt='profile' className='Home-profile' />
                </div>
              <p>{address}</p>
              </div>
              <h1 className='categories'>Categories</h1>
              <img src ={fv} alt="fruits&veggies" className="fv-logo"onClick={handleClick}/>
              <h1 className='fv-text'>Vegetables</h1>
            </header>
        </div>
    );
};

export default MainPage;
