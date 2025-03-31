import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Account.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tokenManager } from '../utils/tokenManager';

const Account = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState({
    phone: '',
    age: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    occupation: '',
    gender: '',
    profilePicture: null
  });

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      if (!tokenManager.isTokenValid()) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      const token = tokenManager.getToken();
      
      // Fetch user data
      const response = await fetch('http://localhost:5000/api/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('User data response:', response); // Debug log
      if (!response.ok) {
        tokenManager.removeToken();
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Fetched user data:', data); // Debug log
      if (!data || !data.data) {
        tokenManager.removeToken();
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      setIsLoggedIn(true);
      setUserData(data.data);
   

      // Fetch additional user details if they exist
      try {
        const detailsResponse = await fetch(`http://localhost:5000/api/v1/user-details/${data.data._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          setUserDetails(prevDetails => ({
            ...prevDetails,
            ...detailsData
          }));
        }
      } catch (detailsError) {
        console.error('Error fetching user details:', detailsError);
      }

    } catch (error) {
      console.error('Auth error:', error);
      tokenManager.removeToken();
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!userData?._id) {
      alert('User data not available. Please try logging in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userData._id,
          ...userDetails
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save details');
      }

      alert('Details saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert(error.message || 'Failed to save details');
    }
  };

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="not-logged-in-container">
          <div className="auth-message">
            <h2>Account Access Required</h2>
            <p>Please sign in or create an account to view and manage your profile.</p>
            
            <div className="auth-buttons">
              <button 
                className="auth-btn signin-btn"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
              <button 
                className="auth-btn signup-btn"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="account-container">
        <h1>Account Details</h1>
        <div className="user-info">
        <h2>Basic Information</h2>
        <p><b>Email:</b> "{userData?.email}"</p>
        <p><b>Username:</b> "{userData?.name}"</p>
      </div>

      <form onSubmit={handleSubmit} className="details-form">
        <h2>Additional Details</h2>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={userDetails.age}
            onChange={handleInputChange}
            placeholder="Enter age"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="Enter full address"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={userDetails.city}
              onChange={handleInputChange}
              placeholder="Enter city"
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={userDetails.state}
              onChange={handleInputChange}
              placeholder="Enter state"
            />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={userDetails.pincode}
              onChange={handleInputChange}
              placeholder="Enter pincode"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Occupation</label>
          <input
            type="text"
            name="occupation"
            value={userDetails.occupation}
            onChange={handleInputChange}
            placeholder="Enter occupation"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={userDetails.gender}
            onChange={handleInputChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="save-btn">Save Details</button>
      </form>
    </div>
    <Footer />
  </div>
);
};

export default Account;
