import { createContext, useState } from "react";

export const SideBarContext = createContext(null);

export const SideBarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <SideBarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
    </SideBarContext.Provider>
  );
};
