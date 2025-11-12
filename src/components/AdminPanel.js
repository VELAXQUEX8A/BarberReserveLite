import React, { useState } from 'react'; // Removemos useEffect ya que no se usa
import { useBooking } from '../context/BookingContext';
import '../styles/components/AdminPanel.css';

const AdminPanel = () => {
  const { bookings, updateBookingStatus, deleteBooking, refreshData, loading } = useBooking();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // Removemos activeSection y setActiveSection ya que no se usan

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesDate = !selectedDate || booking.booking_date === selectedDate;
    const matchesSearch = 
      booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesDate && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      alert(`Reserva ${newStatus === 'confirmed' ? 'confirmada' : 'cancelada'} exitosamente`);
    } catch (error) {
      alert('Error al actualizar la reserva: ' + error.message);
    }
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      try {
        await deleteBooking(bookingId);
        alert('Reserva eliminada exitosamente');
      } catch (error) {
        alert('Error al eliminar la reserva: ' + error.message);
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando panel de administración...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <p>Gestiona todas las reservas de tu barbería</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Reservas</p>
          </div>
          <div className="stat-card">
            <h3>{stats.pending}</h3>
            <p>Pendientes</p>
          </div>
          <div className="stat-card">
            <h3>{stats.confirmed}</h3>
            <p>Confirmadas</p>
          </div>
          <div className="stat-card">
            <h3>{stats.cancelled}</h3>
            <p>Canceladas</p>
          </div>
        </div>

        <div className="admin-controls">
          <div className="control-group">
            <label>Filtrar por estado:</label>
            <div className="tab-buttons">
              <button 
                onClick={() => setActiveTab('all')} 
                className={activeTab === 'all' ? 'active' : ''}
              >
                Todas ({stats.total})
              </button>
              <button 
                onClick={() => setActiveTab('pending')} 
                className={activeTab === 'pending' ? 'active' : ''}
              >
                Pendientes ({stats.pending})
              </button>
              <button 
                onClick={() => setActiveTab('confirmed')} 
                className={activeTab === 'confirmed' ? 'active' : ''}
              >
                Confirmadas ({stats.confirmed})
              </button>
              <button 
                onClick={() => setActiveTab('cancelled')} 
                className={activeTab === 'cancelled' ? 'active' : ''}
              >
                Canceladas ({stats.cancelled})
              </button>
            </div>
          </div>

          <div className="control-group">
            <label>Filtrar por fecha:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Buscar:</label>
            <input
              type="text"
              placeholder="Nombre, email o servicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button onClick={refreshData} className="refresh-btn">
            🔄 Actualizar
          </button>
        </div>

        <div className="bookings-list">
          <h2>Reservas ({filteredBookings.length})</h2>
          
          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              <p>No hay reservas con los filtros aplicados</p>
            </div>
          ) : (
            <div className="bookings-grid">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h3>{booking.customer_name}</h3>
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status === 'pending' ? 'Pendiente' : 
                       booking.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                    </span>
                  </div>
                  
                  <div className="booking-info">
                    <p><strong>Email:</strong> {booking.customer_email}</p>
                    <p><strong>Teléfono:</strong> {booking.customer_phone}</p>
                    <p><strong>Servicio:</strong> {booking.service_name} - ${booking.service_price}</p>
                    <p><strong>Barbero:</strong> {booking.barber_name}</p>
                    <p><strong>Fecha:</strong> {booking.booking_date} a las {booking.booking_time}</p>
                    {booking.customer_notes && (
                      <p><strong>Notas:</strong> {booking.customer_notes}</p>
                    )}
                  </div>

                  <div className="booking-actions">
                    {booking.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          className="btn confirm-btn"
                        >
                          ✅ Confirmar
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                          className="btn cancel-btn"
                        >
                          ❌ Cancelar
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleDelete(booking.id)}
                      className="btn delete-btn"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;