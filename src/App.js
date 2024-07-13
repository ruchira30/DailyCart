// App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import  Logo from './Images/Vector 2.png'; 
import  Logo1 from './Images/Vector 1.png'; 
import Logo2 from './Images/Vector.png';
import './Pages/Home.jsx';


function App() {
  const navigate = useNavigate();

  const handleClick = ()=> {
    navigate("/home");
  }

  return (
    <div className="App">
      <header className="App-header">
      <img src ={Logo} alt ="logo part1 "className = 'App-logo1'/>
      <img src ={Logo1} alt ="logo part 2" className ='App-logo2'/>
      <img src={Logo2} alt ="logo" className ='App-logo3'/>
      <h1 className ='App-title'onClick={handleClick}>DailyCart</h1>
      </header>
    </div>
  );
}

export default App;
