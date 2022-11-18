import React from "react";
import { ThemeContext } from "styled-components";
import {
  AppContextInterface,
  useDropdown,
} from "../../context/dropdown-context";

const List = ({ children }: { children: React.ReactNode }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
