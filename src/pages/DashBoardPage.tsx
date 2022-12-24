import React, { useEffect, useState } from "react";
import DashboardHeading from "../modules/dashboard/DashBoardHeading";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";

ChartJS.register(ArcElement, Tooltip, Legend);
const DashBoardPage = () => {
  const [lecturerList, setLecturerList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [planListN, setPlanListN] = useState([]);
  const [planListY, setPlanListY] = useState([]);
  const [planList, setPlanList] = useState([]);

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
      const colRef = collection(db, "Topics");
      const q = query(colRef, where("status", "==", "2"));
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPlanListY(result);
    }
    getData();
  }, []);
  console.log(planListY);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Topics");
      const q = query(colRef, where("status", "==", "1"));
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPlanListN(result);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Users");
      const q = query(colRef, where("role", "==", "2"));
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setLecturerList(result);
    }
    getData();
  }, []);
  console.log(lecturerList);
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
  console.log(lecturerList);
  const noLecturer = lecturerList.filter((user) => user.status === "2").length;
  const doneLecturer = lecturerList.filter(
    (user) => user.status === "1"
  ).length;
  const noBaseOpinionStudent = studentList.filter(
    (user) => !user.baseOpinionImage
  ).length;
  const doneBaseOpinionStudent = studentList.filter(
    (user) => user.baseOpinionImage
  ).length;
  const noInternShipAssessment = studentList.filter(
    (user) => !user.internshipImage
  ).length;
  const doneInternShipAssessment = studentList.filter(
    (user) => user.internshipImage
  ).length;
  const nobaseconfirmationImage = studentList.filter(
    (user) => !user.baseconfirmationImage
  ).length;
  const donebaseconfirmationImage = studentList.filter(
    (user) => user.baseconfirmationImage
  ).length;
  const nointernshipOutLineFile = studentList.filter(
    (user) => !user.internshipOutLineFile
  ).length;
  const doneinternshipOutLineFile = studentList.filter(
    (user) => user.internshipOutLineFile
  ).length;
  const nointernshipReportFile = studentList.filter(
    (user) => !user.internshipReportFile
  ).length;
  const doneinternshipReportFile = studentList.filter(
    (user) => user.internshipReportFile
  ).length;

  const dataBaseOpinionStudent = {
    labels: ["Đã nộp", " Chưa nộp"],
    datasets: [
      {
        label: "",
        data: [doneBaseOpinionStudent, noBaseOpinionStudent],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(202, 16, 57, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "#b02f4b"],
        borderWidth: 1,
      },
    ],
  };
  const dataInternShipAssessment = {
    labels: ["Đã nộp", " Chưa nộp"],
    datasets: [
      {
        label: "",
        data: [doneBaseOpinionStudent, noBaseOpinionStudent],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(202, 16, 57, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "#b02f4b"],
        borderWidth: 1,
      },
    ],
  };
  const dataConfirmationImage = {
    labels: ["Đã nộp", " Chưa nộp"],
    datasets: [
      {
        label: "",
        data: [doneBaseOpinionStudent, noBaseOpinionStudent],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(202, 16, 57, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "#b02f4b"],
        borderWidth: 1,
      },
    ],
  };
  const datainternshipReportFile = {
    labels: ["Đã nộp", " Chưa nộp"],
    datasets: [
      {
        label: "",
        data: [doneBaseOpinionStudent, noBaseOpinionStudent],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(202, 16, 57, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "#b02f4b"],
        borderWidth: 1,
      },
    ],
  };
  const dataInternshipOutLineFile = {
    labels: ["Đã nộp", " Chưa nộp"],
    datasets: [
      {
        label: "",
        data: [doneBaseOpinionStudent, noBaseOpinionStudent],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(202, 16, 57, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "#b02f4b"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="flex">
        <div className="bg-white w-full">
          <h2 className="item-center text-center text-3xl font-bold mt-5">
            {planList[0]?.name}
          </h2>
          <div className="flex justify-around mt-10">
            <div className="bg-blue-800 rounded-xl w-80">
              <div className="text-white p-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>

                <h3 className="text-xl font-semibold my-3 text-center">
                  Sinh viên tham gia
                </h3>
                <p className="text-center text-4xl">{studentList.length}</p>
              </div>
            </div>
            <div className="bg-indigo-600 rounded-xl w-80">
              <div className="text-white p-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>

                <h3 className="text-xl font-semibold my-3 text-center">
                  Giảng viên tham gia
                </h3>
                <p className="text-center text-4xl">{lecturerList.length}</p>
              </div>
            </div>
            <div className="bg-sky-600 rounded-xl w-80">
              <div className="text-white p-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>

                <h3 className="text-xl font-semibold my-3 text-center">
                  Số lượng đề tài
                </h3>
                <p className="text-center text-4xl">
                  {planListY.length + planListN.length}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-10">
            {/* <div>
              <h3>Biểu đồ giảng viên tham gia đề tài</h3>
              <Doughnut data={data} className="chart" />
            </div> */}
            <div>
              <h3>Biển đồ thực hiện nộp phiếu nhận xét</h3>
              <Doughnut data={dataBaseOpinionStudent} className="chart" />
            </div>
            <div>
              <h3>Biển đồ thực hiện nộp xác nhận cơ sở thực tập</h3>
              <Doughnut data={dataConfirmationImage} className="chart" />
            </div>
          </div>
          <div className="flex justify-around mt-10">
            <div>
              <h3>Biển đồ thực hiện nộp đánh giá thực tập</h3>
              <Doughnut data={dataInternShipAssessment} className="chart" />
            </div>
            <div>
              <h3>Biển đồ thực hiện nộp đề cương thực tập</h3>
              <Doughnut data={dataInternshipOutLineFile} className="chart" />
            </div>
            <div>
              <h3>Biển đồ thực hiện nộp báo cáo thực tập</h3>
              <Doughnut data={datainternshipReportFile} className="chart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
