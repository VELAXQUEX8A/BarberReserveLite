import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import BarbersSection from './components/BarbersSection';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import './styles/colors.css';

// Componente para la página principal
const HomePage = () => (
  <>
    <ServicesSection />
    <BarbersSection />
    <BookingForm />
  </>
);

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
