import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LabelStatus from "../../components/label/LabelStatus";
import { useAuth } from "../../context/auth-context";
import { db } from "../../firebase-app/firebase-config";
import Swal from "sweetalert2";
import ActionEdit from "../../components/actions/ActionEdit";
import ActionDelete from "../../components/actions/ActionDelete";
import Table from "../../components/table/Table";
import ActionView from "../../components/actions/ActionView";
const TopicTable = () => {
  const { userInfo } = useAuth();
  const [topicList, setTopicList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "Topics");
    onSnapshot(colRef, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTopicList(result);
    });
  }, []);
  console.log(topicList);

  const renderUserStatus = (status: any) => {
    switch (status) {
      case "1":
        return (
          <LabelStatus className="" type="warning">
            Đợi duyệt
          </LabelStatus>
        );
      case "2":
        return (
          <LabelStatus className="" type="success">
            Đã duyệt
          </LabelStatus>
        );
      case "3":
        return (
          <LabelStatus className="" type="danger">
            Đã hủy
          </LabelStatus>
        );

      default:
        break;
    }
  };

  const handleDeledeteTopic = async (topic: any) => {
    // if (userInfo?.Role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    const colRef = doc(db, "Topics", topic.id);
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
        toast.success("Delete plan successfully");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const renderPlanItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>{topic?.name}</td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>{renderUserStatus(topic?.status)}</td>
      <td>
        <div className="flex items-center gap-x-3 text-gray-500">
          <ActionView
            onClick={() => navigate(`/manage/TopicView?id=${topic.id}`)}
          ></ActionView>
          <ActionEdit
            onClick={() => navigate(`/manage/TopicUpdate?id=${topic.id}`)}
          ></ActionEdit>
          <ActionDelete
            onClick={() => handleDeledeteTopic(topic)}
          ></ActionDelete>
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
        <tbody>{topicList.length > 0 && topicList.map(renderPlanItem)}</tbody>
      </Table>
    </div>
  );
};

export default TopicTable;
