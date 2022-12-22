import React from "react";
import Button from "../../components/button/Button";
import Heading from "../../layout/Heading";

const AppointmentManage = () => {
  return (
    <div>
      <Heading>Danh mục cuộc hẹn</Heading>
      <div className="container flex justify-between gap-x-2 pt-5">
        <Button
          href="/BaseConfirmationList"
          type="button"
          className="w-[250px] "
          kind="secondary"
        >
          Xác nhận cơ sở thực tập
        </Button>
        <Button
          href="/InternshipAssessmentList"
          type="button"
          className="w-[250px]"
          kind="thirdary"
        >
          Đánh giá thực tập
        </Button>
        <Button
          href="/InternshipBaseOpinionList"
          type="button"
          className="w-[250px] "
          kind="quaternary"
        >
          Ý kiến cơ sở thực tập
        </Button>
        <Button
          href="/InternshipOutList"
          type="button"
          className="w-[250px] "
          kind="thirdary"
        >
          Đề cương thực tập
        </Button>
        <Button
          href="/InternshipReportList"
          type="button"
          className="w-[250px] "
          kind="secondary"
        >
          Báo cáo thực tập
        </Button>
      </div>
    </div>
  );
};

export default AppointmentManage;
