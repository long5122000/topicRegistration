import React, { Children, ReactNode } from "react";

interface FieldProps {
  children: React.ReactNode;
  className?: string;
}
const Field = ({ children, className }: FieldProps) => {
  return (
    <div
      className={`${className}flex flex-col items-start gap-y-5 mb-10 last:mb-0 `}
    >
      {children}
    </div>
  );
};

export default Field;
