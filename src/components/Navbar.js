import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdminClick = () => {
    navigate('/admin');
    setIsMenuOpen(false);
  };

  const handleBookClick = () => {
    if (location.pathname !== '/') {
      // Si no estamos en la página principal, navegar a home primero
      navigate('/');
      // Esperar un momento para que la página cargue y luego hacer scroll
      setTimeout(() => {
        scrollToReservas();
      }, 100);
    } else {
      // Si ya estamos en home, hacer scroll directamente
      scrollToReservas();
    }
    setIsMenuOpen(false);
  };

  const scrollToReservas = () => {
    const bookingSection = document.getElementById('reservas');
    if (bookingSection) {
      const offsetTop = bookingSection.offsetTop - 80; // Ajuste para el navbar fijo
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsMenuOpen(false);
    // Scroll to top cuando se hace click en el logo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiciosClick = (e) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection('servicios');
      }, 100);
    } else {
      scrollToSection('servicios');
    }
    setIsMenuOpen(false);
    e.preventDefault();
  };

  const handleBarberosClick = (e) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection('barberos');
      }, 100);
    } else {
      scrollToSection('barberos');
    }
    setIsMenuOpen(false);
    e.preventDefault();
  };

  const handleReservasClick = (e) => {
    handleBookClick();
    e.preventDefault();
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Ajuste para el navbar fijo
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={handleHomeClick} style={{cursor: 'pointer'}}>
          <span className="logo-icon">💈</span>
          <span className="logo-text">BarberReserve</span>
        </div>

        {/* Menú Desktop */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <a href="#servicios" className="nav-link" onClick={handleServiciosClick}>
              Servicios
            </a>
          </li>
          <li className="nav-item">
            <a href="#barberos" className="nav-link" onClick={handleBarberosClick}>
              Barberos
            </a>
          </li>
          <li className="nav-item">
            <a href="#reservas" className="nav-link" onClick={handleReservasClick}>
              Reservas
            </a>
          </li>
        </ul>

        {/* CTA Buttons */}
        <div className="nav-actions">
          <button className="admin-btn" onClick={handleAdminClick}>
            <span>⚙️</span>
            Admin Panel
          </button>
          <button className="cta-button" onClick={handleBookClick}>
            <span>📅</span>
            Reservar Ahora
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
