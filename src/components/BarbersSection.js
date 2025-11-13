// src/components/BarbersSection.jsx

import React, { useEffect, useState } from 'react';
import { db } from '../data/database';
import '../styles/components/BarbersSection.css';

const BarbersSection = () => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    // Obtener barberos desde la base de datos simulada
    db.getBarbers().then((response) => {
      if (response.success) {
        setBarbers(response.data);
      }
    });
  }, []);

  return (
    <section id="barberos" className="barbers-section">
      <div className="barbers-container">
        <div className="barbers-header">
          <h2>Nuestros Maestros Barberos</h2>
          <p>Profesionales certificados con años de experiencia en el arte de la barbería</p>
        </div>

        <div className="barbers-grid">
          {barbers.map((barber) => (
            <div key={barber.id} className="barber-card">
              <div className="barber-image">
                <span className="section-icon">👤</span>
                <img
                  alt={barber.name}
                />
              </div>

              <div className="barber-info">
                <h3>{barber.name}</h3>
                <p className="barber-specialty">{barber.specialty}</p>
                <p className="barber-experience">
                  Experiencia: {barber.experience} años
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarbersSection;
