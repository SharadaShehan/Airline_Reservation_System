import React, { createContext, useContext, useState } from 'react';


const GlobalStatesContext = createContext();

export function BookingStepGlobalStateProvider({ children }) {
    const [ bookingStep, setBookingStep ] = useState(null);

    return (
        <GlobalStatesContext.Provider value={{ bookingStep, setBookingStep }}>
            {children}
        </GlobalStatesContext.Provider>
    );
}


export function BookingStepGlobalState() {
  const context = useContext(GlobalStatesContext);
  if (!context) {
    throw new Error('Invalid access to global state');
  }
  return context;
}
