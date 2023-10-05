import React, { createContext, useContext, useState } from 'react';


const GlobalStatesContext = createContext();

export function UserGlobalStateProvider({ children }) {
    const [currentUserData, setCurrentUserData] = useState({
        'username': null,
        'firstName': null,
        'lastName': null,
        'isAdmin': null,
        'isDataEntryOperator': null,
        'bookingsCount': null,
        'category': null
    });

    return (
        <GlobalStatesContext.Provider value={{ currentUserData, setCurrentUserData }}>
            {children}
        </GlobalStatesContext.Provider>
    );
}


export function UserGlobalState() {
  const context = useContext(GlobalStatesContext);
  if (!context) {
    throw new Error('Invalid access to global state');
  }
  return context;
}


