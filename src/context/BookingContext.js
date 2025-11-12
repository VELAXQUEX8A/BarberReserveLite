// src/context/BookingContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { db } from '../data/database';

const BookingContext = createContext();

const initialState = {
  bookings: [],
  services: [],
  barbers: [],
  loading: false,
  error: null,
  currentView: 'customer'
};

const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_SERVICES: 'SET_SERVICES',
  SET_BARBERS: 'SET_BARBERS',
  SET_BOOKINGS: 'SET_BOOKINGS',
  ADD_BOOKING: 'ADD_BOOKING',
  UPDATE_BOOKING: 'UPDATE_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING',
  SET_ERROR: 'SET_ERROR',
  SET_VIEW: 'SET_VIEW'
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_SERVICES:
      return { ...state, services: action.payload };
    case ACTIONS.SET_BARBERS:
      return { ...state, barbers: action.payload };
    case ACTIONS.SET_BOOKINGS:
      return { ...state, bookings: action.payload };
    case ACTIONS.ADD_BOOKING:
      return { ...state, bookings: [action.payload, ...state.bookings] };
    case ACTIONS.UPDATE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id ? action.payload : booking
        )
      };
    case ACTIONS.DELETE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload)
      };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SET_VIEW:
      return { ...state, currentView: action.payload };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const [servicesRes, barbersRes, bookingsRes] = await Promise.all([
        db.getServices(),
        db.getBarbers(),
        db.getBookings()
      ]);

      dispatch({ type: ACTIONS.SET_SERVICES, payload: servicesRes.data });
      dispatch({ type: ACTIONS.SET_BARBERS, payload: barbersRes.data });
      dispatch({ type: ACTIONS.SET_BOOKINGS, payload: bookingsRes.data });
      
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const addBooking = async (bookingData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await db.createBooking(bookingData);
      dispatch({ type: ACTIONS.ADD_BOOKING, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      const response = await db.updateBookingStatus(bookingId, status);
      dispatch({ type: ACTIONS.UPDATE_BOOKING, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const deleteBooking = async (bookingId) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    try {
      await db.deleteBooking(bookingId);
      dispatch({ type: ACTIONS.DELETE_BOOKING, payload: bookingId });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const setCurrentView = (view) => {
    dispatch({ type: ACTIONS.SET_VIEW, payload: view });
  };

  const refreshData = () => {
    loadInitialData();
  };

  const value = {
    ...state,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    setCurrentView,
    refreshData
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking debe ser usado dentro de un BookingProvider');
  }
  return context;
};
