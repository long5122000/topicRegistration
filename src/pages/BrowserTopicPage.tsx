import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionDelete from "../components/actions/ActionDelete";
import ActionEdit from "../components/actions/ActionEdit";
import ActionView from "../components/actions/ActionView";
import Button from "../components/button/Button";
import LabelStatus from "../components/label/LabelStatus";
import Table from "../components/table/Table";
import { db } from "../firebase-app/firebase-config";

const BrowserTopicPage = () => {
  const [topicList, setTopicList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "RegisterTopic");
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

export default BrowserTopicPage;
