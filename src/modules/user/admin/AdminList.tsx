import React from "react";
import Button from "../../../components/button/Button";
import DashboardHeading from "../../dashboard/DashBoardHeading";
import AdminTable from "./AdminTable";
import LecturersTable from "./AdminTable";
import StudentTable from "./AdminTable";

const AdminList = () => {
  return (
    <div>
      <DashboardHeading
        title="Admin"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10 ">
        <Button className="" kind="primary" href="/manage/AdminAddNewExcel">
          Add new Lecturer
        </Button>
      </div>
      <AdminTable></AdminTable>
    </div>
  );
};

export default AdminList;
