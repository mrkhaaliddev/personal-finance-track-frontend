import { createContext, useState } from "react";

export const NavBarHiddenContext = createContext();

export const NavBaRProvider = ({ children }) => {
  const [isShow, setIsShow] = useState(() => {
    const isShow = localStorage.getItem("navBarisShow") || "true";
    return isShow === "true" ? false : true;
  });

  localStorage.setItem("navBarisShow", JSON.stringify(isShow));

  function handleSideBar() {
    setIsShow(!isShow);
  }
  return (
    <NavBarHiddenContext.Provider value={{ isShow, handleSideBar }}>
      {children}
    </NavBarHiddenContext.Provider>
  );
};
