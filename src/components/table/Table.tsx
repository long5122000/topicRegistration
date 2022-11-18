import React from "react";

type TableProps = {
  children: React.ReactNode;
};
const Table = ({ children }: TableProps) => {
  return (
    <div className="overflow-x-auto bg-[#fff] rounded-lg py-5">
      <table className="w-full ">{children}</table>
    </div>
  );
};

export default Table;
