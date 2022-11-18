import React from "react";

import { Control, useController, UseControllerProps } from "react-hook-form";

type InputProps = {
  name: string;
  control?: any;
  defaultValue?: any;
  rest?: {
    [x: string]: any;
  };
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = ({ name, control, ...rest }: InputProps) => {
  const { field, fieldState } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      <input
        {...rest}
        className="w-full px-10 py-3 text-sm font-medium border border-strock rounded-full text-black placeholder:italic placeholder:text-slate-400"
        {...field}
      />
    </>
  );
};

export default Input;
