import React from "react";
import { useController } from "react-hook-form";

type TextareaProps = {
  name: string;
  control?: any;
  rest?: {
    [x: string]: any;
  };
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;
const Textarea = ({ name, control, ...rest }: TextareaProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative w-full">
      <textarea
        id={name}
        {...field}
        {...rest}
        className="w-full px-4 py-5 bg-transparent border border-[#F1F1F3] rounded-lg transition-all text-black text-sm resize-none min-h-[200px]"
      ></textarea>
    </div>
  );
};

export default Textarea;
