import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelStatus from "../../components/label/LabelStatus";
import { useAuth } from "../../context/auth-context";
import { db } from "../../firebase-app/firebase-config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ActionEdit from "../../components/actions/ActionEdit";
import ActionDelete from "../../components/actions/ActionDelete";
import Table from "../../components/table/Table";
const PlanTable = () => {
  const { userInfo } = useAuth();
  const [planList, setPlanList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "Plans");
    onSnapshot(colRef, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPlanList(result);
    });
  }, []);
  console.log(planList);

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

  const handleDeledePlan = async (plan: any) => {
    // if (userInfo?.Role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    const colRef = doc(db, "Plans", plan.id);
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
  const renderPlanItem = (plan: any) => (
    <tr key={plan.id}>
      <td title={plan.id}>{plan.id.slice(0, 5) + "..."}</td>
      <td>{plan?.name}</td>
      <td>
        {new Date(plan?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>{renderUserStatus(plan?.status)}</td>
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
            onClick={() => navigate(`/manage/PlanUpdate?id=${plan.id}`)}
          ></ActionEdit>
          <ActionDelete onClick={() => handleDeledePlan(plan)}></ActionDelete>
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
            <th>Ngày tạo</th>
            <th>Trạng thái </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{planList.length > 0 && planList.map(renderPlanItem)}</tbody>
      </Table>
    </div>
  );
};

export default PlanTable;
