import React from 'react';
import '../cssFiles/orderForm.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../dataManagement/userCartSlice';
import { toast } from 'react-toastify';


const OrderForm = ({ setShowForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
const backendURL = import.meta.env.VITE_BACKEND_URL;
 
  const onFormSubmit = async (data) => {
    try {
      await axios.post(`${backendURL}/api/v1/createUser`, data);
      dispatch(setUser(data));
      toast.success('Logged in successfully');
      setShowForm(false);
      navigate('/items');
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="overlay">
      <form className="order-form" onSubmit={handleSubmit(onFormSubmit)}>
        <h3 className="form-title">Enter Your Details</h3>

        <input
          type="text"
          placeholder="Full Name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <select {...register('numberOfPersons', { required: 'Select number of persons' })}>
          <option value="">Number of Person</option>
         <option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
        </select>
        {errors.numberOfPersons && <p className="error">{errors.numberOfPersons.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register('address', { required: 'Address is required' })}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}

        <input
          type="tel"
          placeholder="Contact Number"
          {...register('contactNumber', {
            required: 'Contact number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Enter a valid 10-digit number'
            }
          })}
        />
        {errors.contactNumber && <p className="error">{errors.contactNumber.message}</p>}

        <button type="submit" className="order-btn">Order Now</button>
      </form>
    </div>
  );
};

export default OrderForm;
