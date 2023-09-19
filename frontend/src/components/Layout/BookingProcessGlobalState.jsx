import React, { createContext, useContext, useState } from 'react';


const GlobalStatesContext = createContext();

export function BookingProcessGlobalStateProvider({ children }) {
    const [bookingProcessDetails, setBookingProcessDetails] = useState({
        'username': null
    });

    return (
        <GlobalStatesContext.Provider value={{ bookingProcessDetails, setBookingProcessDetails}}>
            {children}
        </GlobalStatesContext.Provider>
    );
}


export function BookingProcessGlobalState() {
  const context = useContext(GlobalStatesContext);
  if (!context) {
    throw new Error('Invalid access to global state');
  }
  return context;
}
