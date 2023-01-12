import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import LabelStatus from "../components/label/LabelStatus";
import Table from "../components/table/Table";
import { db } from "../firebase-app/firebase-config";
import Heading from "../layout/Heading";

const Infolecturers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "Users");
    const q = query(colRef, where("role", "==", "2"));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(result);
    });
  }, []);
  console.log(userList);
  const renderStudentGender = (status: any) => {
    switch (status) {
      case "1":
        return (
          <LabelStatus className="" type="success">
            Nam
          </LabelStatus>
        );
      case "2":
        return (
          <LabelStatus className="" type="warning">
            Nữ
          </LabelStatus>
        );
      default:
        break;
    }
  };
  const renderUserItem = (user: any) => (
    <tr key={user.id}>
      <td title={user.mgv}>{user.mgv}</td>
      <td>{user?.fullname}</td>
      <td title={user?.email}>{user?.email.slice(0, 10) + "..."}</td>

      <td title={user?.section}>{user?.section}</td>
      <td title={user?.gender}>{renderStudentGender(user?.gender)}</td>
      <td>{user?.phone}</td>
    </tr>
  );
  return (
    <div>
      <Heading>Thông tin giảng viên</Heading>
      <div className="container  h-screen">
        <Table>
          <thead>
            <tr>
              <th>Mgv</th>
              <th>Họ tên</th>
              <th>email***</th>
              <th>Bộ môn</th>
              <th>Giới tính</th>
              <th>Sdt</th>
            </tr>
          </thead>
          <tbody>{userList.length > 0 && userList.map(renderUserItem)}</tbody>
        </Table>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Infolecturers;
