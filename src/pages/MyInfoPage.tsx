import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useFirebaseImage from "../hooks/useFirebaseImage";
import useFirebasePdf from "../hooks/useFirebasePdf";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import ImageUpload from "../components/image/ImageUpload";
import FiledUpload from "../components/pdf/FileUpload";
import Field from "../components/field/Field";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Radio from "../components/radio/radio";
import Button from "../components/button/Button";
import { useAuth } from "../context/auth-context";
const MyInfoPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  function formatDateVN(dateString) {
    var subDateStr = dateString.split("/");
    return new Date(+subDateStr[2], subDateStr[1] - 1, +subDateStr[0]);
  }
  const schema = yup.object({
    fullname: yup.string().required("Vui lòng nhập họ và tên"),
    email: yup
      .string()
      .email("Thông tin đăng nhập phải là dạng Email")
      .required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    class: yup.string().required("Vui lòng nhập họ và tên"),
    phone: yup.number().required("Vui lòng nhập số điện thoại"),
  });
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
    resolver: yupResolver(schema),
  });
  const { userInfo } = useAuth();
  console.log(userInfo);

  const userId = userInfo?.email;
  console.log(userId);
  const [id, setId] = useState();
  const [data, setData] = useState({});
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const watchStatus = watch("status");
  const watchGender = watch("gender");
  const imageUrl = getValues("avatar");
  const fileUrl = getValues("cv");
  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";

  const {
    image,
    setImage,
    progressImage,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const { file, setFile, progress, handleSelectFile, handleDeleteFile } =
    useFirebasePdf(setValue, getValues, imageName, deleteFile);
  const fileRegex: any = /%2F(\S+)\?/gm.exec(file);
  const fileName: any = fileRegex?.length > 0 ? fileRegex[1] : "";
  interface values {
    email?: string;
    password?: string;
    fullname?: string;
    class?: string;
    date?: Date;
    gender?: string;
    status?: string;
    role?: string;
    avatar?: string;
    cv?: string;
    phone: string;
  }
  const handleUpdateUser = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "Users", id);
      await updateDoc(colRef, {
        ...values,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        class: values.class,
        gender: values.gender,
        date: new Date(startDate).toLocaleDateString(),
        avatar: image,
        cv: file,
        phone: "0" + String(values.phone),
        createdAt: serverTimestamp(),
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
      console.log(error);
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "Users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  async function deleteFile() {
    setFile("");
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    setFile(fileUrl);
  }, [fileUrl, setFile]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "Users");
      const q = query(colRef, where("email", "==", userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setId(doc.id);
        reset(doc.data());
        setStartDate(formatDateVN(doc.data().date));
      });
    }
    getData();
  }, [userId, reset]);
  return (
    <div className="pb-10 bg-white rounded-2xl">
      <div className="container flex justify-center">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10 mt-5">
            <ImageUpload
              name=""
              className="!rounded-full h-full"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progressImage={progressImage}
              image={image}
            ></ImageUpload>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Họ và tên</Label>
              <Input
                name="fullname"
                placeholder="Enter your fullname"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                control={control}
                type="email"
              ></Input>
              {/* <p className="text-[#de3131] text-sm">{errors.email?.message}</p> */}
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Mật khẩu</Label>
              <Input
                name="password"
                placeholder="Enter your password"
                control={control}
                type="password"
              ></Input>
              {/* <p className="text-[#de3131] text-sm">
                {errors.password?.message}
              </p> */}
            </Field>
            <Field>
              <Label>Giới tính</Label>
              <div className="flex flex-wrap gap-x-5">
                <Radio
                  name="gender"
                  control={control}
                  checked={watchGender === "1"}
                  value={"1"}
                >
                  Nam
                </Radio>
                <Radio
                  name="gender"
                  control={control}
                  checked={watchGender === "2"}
                  value={"2"}
                >
                  Nữ
                </Radio>
              </div>
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Điện thoại</Label>
              <Input
                name="phone"
                placeholder="Nhập số điện thoại"
                control={control}
              ></Input>
              <p className="text-[#de3131] text-sm">{errors.phone?.message}</p>
            </Field>
            <Field>
              <Label>Lớp</Label>
              <Input
                name="class"
                placeholder="Enter your class"
                control={control}
              ></Input>
              {/* <p className="text-[#de3131] text-sm">{errors.class?.message}</p> */}
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Ngày sinh</Label>

              <DatePicker
                onChange={setStartDate}
                value={startDate}
                format="dd-MM-yyyy"
              />
              {/* <p className="text-[#de3131] text-sm">{errors.class?.message}</p> */}
            </Field>
            <Field>
              <FiledUpload
                name=""
                className=""
                onChange={handleSelectFile}
                handleDeleteFile={handleDeleteFile}
                progress={progress}
                file={fileName}
              ></FiledUpload>
            </Field>
          </div>
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Cập nhập thông tin
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MyInfoPage;
