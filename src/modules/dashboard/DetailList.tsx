import { collection, getDocs, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import Pdf from "react-to-pdf";
import Table from "../../components/table/Table";
import { db } from "../../firebase-app/firebase-config";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Button from "../../components/button/Button";
const DetailList = () => {
  const ref = React.createRef();

  const [planList, setPlanList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Plans");
      const q = query(colRef, where("status", "==", true));
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPlanList(result);
    }
    getData();
  }, []);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Users");
      const q = query(colRef, where("role", "==", "1"));
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setStudentList(result);
    }
    getData();
  }, []);
  let stt = 1;
  const renderUserItem = (user: any) => (
    <tr key={user.id}>
      <td className="p-2">{stt++}</td>
      <td className="p-2">{user?.fullname}</td>
      <td className="p-2"> {user?.msv}</td>
      <td className="p-2" title={user?.class}>
        {user?.class}
      </td>
      <td className="p-2 whitespace-normal " title={user?.nameTopic}>
        {user?.nameTopic}
      </td>
      <td className="p-2">{user?.nameLecturer}</td>
      <td className="p-2">{user?.mgv}</td>
      <td className="p-2 ">{user?.nameSection}</td>
      <td className="p-2 whitespace-normal">{user?.internshipFacility}</td>
    </tr>
  );
  return (
    <div>
      <Pdf targetRef={ref} filename="code-example.pdf" scale={0.74}>
        {({ toPdf }) => (
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[250px]"
            onClick={toPdf}
          >
            Xuất file pdf
          </Button>
        )}
      </Pdf>
      <div ref={ref}>
        <div className="flex justify-between">
          <div>
            <h3 className="text-center">HỌC VIỆN NÔNG NGHIỆP VIỆT NAM</h3>
            <p className="text-center font-bold">KHOA CÔNG NGHỆ THÔNG TIN</p>
          </div>
          <div>
            <h3 className="text-center font-bold">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </h3>
            <p className="text-center text-sm font-bold">
              Độc lập - Tự do - Hạnh phúc
            </p>
          </div>
        </div>
        <h3 className="text-center pt-10 font-bold">
          DANH SÁCH SINH VIÊN ĐĂNG KÝ ĐỀ TÀI {planList[0]?.name}
        </h3>
        <table>
          <thead>
            <tr>
              <th className="p-2">STT</th>
              <th className="p-2">Tên </th>
              <th className="p-2">Mã SV </th>
              <th className="p-2">Lớp</th>
              <th className="p-2">Tên đề tài</th>
              <th className="p-2">Giảng viên hướng dẫn</th>
              <th className="p-2">Mã GV</th>
              <th className="p-2">Bộ môn quản lý </th>
              <th className="p-2">Cơ sở thực tập</th>
            </tr>
          </thead>
          <tbody>
            {studentList.length > 0 && studentList.map(renderUserItem)}
          </tbody>
        </table>
        {/* <Table>
          <thead className="!tw-w-[100px]">
            <tr>
              <th>STT</th>
              <th>Tên </th>
              <th>Mã SV </th>
              <th>Lớp</th>
              <th>Tên đề tài</th>
              <th>Giảng viên hướng dẫn</th>
              <th>Mã GV</th>
              <th>Bộ môn quản lý </th>
              <th>Cơ sở thực tập</th>
            </tr>
          </thead>
          <tbody>
            {studentList.length > 0 && studentList.map(renderUserItem)}
          </tbody>
        </Table> */}
      </div>
    </div>
  );
};

export default DetailList;
