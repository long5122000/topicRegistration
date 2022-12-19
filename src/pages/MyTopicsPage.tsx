import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionDelete from "../components/actions/ActionDelete";
import ActionEdit from "../components/actions/ActionEdit";
import ActionView from "../components/actions/ActionView";
import Footer from "../components/footer/Footer";
import LabelStatus from "../components/label/LabelStatus";
import Table from "../components/table/Table";
import { useAuth } from "../context/auth-context";
import { db } from "../firebase-app/firebase-config";
import Heading from "../layout/Heading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const MyTopicsPage = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);

  const navigate = useNavigate();
  const [topicList, setTopicList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "RegisterTopic");
    const q = query(colRef, where("email", "==", userInfo.email));
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
  const renderTopicStatus = (status: any) => {
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
            Bị từ chối
          </LabelStatus>
        );

      default:
        break;
    }
  };
  const handleViewTopic = (topic: any) => {
    if (topic?.status === "1" || topic?.status === "3") {
      navigate(`/detailTopic?id=${topic.id}`);
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
  const renderTopicItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic?.topicName}>{topic?.topicName}</td>

      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>{renderTopicStatus(topic?.status)}</td>
      <td>
        <div className="flex items-center gap-x-3 text-gray-500">
          <ActionDelete
            onClick={() => handleDeledeteTopic(topic)}
          ></ActionDelete>
        </div>
      </td>
    </tr>
  );
  return (
    <div className="">
      <Heading>Đề tài của tôi</Heading>
      <div className="container  h-screen">
        <Table>
          <thead>
            <tr>
              <th>Tên đề tài</th>

              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {topicList.length > 0 && topicList.map(renderTopicItem)}
          </tbody>
        </Table>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyTopicsPage;
