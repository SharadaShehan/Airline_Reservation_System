import React, { createContext, useContext, useState } from 'react';


const GlobalStatesContext = createContext();

export function UserMenuGlobalStateProvider({ children }) {
    const [ userMenuItem, setUserMenuItem ] = useState("profile-details");

    return (
        <GlobalStatesContext.Provider value={{ userMenuItem, setUserMenuItem }}>
            {children}
        </GlobalStatesContext.Provider>
    );
}


export function UserMenuGlobalState() {
  const context = useContext(GlobalStatesContext);
  if (!context) {
    throw new Error('Invalid access to global state');
  }
  return context;
}
