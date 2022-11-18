import { createContext, PropsWithChildren, useContext, useState } from "react";

export interface AppContextInterface {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

const DropdownContext = createContext({} as AppContextInterface);
function DropdownProvider(props: PropsWithChildren<{}>) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const values = { show, setShow, toggle };
  return (
    <DropdownContext.Provider value={values}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
