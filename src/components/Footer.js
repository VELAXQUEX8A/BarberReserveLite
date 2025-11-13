import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo y descripción */}
        <div className="footer-section">
          <h2 className="footer-logo">Barber Reserve</h2>
          <p className="footer-description">
            Estilo, precisión y elegancia. En <strong>Barber Reserve</strong> nos especializamos en cortes modernos, afeitados clásicos y cuidado masculino de primera.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#barberos">Barberos</a></li>
            <li><a href="#reservas">Reservar</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <ul className="footer-contact">
            <li>📍 C.C Primavera Urbana Local 203, Villavicencio, Colombia</li>
            <li>📞 +57 300 123 4567</li>
            <li>✉️ contacto@barberreservelite.com</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">🌐</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
            <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <strong>Barber Reserve</strong>. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
