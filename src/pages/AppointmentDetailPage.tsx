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
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const imageUrl = userInfo?.appointmentImage;
  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";
  console.log(imageUrl);

  const {
    image,
    setImage,
    progressImage,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const [application, setApplication] = useState();

  useEffect(() => {
    const colRef = collection(db, "Users");
    const q = query(
      colRef,
      where("email", "==", userInfo.email),
      where("status", "==", "1")
    );
    onSnapshot(q, (snapshot) => {
      const result: any = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
        });
      });
      setApplication(result);
    });
  }, [userInfo]);
  async function deleteAvatar() {
    const colRef = doc(db, "Users", application[0].id);
    await updateDoc(colRef, {
      appointmentImage: "",
    });
  }
  console.log(application);
          