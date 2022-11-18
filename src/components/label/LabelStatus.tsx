import React, { Children } from "react";
import classNames from "../../utils/classNames";

const LabelStatus = ({
  children,
  type,
  className,
  htmlFor,
}: {
  htmlFor?: string | undefined;
  className?: string;
  children: React.ReactNode;
  type: string;
}) => {
  let defaultClassName =
    "inline-block py-2 px-4 rounded-lg text-sm font-medium";
  switch (type) {
    case "success":
      defaultClassName = defaultClassName + "text-green-500 bg-green-100";
      break;
    case "warning":
      defaultClassName = defaultClassName + "text-orange-500 bg-orange-100";
      break;
    case "danger":
      defaultClassName = defaultClassName + "text-red-500 bg-red-100";
      break;
    default:
      break;
  }
  return (
    <span className={classNames(defaultClassName, className)}>{children}</span>
  );
};

export default LabelStatus;
