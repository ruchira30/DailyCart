import React from 'react';
import { useNavigate } from 'react-router-dom';
import background2 from '../Images/bg2.png';
import green1 from '../Images/Rectangle 764.png';
import '../Home.css';
import button from '../Images/Button.png';
import arrow from '../Images/Arrow 1.png';

const Home = () => {

  const navigate = useNavigate();
  const handleClick =()=>{
    navigate('/mainpage');
  }

    return (
      <div className='Home'>
        <header className="Home-header">
          <img src ={background2} alt ='background2'className='Home-bg2'/>
          <img src ={green1} alt ='box'className='Home-green1'/>
          <img src={button}alt="button" className ='Home-button'onClick={handleClick}/>
          <h2 className ="Home-text">Explore and buy groceries with ease</h2>
          <img src={arrow} alt="arrow" className='Home-arrow'/>
        </header>
      </div>
    );
  };
  
  export default Home;
  