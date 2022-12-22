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
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
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

  const handleApplication = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      const colRef = collection(db, "AppointmentList");
      await addDoc(colRef, {
        id: appointmentId,
        image: image,
        name: data.name,
        msv: userInfo.msv,
        fullname: userInfo.fullname,
        emailLectured: data.emailLectured,
        createdAt: new Date(),
      });
      toast.success(`Gửi thông tin thành công`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Heading>Thông báo: {data?.name}</Heading>
      <div className="pb-10 bg-white rounded-2xl">
        <div className="container flex justify-center">
          <form onSubmit={handleSubmit(handleApplication)}>
            <div className="form-layout container mt-5">
              <Field className="overflow-auto border border-gray-300">
                <Label>Mô tả</Label>

                <p className=" p-3">{parse(data?.desc || "")}</p>
              </Field>
              <Field>
                <Label>Ngày hết hạn:</Label>
                <span className="text-red-500">
                  {" "}
                  {dayjs(data?.endDate?.seconds * 1000).format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </span>

                {/* <p className="text-[#de3131] text-sm">{errors.email?.message}</p> */}
              </Field>
            </div>
            <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10 mt-5">
              <ImageUpload
                name=""
                className=" h-full"
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                progressImage={progressImage}
                image={image}
              ></ImageUpload>
            </div>
            {Date.now() - data?.endDate?.seconds * 1000 >= 0 ? (
              <Button
                kind="primary"
                type="submit"
                className="mx-auto w-[200px]  bg-blue-300"
                disabled
              >
                Gửi thông tin
              </Button>
            ) : (
              <Button
                kind="primary"
                type="submit"
                className="mx-auto w-[200px]"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Gửi thông tin
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
