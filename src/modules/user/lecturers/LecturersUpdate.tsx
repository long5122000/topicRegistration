import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { db } from "../../../firebase-app/firebase-config";
import useFirebaseImage from "../../../hooks/useFirebaseImage";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import ImageUpload from "../../../components/image/ImageUpload";
import Field from "../../../components/field/Field";
import Label from "../../../components/label/Label";
import Input from "../../../components/input/Input";
import Radio from "../../../components/radio/radio";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
const LecturersUpdate = () => {
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
    section: yup.string().required("Vui lòng nhập bộ môn"),
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
  const [params] = useSearchParams();
  console.log(params);
  const [data, setData] = useState({});
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const userId: any = params.get("id");
  console.log(userId);
  const watchStatus = watch("status");
  const watchGender = watch("gender");
  const imageUrl = getValues("avatar");
  const imageRegex: any = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName: any = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  interface values {
    email?: string;
    password?: string;
    fullname?: string;
    section?: string;
    date?: string;
    gender?: string;
    status?: string;
    role?: string;
    avatar?: string;
  }
  const handleUpdateUser = async (values: values): Promise<void> => {
    if (!isValid) return;
    try {
      const colRef = doc(db, "Users", userId);
      await updateDoc(colRef, {
        ...values,
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        section: values.section,
        gender: values.gender,
        date: new Date(startDate).toLocaleDateString(),
        avatar: image,
        status: values.status,
        role: "2",
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
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "Users", userId);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      setStartDate(formatDateVN(docData.data().date));
    }
    fetchData();
  }, [userId, reset]);

  return (
    <div className="pb-10 bg-white rounded-2xl">
      <div className="container flex justify-end">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10 mt-5">
            <ImageUpload
              name=""
              className="!rounded-full h-full"
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
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
              <Label>Trạng thái</Label>
              <div className="flex flex-wrap gap-x-5">
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "1"}
                  value={"1"}
                >
                  Hoạt động
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "2"}
                  value={"2"}
                >
                  Chưa giải quyết
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={watchStatus === "3"}
                  value={"3"}
                >
                  Bị cấm
                </Radio>
              </div>
            </Field>
            <Field>
              <Label>Bộ môn</Label>
              <Input
                name="section"
                placeholder="Enter your bộ môn"
                control={control}
              ></Input>
              {/* <p className="text-[#de3131] text-sm">{errors.class?.message}</p> */}
            </Field>
          </div>
          <div className="form-layout container">
            <Field>
              <Label>Ngày sinh</Label>
              {/* <Input
                name="date"
                ref={inputRef}
                control={control}
                type="date"
              ></Input> */}
              <DatePicker
                onChange={setStartDate}
                value={startDate}
                format="dd-MM-yyyy"
              />
              {/* <p className="text-[#de3131] text-sm">{errors.class?.message}</p> */}
            </Field>
          </div>
          <Button
            kind="primary"
            type="submit"
            className="mx-auto w-[200px]"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sửa giảng viên
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LecturersUpdate;
