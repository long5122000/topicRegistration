import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ActionDelete from "../../components/actions/ActionDelete";
import ActionEdit from "../../components/actions/ActionEdit";
import ActionView from "../../components/actions/ActionView";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { useAuth } from "../../context/auth-context";
import { db } from "../../firebase-app/firebase-config";
import ModalImage from "react-modal-image";

const AppointmentListLecturer = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [appointmentList, setAppointmentList] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const colRef = collection(db, "AppointmentList");
    const q = query(colRef, where("emailLectured", "==", userInfo.email));
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
  const imageUrl = userInfo.appointmentImage;

  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";
  console.log(appointmentList);
  const renderUserStatus = (status: any) => {
    switch (status) {
      case true:
        return (
          <LabelStatus className="" type="success">
            Hoạt động
          </LabelStatus>
        );
      case false:
        return (
          <LabelStatus className="" type="danger">
            Không hoạt động
          </LabelStatus>
        );

      default:
        break;
    }
  };
  const renderPlanItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>{topic?.name}</td>
      <td>{topic?.msv}</td>
      <td>{topic?.fullname}</td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>
        <ModalImage small={topic.image} large={topic.image} />
      </td>
      {/* <td>{renderUserStatus(topic?.status)}</td> */}
      <td>
        <div className="flex items-center gap-x-3 text-gray-500">
          <ActionView
            onClick={() => navigate(`/AppointmentView?id=${topic.id}`)}
          ></ActionView>

          <ActionEdit onClick={() => {}}></ActionEdit>

          <ActionDelete onClick={() => {}}></ActionDelete>
        </div>
      </td>
    </tr>
  );
  return (
    <div className="container">
      <div className="flex justify-end my-5 ">
        <Button className="" kind="primary" href="/AppointmentAddNew">
          Tạo mới cuộc hẹn
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên cuộc hẹn </th>
            <th>Mã sinh viên </th>
            <th>Tên sinh viên </th>
            <th>Ngày tạo</th>
            {/* <th>Trạng thái </th> */}
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.length > 0 && appointmentList.map(renderPlanItem)}
        </tbody>
      </Table>
    </div>
  );
};

export default AppointmentListLecturer;
