import { createContext, useState } from 'react';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingChanged, setBookingChanged] = useState(false);

  return (
    <BookingContext.Provider value={{ bookingChanged, setBookingChanged }}>
      {children}
    </BookingContext.Provider>
  );
}
