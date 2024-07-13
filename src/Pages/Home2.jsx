import React from 'react';
import '../Home.css';
import background from '../Images/Background.png';
import green from '../Images/Rectangle 764.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = ()=> {
    navigate('/home3');
  }

  
  return (
    <div className='Home' onClick={handleClick}>
      <header className="Home-header">
        <img src={background} alt="background" className="Home-bg" />
        <img src={green} alt="green box" className="Home-green" />
        <p className="Home-heading">Welcome To DailyCart !</p> 
        <p className="Home-txt">Ditch the grocery lines! DailyCart delivers fresh groceries straight to your door. Browse, fill your cart, and relax</p>
      </header>
    </div>
  );
};

export default Home;
