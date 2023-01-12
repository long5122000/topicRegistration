import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../../context/auth-context";
import { db } from "../../../firebase-app/firebase-config";
import LabelStatus from "../../../components/label/LabelStatus";
import Table from "../../../components/table/Table";
import ActionEdit from "../../../components/actions/ActionEdit";
import ActionDelete from "../../../components/actions/ActionDelete";
import dayjs from "dayjs";
const AdminTable = () => {
  const { userInfo } = useAuth();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "Users");
    const q = query(colRef, where("role", "==", "3"));
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

  const renderUserStatus = (status: any) => {
    switch (status) {
      case "1":
        return (
          <LabelStatus className="" type="success">
            Hoạt động
          </LabelStatus>
        );
      case "2":
        return (
          <LabelStatus className="" type="danger">
            Bị cấm
          </LabelStatus>
        );

      default:
        break;
    }
  };

  const handleDeledeUser = async (user: any) => {
    // if (userInfo?.Role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    const colRef = doc(db, "Users", user.id);
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
        toast.success("Delete user successfully");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const formatDate = (dateStr: any) => {
    const [year, month, day] = dateStr.split("-");
    let newDate = `${day}/${month}/${year}`;
    return newDate;
  };
  const renderUserItem = (user: any) => (
    <tr key={user.id}>
      <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
      <td>{user?.fullname}</td>
      <td title={user?.email}>{user?.email.slice(0, 10) + "..."}</td>
      <td title={user?.password}>{user?.password}</td>
      <td>{renderUserStatus(user?.status)}</td>
      <td>
        <div className="flex items-center gap-x-3 text-gray-500">
          {/* {userInfo?.Role === 1 ? (
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
          ) : (
            <ActionEdit></ActionEdit>
          )} */}
          <ActionEdit
            onClick={() => navigate(`/manage/AdminUpdate?id=${user.id}`)}
          ></ActionEdit>
          <ActionDelete onClick={() => handleDeledeUser(user)}></ActionDelete>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên </th>
            <th>Email </th>
            <th>Mật khẩu</th>
            <th>Trạng thái </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{userList.length > 0 && userList.map(renderUserItem)}</tbody>
      </Table>
    </div>
  );
};

export default AdminTable;
