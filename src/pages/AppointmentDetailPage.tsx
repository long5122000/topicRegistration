import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/button/Button";
import { db } from "../firebase-app/firebase-config";
import Heading from "../layout/Heading";
import parse from "html-react-parser";
import ImageUpload from "../components/image/ImageUpload";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import useFirebaseImage from "../hooks/useFirebaseImage";
import Countdown from "react-countdown";
import dayjs from "dayjs";
import { useAuth } from "../context/auth-context";
import { toast } from "react-toastify";
import SignInPage from "./SignInPage";

const AppointmentDetailPage = () => {
  const [params] = useSearchParams();
  const appointmentId: any = params.get("id");
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  console.log(userInfo);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!appointmentId) return;
      const colRef = doc(db, "Appointments", appointmentId);
      const docData = await getDoc(colRef);
      if (docData) setData(docData.data());
    }
    fetchData();
  }, [appointmentId]);
  console.log(data);

  return (
    <div className="container bg-[#f7ecec] p-6 mt-5 rounded-lg">
      <div className="  gap-x-5 border-b-2 border-gray-400 py-3">
        <h3 className="text-xl">Tên:</h3>
        <p className="text-xl">{data?.name}</p>
      </div>
      <div className="  gap-x-5 border-b-2 border-gray-400 py-3">
        <h3 className="text-xl">Mô tả:</h3>
        <p className="text-xl">{parse(data?.desc || "")}</p>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
