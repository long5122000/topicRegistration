import dayjs from "dayjs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import Field from "../../../components/field/Field";
import ImageUpload from "../../../components/image/ImageUpload";
import Label from "../../../components/label/Label";
import { useAuth } from "../../../context/auth-context";
import { db } from "../../../firebase-app/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import Heading from "../../../layout/Heading";

const InternshipBaseOpinionDetail = () => {
  const [params] = useSearchParams();
  const confirmationId: any = params.get("id");
  const { userInfo } = useAuth();
  const userId = userInfo?.email;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
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
  const imageUrl = getValues("baseOpinionImage");
  console.log(imageUrl);

  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";

  const {
    image,
    setImage,
    progressImage,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const [confirmation, setComfirmation] = useState();
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
      setComfirmation(result);
    });
  }, [userInfo]);
  console.log(confirmation);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "InternshipBaseOpinionList");
      const q = query(colRef, where("msv", "==", userInfo.msv));
      const querySnapshot = await getDocs(q);

      let result: any = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setStudents(result);
    }
    getData();
  }, []);
  console.log("st", students);
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  async function deleteAvatar() {
    const colRef = doc(db, "Users", confirmation[0].id);
    await updateDoc(colRef, {
      baseOpinionImage: "",
    });
  }

  useEffect(() => {
    async function fetchData() {
      if (!confirmationId) return;
      const colRef = doc(db, "InternshipBaseOpinions", confirmationId);
      const docData = await getDoc(colRef);
      if (docData) setData(docData.data());
    }
    fetchData();
  }, [confirmationId]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Users");
      const q = query(colRef, where("email", "==", userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        reset(doc.data());
      });
    }
    getData();
  }, [userId, reset]);
  const handleConfirmation = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      students.forEach(async (item) => {
        await deleteDoc(doc(db, "InternshipBaseOpinionList", item.id));
      });
      const colRef = collection(db, "InternshipBaseOpinionList");
      await addDoc(colRef, {
        idCom: confirmationId,
        image: image,
        name: data.name,
        msv: userInfo.msv,
        fullname: userInfo.fullname,
        emailLectured: data.emailLectured,
        createdAt: new Date(),
      });
      const colRef1 = doc(db, "Users", confirmation[0].id);
      await updateDoc(colRef1, {
        baseOpinionImage: image,
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
          <form onSubmit={handleSubmit(handleConfirmation)}>
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

export default InternshipBaseOpinionDetail;
