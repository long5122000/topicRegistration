import React from "react";

type DashboardHeadingProps = {
  title: string;
  desc: string;
  children?: React.ReactNode;
};
const DashboardHeading = ({
  title = "",
  desc = "",
  children,
}: DashboardHeadingProps) => {
  return (
    <div className="mb-10 flex items-start justify-between">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
