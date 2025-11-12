import React from 'react';
import '../styles/components/BarbersSection.css';

const BarbersSection = () => {
  const barbers = [
      

  ];

  return (
    <section id="barberos" className="barbers-section">
      <div className="barbers-container">
        <div className="barbers-header">
          <h2>Nuestros Maestros Barberos</h2>
          <p>Profesionales certificados con años de experiencia en el arte de la barbería</p>
        </div>
        
        <div className="barbers-grid">
          {barbers.map(barber => (
            <div key={barber.id} className="barber-card">
              <div className="barber-image">
                <span className="barber-emoji">{barber.image}</span>
              </div>
              
              <div className="barber-info">
                <h3>{barber.name}</h3>
                <p className="barber-specialty">{barber.specialty}</p>
                <p className="barber-experience">Experiencia: {barber.experience}</p>
                <p className="barber-description">{barber.description}</p>
                
                <div className="barber-skills">
                  {barber.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarbersSection;
