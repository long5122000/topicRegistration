import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/button/Button";

const DashBoardHeader = () => {
  return (
    <div className="bg-primary p-5 border-b-[#eee] flex justify-between gap-5">
      <NavLink to="/" className="flex justify-center items-center">
        <img src="../Logo.png" className="h-[60px] w-[60px]" alt="" />
      </NavLink>
      <div className="flex items-center gap-5">
        <Button href="/manage/add-post" kind="primary" className="">
          Write new post
        </Button>
        <NavLink to="/profile" className="w-[52px] h-[52px]">
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default DashBoardHeader;
