import React from "react";
import Button from "../../components/button/Button";

const UserManage = () => {
  return (
    <div>
      <div className="container flex justify-around pt-5">
        <Button
          href="/manage/ListStudent"
          type="button"
          className="w-[250px] "
          kind="secondary"
        >
          Sinh viên
        </Button>
        <Button
          href="/manage/ListLecturer"
          type="button"
          className="w-[250px]"
          kind="thirdary"
        >
          Giảng viên
        </Button>
        <Button
          href="/manage/ListAdmin"
          type="button"
          className="w-[250px] "
          kind="quaternary"
        >
          Quản trị viên
        </Button>
      </div>
    </div>
  );
};

export default UserManage;
