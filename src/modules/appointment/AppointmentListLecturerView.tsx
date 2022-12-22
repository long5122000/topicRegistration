import React, { useCallback, useEffect, useState } from "react";
import Table from "../../components/table/Table";
import ModalImage from "react-modal-image";
import { useSearchParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { useAuth } from "../../context/auth-context";
const AppointmentListLecturerView = () => {
  const [params] = useSearchParams();
  const { userInfo } = useAuth();
  const AppointmentId: any = params.get("id");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "AppointmentList");
    const q = query(colRef, where("id", "==", AppointmentId));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAppointmentList(result);
    });
  }, []);
  useEffect(() => {
    const colRef = collection(db, "Users");
    const q = query(colRef, where("authEmail", "==", userInfo.email));
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

  const openImageViewer = useCallback((index) => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  const renderAppointItem = (user: any) => (
    <tr key={user.id}>
      <td title={user.msv}>{user.msv}</td>
      <td>{user?.fullname}</td>
      <td>
        <ModalImage small={user.image} large={user.image} />
      </td>
    </tr>
  );
  const renderUserItem = (user: any) => (
    <tr key={user.id}>
      <td title={user.msv}>{user.msv}</td>
      <td>{user?.fullname}</td>
      <td>{user?.class}</td>
    </tr>
  );
  return (
    <div className="container flex justify-around gap-x-5">
      <div className="pt-5">
        <h2 className="text-xl font-bold">Danh sách đã nộp</h2>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Mã sinh viên </th>
                <th>Tên </th>

                <th>Tài liệu</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.length > 0 &&
                appointmentList.map(renderAppointItem)}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="pt-5">
        <h2 className="text-xl font-bold">Danh sách sinh viên</h2>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Mã sinh viên </th>
                <th>Tên </th>
                <th>Lớp</th>
              </tr>
            </thead>
            <tbody>{userList.length > 0 && userList.map(renderUserItem)}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentListLecturerView;
