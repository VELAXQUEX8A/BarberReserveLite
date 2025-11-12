import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import '../styles/components/BookingForm.css';

const BookingForm = () => {
  const { services, barbers, addBooking } = useBooking();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_id: '',
    barber_id: '',
    booking_date: '',
    booking_time: '',
    customer_notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Obtener información del servicio y barbero seleccionado
      const selectedService = services.find(s => s.id === parseInt(formData.service_id));
      const selectedBarber = barbers.find(b => b.id === parseInt(formData.barber_id));

      const bookingData = {
        ...formData,
        service_id: parseInt(formData.service_id),
        barber_id: parseInt(formData.barber_id),
        service_price: selectedService?.price || 0,
        service_name: selectedService?.name || '',
        barber_name: selectedBarber?.name || ''
      };

      await addBooking(bookingData);
      
      setMessage('✅ Reserva creada exitosamente!');
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        service_id: '',
        barber_id: '',
        booking_date: '',
        booking_time: '',
        customer_notes: ''
      });

    } catch (error) {
      setMessage('❌ Error al crear la reserva: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generar horarios disponibles (9:00 AM - 6:00 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  return (
    <section id="reservas" className="booking-form-container">
      <div className="booking-form-wrapper">
        <div className="form-header">
          <h1>Reserva tu Cita</h1>
          <p>Completa el formulario para agendar tu experiencia de barbería premium</p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <div className="section-title">
              <span className="section-icon">👤</span>
              Información Personal
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">👤</span>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📧</span>
                  Email *
                </label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📱</span>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+1 234 567 890"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <span className="section-icon">✂️</span>
              Servicio y Barbero
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">💈</span>
                  Servicio *
                </label>
                <select
                  name="service_id"
                  value={formData.service_id}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ${service.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">👨‍💼</span>
                  Barbero *
                </label>
                <select
                  name="barber_id"
                  value={formData.barber_id}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Selecciona un barbero</option>
                  {barbers.map(barber => (
                    <option key={barber.id} value={barber.id}>
                      {barber.name} - {barber.specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <span className="section-icon">📅</span>
              Fecha y Hora
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📅</span>
                  Fecha *
                </label>
                <input
                  type="date"
                  name="booking_date"
                  value={formData.booking_date}
                  onChange={handleInputChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">⏰</span>
                  Hora *
                </label>
                <select
                  name="booking_time"
                  value={formData.booking_time}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Selecciona una hora</option>
                  {generateTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title">
              <span className="section-icon">📝</span>
              Notas Adicionales
            </div>
            <div className="form-group full-width">
              <textarea
                name="customer_notes"
                value={formData.customer_notes}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Algún estilo específico, alergias, o información adicional..."
                rows="4"
              />
            </div>
          </div>

          {message && (
            <div className={`form-message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="submit-section">
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  Creando Reserva...
                </>
              ) : (
                'Confirmar Reserva'
              )}
            </button>
            <p className="form-note">Los campos marcados con * son obligatorios.</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;