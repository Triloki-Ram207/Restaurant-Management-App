import React, { useEffect, useState } from 'react';
import '../cssFiles/thanksForOrdering.css';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ThanksForOrdering() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(3); // Initial countdown

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className='thanks-container'>
      <p className='thanks-text'>Thanks For Ordering</p>
      <div className='check-circle'>
        <FaCheck className='check-icon' />
      </div>
      <p className='redirect-text'>Redirecting in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...</p>
    </div>
  );
}

export default ThanksForOrdering;
