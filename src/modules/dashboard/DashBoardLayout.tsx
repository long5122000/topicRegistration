import React from "react";
import { Outlet } from "react-router-dom";
import DashBoardHeader from "./DashBoardHeader";
import SideBar from "./SideBar";

const DashBoardLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto bg-w  min-h-[100vh]">
      <DashBoardHeader></DashBoardHeader>
      <div className="grid gap-y-0 gap-x-10 grid-cols-[300px_minmax(0,_1fr)] py-10 px-5 items-start">
        <SideBar></SideBar>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
