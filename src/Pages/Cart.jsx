import React from 'react';
import { useLocation } from 'react-router-dom';
import '../fv.css';
import logo from '../Images/logo.png';
import '../Mainpage.css';
import cart from '../Images/shopping_cart_PNG38.png';
import '../Cart.css';
import axios from 'axios';

const Cart = () => {
  const location = useLocation();
  const { data, counts, selectedWeights, selectedPrices, images } = location.state;

  // Calculate total price
  const totalPrice = data.reduce((acc, item, index) => {
    return acc + (selectedPrices[index] * counts[index]);
  }, 0);

  // Payment Handling
  const timestamp = Date.now();
  let data1= {
    name: 'Ruchira',
    amount: 1,
    number: '9987891071',
    MID: 'MID' + timestamp,
    transactionId: 'T' + timestamp
  };

  const handleClick = async () => {
    try{
      await axios.post('http://192.168.183.66:8000/order',data1).then(res =>{
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })

    }catch(error){
      console.log(error)
    }
  
};

  

  return (
    <div className="cart-container-wrapper">
      <div className='Home-navbar'>
        <img src={logo} alt='logo' className='Home-logo' />
        <div>
          <img src={cart} alt='cart' className='Home-profile' />
        </div>
      </div>
      <div className="items-list">
        <h2 className='heading'>Cart Details</h2>
        <div className="cart-container">
          {data.map((item, index) => (
            <div key={item._id} className="selected-item">
              <img src={images[index]} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '5px' }} />
              <div className="selected-item-details">
                <h3>{item.name}</h3>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Selected Weight:</strong> {selectedWeights[index]}</p>
                <p><strong>Price: </strong> ₹{selectedPrices[index] * counts[index]}</p>
                <p><strong>Qty:</strong> {counts[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="total-container">
        <div className="total-left">
          <h3>Total Price:</h3>
        </div>
        <div className="total-right">
          <h3>Rs.{totalPrice}</h3>
        </div>
      </div>
      <button className='payment-button' onClick={handleClick}>Pay Now</button>
    </div>
  );
};

export default Cart;
