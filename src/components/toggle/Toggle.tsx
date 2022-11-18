import React from "react";

type ToggleProps = {
  on: any;
  onClick: () => void;
  checked?: any | undefined;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Toggle = ({ on, onClick, checked, ...rest }: ToggleProps) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        className="hidden-input"
        onChange={() => {}}
        onClick={onClick}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-green-500" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[34px] h-[34px] bg-white rounded-full inline-block ${
            on ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
