// src/data/database.js

// Base de datos simulada en memoria
let database = {
  services: [
    {
      id: 1,
      name: "Corte de Cabello",
      description: "Corte profesional con técnicas modernas",
      price: 25.00,
      duration: 30,
      active: true
    },
    {
      id: 2,
      name: "Afeitado Clásico",
      description: "Afeitado con navaja y productos premium",
      price: 20.00,
      duration: 25,
      active: true
    },
    {
      id: 3,
      name: "Corte y Barba",
      description: "Combo completo de corte y arreglo de barba",
      price: 40.00,
      duration: 45,
      active: true
    },
    {
      id: 4,
      name: "Coloración",
      description: "Tinte y tratamiento de color profesional",
      price: 50.00,
      duration: 60,
      active: true
    }
  ],

  barbers: [
    {
      id: 1,
      name: "Carlos Rodríguez",
      specialty: "Cortes clásicos y modernos",
      experience: 5,
      photo_url: "/images/carlos.jpg",
      active: true
    },
    {
      id: 2,
      name: "Miguel Sánchez",
      specialty: "Barbas y afeitado clásico",
      experience: 8,
      photo_url: "/images/miguel.jpg",
      active: true
    },
    {
      id: 3,
      name: "David López",
      specialty: "Coloración y tratamientos",
      experience: 6,
      photo_url: "/images/david.jpg",
      active: true
    }
  ],

  bookings: [
    // Se llenará dinámicamente
  ]
};

// Funciones para simular operaciones de base de datos
export const db = {
  // SERVICIOS
  getServices: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: database.services.filter(service => service.active)
        });
      }, 100);
    });
  },

  getServiceById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const service = database.services.find(s => s.id === id && s.active);
        resolve({
          success: !!service,
          data: service
        });
      }, 100);
    });
  },

  // BARBEROS
  getBarbers: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: database.barbers.filter(barber => barber.active)
        });
      }, 100);
    });
  },

  getBarberById: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const barber = database.barbers.find(b => b.id === id && b.active);
        resolve({
          success: !!barber,
          data: barber
        });
      }, 100);
    });
  },

  // RESERVAS
  getBookings: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredBookings = [...database.bookings];
        
        if (filters.date) {
          filteredBookings = filteredBookings.filter(b => b.booking_date === filters.date);
        }
        
        if (filters.status) {
          filteredBookings = filteredBookings.filter(b => b.status === filters.status);
        }

        resolve({
          success: true,
          data: filteredBookings.sort((a, b) => 
            new Date(b.booking_date + ' ' + b.booking_time) - new Date(a.booking_date + ' ' + a.booking_time)
          )
        });
      }, 200);
    });
  },

  createBooking: (bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: Date.now(), // ID único basado en timestamp
          ...bookingData,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        database.bookings.push(newBooking);
        
        resolve({
          success: true,
          data: newBooking,
          message: 'Reserva creada exitosamente'
        });
      }, 300);
    });
  },

  updateBookingStatus: (bookingId, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const bookingIndex = database.bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex === -1) {
          reject({
            success: false,
            error: 'Reserva no encontrada'
          });
          return;
        }

        database.bookings[bookingIndex].status = status;
        database.bookings[bookingIndex].updated_at = new Date().toISOString();

        resolve({
          success: true,
          data: database.bookings[bookingIndex],
          message: `Reserva ${status} exitosamente`
        });
      }, 200);
    });
  },

  deleteBooking: (bookingId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const bookingIndex = database.bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex === -1) {
          reject({
            success: false,
            error: 'Reserva no encontrada'
          });
          return;
        }

        const deletedBooking = database.bookings.splice(bookingIndex, 1)[0];
        
        resolve({
          success: true,
          data: deletedBooking,
          message: 'Reserva eliminada exitosamente'
        });
      }, 200);
    });
  },

  // Generar datos de ejemplo
  generateSampleData: () => {
    const sampleBookings = [
      {
        id: 1001,
        customer_name: "Juan Pérez",
        customer_email: "juan@email.com",
        customer_phone: "+573001234567",
        service_id: 1,
        barber_id: 1,
        booking_date: new Date().toISOString().split('T')[0],
        booking_time: "10:00",
        status: "confirmed",
        customer_notes: "Primera vez en la barbería",
        service_price: 25.00,
        service_name: "Corte de Cabello",
        barber_name: "Carlos Rodríguez",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 1002,
        customer_name: "María García",
        customer_email: "maria@email.com",
        customer_phone: "+573007654321",
        service_id: 3,
        barber_id: 2,
        booking_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        booking_time: "14:00",
        status: "pending",
        customer_notes: "",
        service_price: 40.00,
        service_name: "Corte y Barba",
        barber_name: "Miguel Sánchez",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    database.bookings = sampleBookings;
  }
};

// Inicializar con datos de ejemplo
db.generateSampleData();