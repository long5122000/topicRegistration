import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionDelete from "../components/actions/ActionDelete";
import ActionEdit from "../components/actions/ActionEdit";
import ActionView from "../components/actions/ActionView";
import Button from "../components/button/Button";
import LabelStatus from "../components/label/LabelStatus";
import Table from "../components/table/Table";
import { useAuth } from "../context/auth-context";
import { db } from "../firebase-app/firebase-config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const BrowserTopicPage = () => {
  const [topicList, setTopicList] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  useEffect(() => {
    const colRef = collection(db, "RegisterTopic");
    const q = query(colRef, where("authEmail", "==", userInfo.email));
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
    if (topic?.status === "2") {
      Swal.fire("Failed", "You have no right to do this action", "warning");
      return;
    }
    const colRef = doc(db, "RegisterTopic", topic.id);
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
        toast.success("Delete Topic successfully");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const renderPlanItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic?.topicName}>{topic?.topicName}</td>
      <td>{topic?.name}</td>
      <td>{topic?.class}</td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>{topic?.company || "Chưa có dữ liệu"}</td>
      <td>{renderUserStatus(topic?.status)}</td>
      <td>
        <div className="flex items-center gap-x-3 text-gray-500">
          <ActionView
            onClick={() => navigate(`/BrowserTopicView?id=${topic.id}`)}
          ></ActionView>

          <ActionEdit
            onClick={() => navigate(`/BrowserTopicEdit?id=${topic.id}`)}
          ></ActionEdit>

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
            <th>Tên đề tài</th>
            <th>Tên sinh viên </th>
            <th>Lớp</th>
            <th>Ngày tạo</th>
            <th>Cơ sở thực tập</th>
            <th>Trạng thái </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{topicList.length > 0 && topicList.map(renderPlanItem)}</tbody>
      </Table>
    </div>
  );
};

export default BrowserTopicPage;
