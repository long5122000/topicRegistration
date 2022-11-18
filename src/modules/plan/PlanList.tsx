import React from "react";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashBoardHeading";
import PlanTable from "./PlanTable";

const PlanList = () => {
  return (
    <div>
      <DashboardHeading title="Plan" desc=""></DashboardHeading>
      <div className="flex justify-end mb-10 ">
        <Button className="" kind="primary" href="/manage/AddNewPlan">
          Add new Plan
        </Button>
      </div>
      <PlanTable></PlanTable>
    </div>
  );
};

export default PlanList;
