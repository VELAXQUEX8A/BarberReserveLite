import React from 'react';
import '../styles/components/ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      name: "Corte Clásico",
      price: "$25",
      duration: "30 min",
      description: "Corte de cabello tradicional con técnicas clásicas",
      features: ["Técnicas tradicionales", "Acabado perfecto", "Incluye peinado"]
    },
    {
      id: 2,
      name: "Corte y Barba",
      price: "$40",
      duration: "45 min",
      description: "Combo completo de corte de cabello y arreglo de barba",
      features: ["Corte personalizado", "Arreglo de barba", "Mascarilla facial"]
    },
    {
      id: 3,
      name: "Afeitado Clásico",
      price: "$30",
      duration: "35 min",
      description: "Afeitado tradicional con navaja y productos premium",
      features: ["Navaja tradicional", "Productos premium", "Masaje facial"]
    },
    {
      id: 4,
      name: "Tratamiento Capilar",
      price: "$35",
      duration: "40 min",
      description: "Tratamiento rejuvenecedor para el cabello y cuero cabelludo",
      features: ["Hidratación profunda", "Masaje capilar", "Productos naturales"]
    }
  ];

  return (
    <section id="servicios" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2>Servicios Premium</h2>
          <p>Experiencias de barbería de lujo con los más altos estándares</p>
        </div>
        
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h3>{service.name}</h3>
                <div className="service-price">
                  <span className="price">{service.price}</span>
                  <span className="duration">{service.duration}</span>
                </div>
              </div>
              
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
