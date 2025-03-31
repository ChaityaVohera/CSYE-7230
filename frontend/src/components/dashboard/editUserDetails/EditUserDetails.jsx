
import React, { createContext, useState, useContext } from 'react';

const EditUserContext = createContext();

export const EditUserProvider = ({ children }) => {
  const [showEditUser, setShowEditUser] = useState(false);

  const toggleEditUser = () => {
    setShowEditUser(prevState => !prevState);
  };

  return (
    <EditUserContext.Provider value={{ showEditUser, toggleEditUser }}>
      {children}
    </EditUserContext.Provider>
  );
};

export const useEditUserContext = () => useContext(EditUserContext);

export default EditUserContext;
