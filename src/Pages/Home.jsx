import React, { useState } from "react";
import "../Home.css";
import { BsFillShieldLockFill } from 'react-icons/bs';
import PhoneInput from 'react-phone-input-2';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 

  const handleClick = () => {
    navigate("/home2");
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  //For testing purposes - Random Generation of OTP as cloud services need paid subscriptions for otp handling
  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    setLoading(true);
    const generatedOtp = generateOtp();
    console.log(`Generated OTP: ${generatedOtp}`); 
    setTimeout(() => {
      setOtp(generatedOtp);
      setShowOtp(true);
      setLoading(false);
    }, 2000); 
  };

  return (
    <section className="home-section">
      <div className="content-wrapper">
        <h1 className="ph">Enter Your Phone Number</h1>
        {showOtp ? (
          <>
            <OtpInput
              value={otp}
              onChange={setOtp}
              otpType="number"
              disabled={false}
              autoFocus
            />
            <br />
            <button className='verify-button' onClick={handleClick}>
              {loading && <CgSpinner size={20} />}
              <span>Verify OTP</span>
            </button>
          </>
        ) : (
          <>
            <div className="icon-wrapper">
              <BsFillShieldLockFill size={30} />
            </div>
            <PhoneInput
              country={'in'}
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              inputProps={{
                name: 'phone-input',
                id: 'phone-input'
              }}
            />
            {error && <p className="error-message">{error}</p>}
            <button className='verify-button' onClick={handleSendOtp}>
              {loading ? <CgSpinner size={20} /> : <span>Send code via SMS</span>}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
