import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="container text-center bg-secondary py-10 text-white text-2xl">
      {children}
    </h1>
  );
};

export default Heading;
