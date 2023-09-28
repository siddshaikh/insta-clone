import React, { createContext, useState } from "react";
export const myContext = createContext();
const LoginContex = ({ children }) => {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <myContext.Provider value={{ setUserLogin, userLogin, setModalOpen,modalOpen}}>
      {children}
    </myContext.Provider>
  );
};

export default LoginContex;
