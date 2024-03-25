import React, { createContext, useState } from 'react';

const MyUserContext = createContext();

const MyProvider = ({ children }) => {
  const [currentUser, setState] = useState(null);

  const setUserName = (data) => {
    setState(data);
  };

  return (
    <MyUserContext.Provider value={{ currentUser, setUserName }}>
      {children}
    </MyUserContext.Provider>
  );
};

export { MyProvider, MyUserContext };
