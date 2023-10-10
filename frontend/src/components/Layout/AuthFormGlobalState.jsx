import React, { createContext, useContext, useState } from 'react';


const GlobalStatesContext = createContext();

export function AuthFormGlobalStateProvider({ children }) {
    const [ authForm, setAuthForm ] = useState("user-login");

    return (
        <GlobalStatesContext.Provider value={{ authForm, setAuthForm  }}>
            {children}
        </GlobalStatesContext.Provider>
    );
}


export function AuthFormGlobalState() {
  const context = useContext(GlobalStatesContext);
  if (!context) {
    throw new Error('Invalid access to global state');
  }
  return context;
}
