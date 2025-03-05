import './App.css';
import HomePage from './pages/HomePage';
import ViewProperty from './pages/VeiwProperty';
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PropertyListing from "./pages/PropertyListing";
import SellFormPage from './pages/SellFormPage';
import ComparePage from './pages/ComparePage';
function App() {
  return (
      <Router>
        <HomePage />
        <ViewProperty />
        <PropertyListing />
        <SellFormPage />
        <ComparePage />
      </Router>
  );
}

export default App;
