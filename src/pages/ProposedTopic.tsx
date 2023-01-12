import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionDelete from "../components/actions/ActionDelete";
import ActionEdit from "../components/actions/ActionEdit";
import ActionView from "../components/actions/ActionView";
import LabelStatus from "../components/label/LabelStatus";
import Table from "../components/table/Table";
import { useAuth } from "../context/auth-context";
import { db } from "../firebase-app/firebase-config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Button from "../components/button/Button";
const ProposedTopic = () => {
  const { userInfo } = useAuth();

  const [topicList, setTopicList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const colRef = collection(db, "Topics");
    const q = query(colRef, where("auth", "==", userInfo.uid));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTopicList(result);
    });
  }, [userInfo]);
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
  const handleViewTopic = (topic: any) => {
    if (topic?.status === "1" || topic?.status === "3") {
      navigate(`/ProposedTopicUpdate?id=${topic.id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi...",
        text: "Bạn không thể sửa đề tài đã được duyệt!",
      });
    }
  };
  const handleDeledeteTopic = async (topic: any) => {
    if (topic?.status === "2") {
      Swal.fire("Failed", "You have no right to do this action", "warning");
      return;
    }
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
            onClick={() => navigate(`/ProposedTopicView?id=${topic.id}`)}
          ></ActionView>

          <ActionEdit onClick={() => handleViewTopic(topic)}></ActionEdit>

          <ActionDelete
            onClick={() => handleDeledeteTopic(topic)}
          ></ActionDelete>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="container">
      <div className="flex justify-end my-5 ">
        <Button className="" kind="primary" href="/RegisterTopic">
          Tạo mới đề tài
        </Button>
      </div>
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

export default ProposedTopic;
