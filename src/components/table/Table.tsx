import React from "react";

type TableProps = {
  children: React.ReactNode;
};
const Table = ({ children, ...rest }: TableProps) => {
  return (
    <div className="overflow-x-auto bg-[#fff] rounded-lg py-5" {...rest}>
      <table className="w-full ">{children}</table>
    </div>
  );
};

export default Table;
