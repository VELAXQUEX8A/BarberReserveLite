// src/components/Header.js
import React from 'react';
import { useBooking } from '../context/BookingContext';
import '../styles/components/Header.css';

const Header = () => {
  const { currentView, setCurrentView } = useBooking();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>💈 BarberReserve</h1>
          </div>
          
          <nav className="nav">
            <button 
              onClick={() => setCurrentView('customer')}
              className={currentView === 'customer' ? 'active' : ''}
            >
              Reservar Cita
            </button>

            <button 
              onClick={() => setCurrentView('admin')}
              className={currentView === 'admin' ? 'active' : ''}
            >
              Panel Admin
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;