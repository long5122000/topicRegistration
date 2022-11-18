import React from "react";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashBoardHeading";
import TopicTable from "./TopicTable";

const TopicList = () => {
  return (
    <div>
      <DashboardHeading title="Topic" desc=""></DashboardHeading>
      <div className="flex justify-end mb-10 "></div>
      <TopicTable></TopicTable>
    </div>
  );
};

export default TopicList;
