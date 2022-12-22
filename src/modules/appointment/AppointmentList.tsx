import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import { useAuth } from "../../context/auth-context";
import { db } from "../../firebase-app/firebase-config";
import Heading from "../../layout/Heading";

const AppointmentList = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);

  const [appointments, setAppointments] = useState([]);
  const [internship, setInternShip] = useState([]);
  const [internoutline, setInternOutline] = useState([]);
  const [internopinion, setInternopinion] = useState([]);
  const [internreport, setInternreport] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "BaseConfirmations");
    const q = query(colRef, where("emailLectured", "==", userInfo.authEmail));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAppointments(result);
    });
  }, [userInfo]);
  useEffect(() => {
    const colRef = collection(db, "InternshipAssessments");
    const q = query(colRef, where("emailLectured", "==", userInfo.authEmail));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInternShip(result);
    });
  }, [userInfo]);
  useEffect(() => {
    const colRef = collection(db, "InternshipOutlines");
    const q = query(colRef, where("emailLectured", "==", userInfo.authEmail));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInternOutline(result);
    });
  }, [userInfo]);
  useEffect(() => {
    const colRef = collection(db, "InternshipBaseOpinions");
    const q = query(colRef, where("emailLectured", "==", userInfo.authEmail));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInternopinion(result);
    });
  }, [userInfo]);
  useEffect(() => {
    const colRef = collection(db, "InternshipReports");
    const q = query(colRef, where("emailLectured", "==", userInfo.authEmail));
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setInternreport(result);
    });
  }, [userInfo]);

  const renderPlanItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>
        <Link to={`/BaseConfirmationDetail?id=${topic.id}`}>{topic?.name}</Link>
      </td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
    </tr>
  );
  const renderOpinionItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>
        <Link to={`/InternshipBaseOpinitonDetail?id=${topic.id}`}>
          {topic?.name}
        </Link>
      </td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
    </tr>
  );
  const renderInternItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>
        <Link to={`/InternshipAssessmentDetail?id=${topic.id}`}>
          {topic?.name}
        </Link>
      </td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
    </tr>
  );
  const renderOutlineItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>
        <Link to={`/InternshipOutlineDetail?id=${topic.id}`}>
          {topic?.name}
        </Link>
      </td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
    </tr>
  );
  const renderReportItem = (topic: any) => (
    <tr key={topic.id}>
      <td title={topic.id}>{topic.id.slice(0, 5) + "..."}</td>
      <td>
        <Link to={`/InternshipReportDetail?id=${topic.id}`}>{topic?.name}</Link>
      </td>
      <td>
        {new Date(topic?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
    </tr>
  );
  return (
    <div className="container">
      <Heading>Danh sách cuộc hẹn</Heading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên cuộc hẹn </th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 && appointments.map(renderPlanItem)}
        </tbody>
        <tbody>
          {internship.length > 0 && internship.map(renderInternItem)}
        </tbody>
        <tbody>
          {internopinion.length > 0 && internopinion.map(renderOpinionItem)}
        </tbody>
        <tbody>
          {internoutline.length > 0 && internoutline.map(renderOutlineItem)}
        </tbody>
        <tbody>
          {internreport.length > 0 && internreport.map(renderReportItem)}
        </tbody>
      </Table>
    </div>
  );
};

export default AppointmentList;
