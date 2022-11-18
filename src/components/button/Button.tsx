import React from "react";
import { Link } from "react-router-dom";
import classNames from "../../utils/classNames";
import { ButtonTypes } from "../../utils/enums";

type ButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  kind: string;
  href?: string | undefined;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const Button = ({
  children,
  className,
  isLoading = false,
  kind,
  ...rest
}: ButtonProps) => {
  const child = !!isLoading ? (
    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent border-b-transparent animate-spin"></div>
  ) : (
    children
  );
  let defaultClassName =
    "flex items-center justify-center p-4 text-base font-semibold rounded-xl min-h-[72px]";
  switch (kind) {
    case "primary":
      defaultClassName = defaultClassName + " bg-primary text-white";
      break;
    case "secondary":
      defaultClassName = defaultClassName + " bg-secondary text-white";
      break;
    case "thirdary":
      defaultClassName = defaultClassName + " bg-thirdary text-white";
      break;
    case "quaternary":
      defaultClassName = defaultClassName + " bg-quaternary text-white";
      break;
    case "quinary":
      defaultClassName = defaultClassName + " bg-quinary text-white";
      break;
  }
  if (rest.href)
    return (
      <Link to={rest.href} className={classNames(defaultClassName, className)}>
        {child}
      </Link>
    );
  return (
    <>
      <button
        className={classNames(
          defaultClassName,
          !!isLoading ? "opacity-50 pointer-events-none" : "",
          className
        )}
        {...rest}
      >
        {child}
      </button>
    </>
  );
};

export default Button;
