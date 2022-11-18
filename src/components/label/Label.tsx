import React, { Children } from "react";
import LabelStatus from "./LabelStatus";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string | undefined;
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
const Label = ({ children, htmlFor = "" }: LabelProps) => {
  return (
    <label className="font-medium text-sm cursor-pointer">
      <LabelStatus htmlFor={htmlFor} type="" className="">
        {children}
      </LabelStatus>
    </label>
  );
};

export default Label;
