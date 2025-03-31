import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomePage from './pages/HomePage';
import ViewProperty from './pages/VeiwProperty';
import PropertyListing from "./pages/PropertyListing";
import SellFormPage from './pages/SellFormPage';
import ComparePage from './pages/ComparePage';
import AboutPage from './pages/AboutPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PropertyDetails from './pages/VeiwProperty';
import ContactUs from './pages/ContactUs';
import Account from './pages/Account';
import SchedulePage from './pages/SchedulePage';
import SavedProperties from './pages/SavedProperties';
import CallbackPage from './pages/CallbackPage';
import { tokenManager } from './utils/tokenManager';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Check token validity on app start
    if (!tokenManager.isTokenValid()) {
      tokenManager.removeToken();
    }

    // Add event listener for when the window closes
    const handleUnload = () => {
      tokenManager.removeToken();
    };

    // Add event listener for when the server connection is lost
    const handleOffline = () => {
      tokenManager.removeToken();
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view-property" element={<ViewProperty />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/rent" element={<PropertyListing />} />
        <Route path="/sell" element={<SellFormPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view-property/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/account" element={<Account />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/schedule/:id" element={<SchedulePage />} />
        <Route path="/saved-properties" element={<SavedProperties />} />
        <Route path="/callback/:propertyId" element={<CallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
