import React from "react";
import Button from "../../../components/button/Button";
import DashboardHeading from "../../dashboard/DashBoardHeading";
import LecturersTable from "./LecturersTable";
import StudentTable from "./LecturersTable";

const LecturerList = () => {
  return (
    <div>
      <DashboardHeading
        title="Lecturer"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10 ">
        <Button className="" kind="primary" href="/manage/LecturersAddNewExcel">
          Add new Lecturer
        </Button>
      </div>
      <LecturersTable></LecturersTable>
    </div>
  );
};

export default LecturerList;
