import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSuccessLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, onSuccessLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
