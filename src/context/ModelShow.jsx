import { createContext, useState } from "react";

export const ModelShowContext = createContext();

export const ModelShowProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModelShow = () => {
    setShowModal(!showModal);
  };

  return (
    <ModelShowContext.Provider value={{ showModal, handleModelShow }}>
      {children}
    </ModelShowContext.Provider>
  );
};
