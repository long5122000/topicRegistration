import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ActionDelete from "../../components/actions/ActionDelete";
import ActionEdit from "../../components/actions/ActionEdit";
import ActionView from "../../components/actions/ActionView";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import { useAuth } from "../../context/auth-context";
import { db } from "../../firebase-app/firebase-config";

const AppointmentListAdmin = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "Appointments");
    onSnapshot(colRef, (snapshot) => {
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
  const handleDeledeConfirmation = async (item: any) => {
    // if (userInfo?.Role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    const colRef = doc(db, "Appointments", item.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        toast.success("Xóa cuộc hẹn thành công ");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const renderPlanItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>{topic?.name}</td>
      {/* <td>{topic?.msv}</td>
      <td>{topic?.fullname}</td> */}
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>{topic?.status ? "Hoạt động" : " Không hoạt động"}</td>
      {/* <td>
        <ModalImage small={topic.image} large={topic.image} />
      </td> */}
      {/* <td>{renderUserStatus(topic?.status)}</td> */}
      <td>
        <div className="flex items-center gap-x-3 text-gray-500">
          <ActionEdit
            onClick={() => {
              navigate(`/manage/AppointmentEdit?id=${topic.id}`);
            }}
          ></ActionEdit>

          <ActionDelete
            onClick={() => handleDeledeConfirmation(topic)}
          ></ActionDelete>
        </div>
      </td>
    </tr>
  );
  return (
    <div className="container">
      <div className="flex justify-end my-5 ">
        <Button className="" kind="primary" href="/manage/AppointmentAddNew">
          Tạo mới tin tức
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên tin tức </th>
            {/* <th>Mã sinh viên </th>
            <th>Tên sinh viên </th> */}
            <th>Ngày tạo</th>
            <th>Trạng thái </th>
            {/* <th>Image</th> */}
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

export default AppointmentListAdmin;
