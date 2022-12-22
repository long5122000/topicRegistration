import React from "react";
import Button from "../../../components/button/Button";
import DashboardHeading from "../../dashboard/DashBoardHeading";
import StudentTable from "./StudentTable";

const UserStudentList = () => {
  return (
    <div>
      <DashboardHeading
        title="Student"
        desc="Manage your user"
      ></DashboardHeading>
      {/* <div className="flex justify-end mb-10 ">
        <Button className="" kind="primary" href="/manage/StudentAddNewExcel">
          Add new Student
        </Button>
      </div> */}
      <StudentTable></StudentTable>
    </div>
  );
};

export default UserStudentList;
