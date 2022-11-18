import React, { ReactNode } from "react";
import { DropdownProvider } from "../../context/dropdown-context";

type DropdownProps = {
  children: ReactNode;
};
const Dropdown = ({ children, ...props }: Partial<DropdownProps>) => {
  return (
    <div>
      <DropdownProvider {...props}>
        <div className="relative inline-block w-full">{children}</div>
      </DropdownProvider>
    </div>
  );
};

export default Dropdown;
